import React, { useState } from "react";
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

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const ValidateEmail = ({ navigation }: Props) => {
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
      <NavBar
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_SIGN_UP_SME);
        }}
        navText="Validate email address"
      />
      <View style={styles.contentWraper}>
        <View style={styles.TextWrapper}>
          <Text style={styles.welcomeMessage}>
            A validation code has been sent to{" "}
            <Text style={styles.ContactPerson}>bosedeajayi8@gmail.com</Text>
          </Text>
        </View>

        <View>
          <Text style={styles.inputText}>Code</Text>
          <PLTextInput
            textContentType="name"
            style={styles.input}
            placeholder="Enter code "
          />
        </View>

        <PLButton
          style={styles.plButton}
          textColor={COLORS.light.white}
          btnText={"Next"}
          onClick={() =>
            navigation.navigate(ROUTES.AUTH_SIGN_UP_SECTION_TWO_SME)
          }
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
    marginTop: hp(420),
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
});

export default ValidateEmail;
