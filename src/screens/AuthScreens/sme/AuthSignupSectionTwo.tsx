import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
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
import { ScrollView } from "react-native-gesture-handler";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const AuthGetStarted = ({ navigation }: Props) => {
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

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={wp(0)}
      >
        <NavBar
          onPress={() => {
            navigation.navigate(ROUTES.AUTH_VALIDATE_EMAIL_SME);
          }}
          navText="Sign Up"
        />
        <ScrollView>
          <View style={styles.contentWraper}>
            <View style={styles.TextWrapper}>
              <Text style={styles.welcomeMessage}>
                Please add details of a
                <Text style={styles.ContactPerson}> contact person</Text> for
                your company.
              </Text>
            </View>

            <View>
              <Text style={styles.inputText}>First Name</Text>
              <PLTextInput
                textContentType="name"
                style={styles.input}
                placeholder="Type your first name"
              />
            </View>

            <View>
              <Text style={styles.inputText}>Last Name</Text>
              <PLTextInput
                textContentType="familyName"
                style={styles.input}
                placeholder="Type your last name"
              />
            </View>

            <View>
              <Text style={styles.inputText}>Email Address</Text>
              <PLTextInput
                style={styles.input}
                placeholder="Type your email address"
                textContentType="emailAddress"
              />
            </View>

            <View>
              <Text style={styles.inputText}>Phone Number</Text>
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
                  style={styles.inputPhoneNumber}
                  textStyle={styles.textStyle}
                  placeholder="906 3782 2828"
                  textContentType="telephoneNumber"
                  placeholderTextColor={COLORS.light.darkgrey}
                />
              </View>
            </View>

            <View>
              <Text style={styles.inputText}>Designation</Text>
              <PLTextInput
                style={styles.input}
                placeholder="Type the job designation"
                textContentType="none"
              />
            </View>

            <View style={styles.carouselWrapper}>
              <View style={styles.carouselIcon}>
                <FontAwesome
                  name="circle"
                  size={12}
                  color={COLORS.light.primary}
                />
                <FontAwesome
                  name="circle"
                  size={12}
                  color={COLORS.light.primary}
                />
              </View>
            </View>

            <PLButton
              style={styles.plButton}
              textColor={COLORS.light.white}
              btnText={"Next"}
              onClick={() => navigation.navigate(ROUTES.AUTH_CONGRATS_SME)}
              //   onClick={() => Alert.alert("Signed Up")}
            />
            <View style={styles.loginWrapper}>
              <Text style={styles.signUpText}>
                By signing up, you agree with the
                <Text style={styles.login}> Terms of services </Text>and{" "}
                <Text style={styles.login}>Privacy policy </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: hp(20),
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
    marginTop: hp(12),
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
});

export default AuthGetStarted;
