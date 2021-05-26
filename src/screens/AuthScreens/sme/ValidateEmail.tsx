import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "../../../navigation/MainNavigator";
import { ROUTES } from "../../../navigation/Routes";
import COLORS from "../../../utils/Colors";
import { wp, hp } from "../../../utils/Dimensions";
import NavBar from "../../../components/NavBar";
import PLButton from "../../../components/PLButton/PLButton";
import { FontAwesome } from "@expo/vector-icons";
import { PLPasswordInput } from "../../../components/PLPasswordInput/PLPasswordInput";
import { PLTextInput } from "../../../components/PLTextInput/PLTextInput";
import { PLDatePicker } from "../../../components/PLDatePicker";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode, Country, CallingCode } from "../../../types";
import { Input } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const ValidateEmail = ({ navigation }: Props) => {
  //--> Otp state
  const [OTP, setOTP] = useState<string>("");
  const [validating, setSetValidating] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean>(true);
  const [email, setEmail] = useState("");

  //--> validate OTP
  const validateOTP = () => {
    // console.log(OTP);
  };

  //-> listen to OTP Change and call validation
  useEffect(() => {
    if (OTP === "" || OTP.length < 6) {
      setErrors(true);
      return;
    }
    //--> disable the text input button when making the api call
    setSetValidating(true);
    setErrors(true);

    //--> simulation for a real API call to remove errors and enable button
    setTimeout(() => {
      //--> enable the text input button after making the api call
      setSetValidating(false);
      setErrors(false);
    }, 3000);

    validateOTP();
  }, [OTP]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@email");

      jsonValue != null ? setEmail(JSON.parse(jsonValue)) : null;
    } catch (e) {
      //--> error reading value
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavBar
        onPress={() => {
          navigation.goBack();
        }}
        navText="Validate email address"
      />
      <View style={styles.contentWraper}>
        <View style={styles.TextWrapper}>
          <Text style={styles.welcomeMessage}>
            A validation code has been sent to &nbsp;
            <Text style={styles.ContactPerson}>email</Text>
          </Text>
        </View>

        <View style={{ height: wp(130) }}>
          <Text style={styles.inputText}>Code</Text>
          <PLTextInput
            maxLength={6}
            disabled={validating}
            textContentType="name"
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
          onClick={() => navigation.navigate(ROUTES.AUTH_CONGRATS_SME)}
        />
        <View style={styles.loginWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.AUTH_SIGN_UP_SME);
            }}
          >
            <Text style={styles.signUpText}>
              Wrong Email?
              <Text style={styles.login}> Start Over </Text>
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
    fontSize: wp(11),
    color: COLORS.light.black,
    lineHeight: hp(14),
  },
  TextWrapper: {
    width: wpercent("90%"),
  },
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(27),
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
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
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
    marginTop: hp(340),
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
    marginTop: hp(18),
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(11),
    lineHeight: hp(14),
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
    fontSize: wp(14),
    lineHeight: hp(20),
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
