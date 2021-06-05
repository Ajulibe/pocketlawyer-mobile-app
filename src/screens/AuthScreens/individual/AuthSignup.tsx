import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Platform } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "navigation/MainNavigator";
import { ROUTES } from "navigation/Routes";
import COLORS from "utils/Colors";
import { wp, hp } from "utils/Dimensions";
import { Input } from "@ui-kitten/components";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode, Country, CallingCode } from "types";
import { PLTextInput } from "components/PLTextInput/PLTextInput";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IndividualSignUpInterface } from "navigation/interfaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import globalStyles from "css/GlobalCss";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_GET_STARTED_SCREEN
>;

const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const AuthGetStarted = ({ navigation }: Props) => {
  //--> country component info
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [country, setCountry] = useState<Country>();
  const [withCountryNameButton, setWithCountryNameButton] =
    useState<boolean>(false);
  const [callingCode, setCallingCode] = useState<CallingCode[]>(["234"]);

  const [withFlag, setWithFlag] = useState<boolean>(true);
  const [withEmoji, setWithEmoji] = useState<boolean>(true);
  const [withFilter, setWithFilter] = useState<boolean>(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(true);
  const [withCallingCode, setWithCallingCode] = useState<boolean>(true);
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setCallingCode(country.callingCode);
  };

  //--> state values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  //--> check to ensure all values are filled and enable button
  React.useEffect(() => {
    //--> check if the payload has be completely filled
    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      phonenumber === ""
    ) {
      setDisabled(true);
      return;
    } else {
      setDisabled(false);
    }
  }, [firstName, lastName, email, phonenumber]);

  //--> disabling button
  const [disabled, setDisabled] = useState<boolean>(true);

  //--> creating payload and saving to async
  const onClick = () => {
    const Payload = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phonenumber,
    };

    //-->  saving payload to local staorage
    const storeData = async (Payload: IndividualSignUpInterface) => {
      try {
        await AsyncStorage.setItem("@signup_payload", JSON.stringify(Payload));
        await AsyncStorage.setItem("@email", JSON.stringify(email));
        navigation.navigate(ROUTES.AUTH_SIGN_UP_SECTION_TWO);
      } catch (e) {
        //-->  saving error
      }
    };

    storeData(Payload);
  };

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <NavBar
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_SELECT_CATEGORY);
        }}
        navText="Sign Up"
        style={{
          marginBottom: hp(30),
        }}
      />

      <KeyboardAwareScrollView
        extraScrollHeight={wp(100)}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animatable.View animation="fadeIn" style={styles.contentWraper}>
          <View style={styles.TextWrapper}>
            <Animatable.Text animation="fadeIn" style={styles.welcomeMessage}>
              Welcome to Pocket Lawyer. Create an account to access top notch
              legal services.
            </Animatable.Text>
          </View>

          <View>
            <PLTextInput
              labelText="First Name"
              labelTextRequired={true}
              error={false}
              name="FirstName"
              onChangeText={setFirstName}
              value={firstName}
              textContentType="name"
              style={styles.input}
              placeholder="Type your first name"
            />
          </View>

          <View>
            <PLTextInput
              labelText="Last Name"
              labelTextRequired={true}
              error={false}
              name="LastName"
              onChangeText={setLastName}
              value={lastName}
              textContentType="familyName"
              style={styles.input}
              placeholder="Type your last name"
            />
          </View>

          <View>
            <Text style={styles.inputText}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneNumberWrapper}>
              <View style={styles.countryPickerWrapper}>
                <CountryPicker
                  {...{
                    countryCode,
                    withFilter,
                    withFlag,
                    withCountryNameButton,
                    withAlphaFilter,
                    withCallingCode,
                    withEmoji,
                    onSelect,
                  }}
                />
                <Text style={styles.codeText}>+{callingCode}</Text>
              </View>

              <Input
                maxLength={11}
                style={styles.inputPhoneNumber}
                onChangeText={setPhonenumber}
                value={phonenumber}
                textStyle={styles.textStyle}
                placeholder="906 3782 2828"
                textContentType="telephoneNumber"
                keyboardType="numeric"
                returnKeyType="next"
                placeholderTextColor={COLORS.light.darkgrey}
              />
            </View>
          </View>

          <View>
            <PLTextInput
              labelText="Email Address"
              labelTextRequired={true}
              error={false}
              name="Email"
              onChangeText={setEmail}
              autoCapitalize="none"
              value={email}
              style={styles.input}
              placeholder="Type your email address"
              textContentType="emailAddress"
            />
          </View>

          <View style={styles.carouselWrapper}>
            <View style={styles.carouselIcon}>
              <FontAwesome
                name="circle"
                size={12}
                color={COLORS.light.primary}
              />
              <Entypo name="circle" size={10} color={COLORS.light.primary} />
            </View>
          </View>

          <PLButton
            style={styles.plButton}
            disabled={disabled}
            textColor={COLORS.light.white}
            btnText={"Next"}
            onClick={onClick}
          />
          <View style={styles.loginWrapper}>
            <Text style={styles.signUpText}>
              By signing up, you agree with the
              <Text style={styles.login}> Terms of services </Text>and{" "}
              <Text style={styles.login}>Privacy policy </Text>
            </Text>
          </View>
        </Animatable.View>
      </KeyboardAwareScrollView>
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
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: Platform.OS === "ios" ? hp(27) : hp(34),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(29),
    width: wpercent("90%"),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  TextWrapper: {
    width: wpercent("90%"),
  },
  inputPhoneNumber: {
    width: wp(230),
    borderRadius: 0,
    backgroundColor: COLORS.light.white,
    borderLeftWidth: 0,
    borderColor: "#fff",
    color: COLORS.light.black,
  },

  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(11),
    color: COLORS.light.black,
  },
  signUpText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(11),
    color: COLORS.light.black,
    lineHeight: Platform.OS === "ios" ? hp(20) : hp(28),
  },
  inputText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(4),
    marginTop: hp(12),
  },
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.black,
    fontSize: wp(12),
  },
  plButton: {
    marginTop: hp(20),
    marginBottom: hp(12),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(40),
    width: wpercent("90%"),
  },
  carouselIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wpercent("7%"),
  },
  phoneNumberWrapper: {
    borderWidth: 1,
    width: wpercent("90%"),
    height: wp(42),
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    borderColor: COLORS.light.textinputborder,
  },
  loginWrapper: {
    flexDirection: "row",
    width: wpercent("80%"),
    justifyContent: "space-around",
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(11),
    color: COLORS.light.lightpurple,
  },
  countryPickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderRightWidth: 1,
    borderRightColor: COLORS.light.textinputborder,
    paddingLeft: wpercent("2%"),
    width: wpercent("26%"),
  },
  required: {
    color: "red",
  },
});

export default AuthGetStarted;
