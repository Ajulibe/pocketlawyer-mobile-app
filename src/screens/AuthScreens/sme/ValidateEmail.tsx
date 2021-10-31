import React, {useState, useEffect} from "react";
import {View, StyleSheet, SafeAreaView, Text, BackHandler} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {
  widthPercentageToDP,
  widthPercentageToDP as wpercent,
} from "react-native-responsive-screen";
import {RootStackParamList} from "navigation/MainNavigator";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton.component";
import {PLToast} from "components/PLToast/index.component";
import {PLTextInput} from "components/PLTextInput/PLTextInput.component";
import axiosClient from "utils/axiosClient";
import {TouchableOpacity} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyles from "css/GlobalCss";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorageUtil from "utils/AsyncStorageUtil";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const ValidateEmail = ({navigation}: Props) => {
  //--> Otp state
  const [OTP, setOTP] = useState<string>("");
  const [validating, setSetValidating] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean>(true);
  const [email, setEmail] = useState("");

  //--> prevent back button from working
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, []),
  );

  //--> send OTP
  const validateOTP = React.useCallback(async () => {
    //--> disable the text input button when making the api call
    setSetValidating(true);
    setErrors(true);
    try {
      const userID = await AsyncStorageUtil.getUserId();
      await axiosClient.post("User/ConfirmOtp", {
        Isfor: "Registration",
        user_ID: Number(userID),
        Token: OTP,
      });

      //--> enable the text input button after making the api call
      setErrors(false);
      PLToast({message: "Successful", type: "success"});
      setTimeout(() => {
        navigation.navigate(ROUTES.AUTH_CONGRATS_SME);
      }, 500);
    } catch (error: any) {
      const {message} = error?.response.data;
      PLToast({message: message, type: "error"});
    } finally {
      setSetValidating(false);
    }
  }, []);

  //-> listen to OTP Change and call validation
  useEffect(() => {
    if (OTP === "" || OTP.length < 6) {
      setErrors(true);
      return;
    } else {
      validateOTP();
    }
  }, [OTP, validateOTP]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@email");

      jsonValue != null ? setEmail(jsonValue) : null;
    } catch (e) {
      //--> error reading value
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <NavBar
        onPress={() => {
          navigation.goBack();
        }}
        navText="Validate email address"
      />
      <View style={styles.contentWraper}>
        <View style={styles.TextWrapper}>
          <Text style={styles.welcomeMessage}>
            A validation code has been sent to&nbsp;
            <Text style={styles.ContactPerson}>{email}</Text>
          </Text>
        </View>

        <View style={{height: wp(130), marginTop: hp(20)}}>
          <Text style={styles.inputText}>Code</Text>
          <PLTextInput
            maxLength={6}
            disabled={validating}
            textContentType="oneTimeCode"
            onChangeText={setOTP}
            style={styles.input}
            placeholder="Enter code "
          />
          {!errors ? (
            <Text style={[styles.inputText, styles.successText]}>
              Code has been verified &nbsp; &#10003;
            </Text>
          ) : null}
        </View>

        <PLButton
          isLoading={validating}
          loadingText="Validating..."
          disabled={errors}
          style={styles.plButton}
          textColor={COLORS.light.white}
          btnText={"Next"}
          onClick={validateOTP}
        />
        <View style={styles.loginWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.AUTH_SIGN_UP_SME);
            }}>
            <Text style={styles.signUpText}>
              Wrong Email?&nbsp;
              <Text style={styles.login}>Start Over</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.light.white,
  },
  signUpText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    color: COLORS.light.black,
    lineHeight: hp(24),
  },
  TextWrapper: {
    width: wpercent("90%"),
  },
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(16),
    lineHeight: hp(32),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(10),
    width: wpercent("90%"),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(25),
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    color: COLORS.light.darkgrey,
  },

  inputText: {
    fontFamily: "Roboto-Bold",
    fontSize: wp(16),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(12),
    marginTop: hp(12),
  },
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
  },
  plButton: {
    marginTop: hp(280),
    width: widthPercentageToDP("90%"),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(23),
    width: wpercent("90%"),
  },
  carouselIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wpercent("7%"),
  },
  phoneNumberWrapper: {
    width: wpercent("90%"),
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-between",
    borderRadius: 4,
    borderColor: "#f0f0f0",
  },
  loginWrapper: {
    flexDirection: "row",
    width: wpercent("80%"),
    justifyContent: "space-around",
    marginTop: hp(25),
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: hp(24),
    letterSpacing: 0,
    color: COLORS.light.lightpurple,
  },
  countryPickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
    paddingLeft: wpercent("2%"),
    width: wpercent("26%"),
  },
  ContactPerson: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(16),
    lineHeight: hp(32),
    color: COLORS.light.primary,
  },
  inputPhoneNumber: {
    width: wp(230),
    height: wp(40),
    borderRadius: 0,
    backgroundColor: COLORS.light.white,
    borderLeftWidth: 0,
    borderColor: "#fff",
  },
  successText: {
    color: "green",
    fontFamily: "Roboto-Regular",
    fontSize: wp(10),
    marginTop: hp(6),
  },
});

export default ValidateEmail;
