import {StyleSheet, Platform} from "react-native";
import {
  widthPercentageToDP,
  widthPercentageToDP as wpercent,
} from "react-native-responsive-screen";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.light.white,
  },
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(27),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(39),
    width: wpercent("90%"),
  },
  city: {
    width: wp(334),
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0.5,
    borderRadius: 4,
    height: wp(40),
    paddingRight: wp(4),
  },
  signUpText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(11),
    color: COLORS.light.black,
    lineHeight: Platform.OS === "ios" ? hp(20) : hp(28),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: hp(8),
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  textStyle: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(13),
    color: COLORS.light.black,
  },

  inputText: {
    fontFamily: "Roboto-Bold",
    fontSize: wp(16),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(4),
    marginTop: hp(12),
  },
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
  },
  plButton: {
    marginTop: hp(31),
    borderWidth: 1,
    width: widthPercentageToDP("90%"),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(64),
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
    marginTop: hp(12),
  },
  inputPhoneNumber: {
    width: "82%",
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    color: COLORS.light.black,
    borderWidth: 1,
    height: wp(30),
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(11),
    letterSpacing: 0,
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
  errorText: {
    color: "red",
    fontSize: wp(12),
    fontFamily: "Roboto-Medium",
  },
  validText: {
    color: "green",
    fontSize: wp(12),
    fontFamily: "Roboto-Medium",
  },
  spacer: {
    marginTop: hp(10),
  },
});
