import {StyleSheet} from "react-native";
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
    lineHeight: hp(20),
    textAlign: "center",
    alignSelf: "flex-start",
    color: COLORS.light.black,
    marginBottom: hp(39),
    width: "100%",
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(38),
  },
  educationDetails: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: hp(20),
    color: COLORS.light.primary,
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    borderColor: COLORS.light.textinputborder,
  },
  inputButton: {
    height: hp(138),
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.light.imageinputborder,
    justifyContent: "center",
    paddingLeft: wp(20),
    paddingRight: wp(20),
    alignItems: "center",
    width: wp(157),
    borderStyle: "dashed",
    backgroundColor: COLORS.light.imageinputbg,
  },
  fileSelectBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(71),
  },
  fileSelectBox_2: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(20),
    height: hp(120),
  },
  selectText: {
    color: COLORS.light.primary,
    fontSize: 12,
    marginTop: hp(12),
    fontFamily: "Roboto-Medium",
  },
  resetPasswordInput: {
    width: wp(300),
    height: wp(40),
    marginTop: wp(20),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  verifyEmail: {
    fontFamily: "Roboto-MediumItalic",
  },
  resetPasswordText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    color: COLORS.light.black,
    textAlign: "center",
  },
  resetPasswordBtn: {
    marginTop: wp(40),
    width: wp(300),
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    color: COLORS.light.darkgrey,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp(21),
    width: wpercent("90%"),
  },
  nextButton: {
    width: widthPercentageToDP("90%"),
    borderRadius: wp(7),
    alignSelf: "center",
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
  forgotPassword: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.lightpurple,
    textAlign: "right",
    fontSize: wp(12),
    marginTop: wp(8),
  },
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
  },
  plButton: {
    // marginTop: hp(390),
  },

  identification: {
    width: wp(334),
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0.5,
    borderRadius: 4,
    height: wp(40),
    paddingRight: wp(4),
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
    fontSize: wp(14),
    lineHeight: hp(16),
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
});
