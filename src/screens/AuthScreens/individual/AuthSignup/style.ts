import {StyleSheet, Platform} from "react-native";
import COLORS from "utils/Colors";
import {widthPercentageToDP as wpercent} from "react-native-responsive-screen";
import {wp, hp} from "utils/Dimensions";

export const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
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
    marginTop: hp(10),
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
    width: "82%",
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    color: COLORS.light.black,
    borderWidth: 1,
    height: wp(30),
  },

  textStyle: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(13),
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
    fontSize: wp(13),
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
    width: wpercent("90%"),
    height: wp(42),
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
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
    maxHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.light.textinputborder,
    paddingLeft: wpercent("1%"),
    width: "16%",
    borderWidth: 1,
    borderRadius: 4,
  },
  required: {
    color: "red",
  },
});
