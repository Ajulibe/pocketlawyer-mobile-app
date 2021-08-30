import COLORS from "utils/Colors";
import {StyleSheet, Platform} from "react-native";
import {hp, wp} from "utils/Dimensions";
import {widthPercentageToDP} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(6),
    alignItems: "center",
  },
  userPhoto: {
    marginBottom: hp(20),
  },
  textBtn: {
    backgroundColor: COLORS.light.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: wp(30),
    borderRadius: wp(30),
    width: wp(30),
    alignSelf: "flex-start",
    marginBottom: hp(10),
  },
  changePhotoBtn: {
    fontWeight: "300",
    fontSize: wp(12),
    lineHeight: Platform.OS === "ios" ? hp(20) : hp(28),
    color: COLORS.light.white,
    fontFamily: "Roboto-Medium",
  },
  subTitle: {
    fontSize: wp(14),
    lineHeight: hp(27),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "rgba(0, 0, 0, 0.7)",
    marginBottom: hp(2),
    width: "100%",
    marginTop: hp(24),
  },
  changePasswordBth: {
    width: "100%",
    marginBottom: hp(2),
    marginTop: hp(16),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passBtnText: {
    fontSize: wp(14),
    lineHeight: hp(20),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "rgba(0, 0, 0, 0.7)",
  },
  formWrapper: {
    color: COLORS.light.primary,
    fontSize: wp(16),
    lineHeight: hp(27),
    textDecorationLine: "underline",
    fontFamily: "Roboto-Regular",
  },
  formWrapperTitle: {
    textAlign: "left",
  },
  links: {
    marginVertical: 10,
    flexDirection: "row",
    marginTop: hp(20),
  },
  linkText: {
    color: COLORS.light.primary,
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    marginLeft: wp(10),
  },
  dataWrapper: {
    width: widthPercentageToDP("90"),
    backgroundColor: COLORS.light.splashscreenbg,
    padding: wp(10),
    paddingLeft: wp(12),
    borderRadius: 8,
    marginTop: hp(10),
    borderColor: COLORS.light.lightpurple,
    borderWidth: 0.2,
    marginBottom: hp(10),
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: wp(80),
    width: widthPercentageToDP("90"),
  },
  declineButton: {
    width: wp(156),
    backgroundColor: COLORS.light.white,
    borderRadius: wp(7),
    borderWidth: 1,
    borderColor: COLORS.light.red,
    height: wp(50),
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: COLORS.light.primaryLight,
    shadowOpacity: 0.2,
  },
  acceptButton: {
    width: wp(156),
    borderRadius: wp(7),
    backgroundColor: "green",
  },
  skip: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: wp(16),
    color: COLORS.light.red,
  },
});
