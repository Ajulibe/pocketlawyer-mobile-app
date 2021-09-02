import {StyleSheet} from "react-native";
import {
  heightPercentageToDP,
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
  heading: {
    fontFamily: "Roboto-Bold",
    fontSize: wp(20),
    fontWeight: "bold",
    color: COLORS.light.black,
    textAlign: "center",
  },

  checkBoxWrapper: {
    justifyContent: "center",
    backgroundColor: COLORS.light.checkpurple,
    height: hp(60),
    borderRadius: 7,
    marginTop: hp(14),
    borderColor: COLORS.light.imageinputborder,
    borderWidth: 0.2,
  },
  textStyle: {
    textAlign: "left",
    fontWeight: "400",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: wp(16),
    marginRight: wp(50),
    width: wp(200),
  },
  contentWraper: {
    width: wpercent("86%"),
    alignItems: "center",
  },
  checkBox: {
    alignSelf: "flex-end",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: wp(80),
    width: wpercent("80%"),
  },
  skipButton: {
    width: wp(156),
    backgroundColor: COLORS.light.white,
    borderRadius: wp(7),
    borderWidth: 1,
    borderColor: COLORS.light.primary,
    height: wp(44),
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: COLORS.light.primaryLight,
    shadowOpacity: 0.2,
  },
  skip: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: wp(16),
    color: COLORS.light.primary,
  },
  nextButton: {
    width: wpercent("80%"),
    borderRadius: wp(7),
  },
  emptyState: {
    height: heightPercentageToDP("30"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginTop: hp(60),
  },
  emptyText: {
    textAlign: "left",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: wp(16),
    marginTop: hp(30),
  },
  dataWrapper: {
    width: "97.5%",
    backgroundColor: COLORS.light.white,
    borderRadius: 8,
    marginTop: hp(10),
    borderColor: COLORS.light.lightpurple,
    borderWidth: 0.3,
    marginBottom: hp(10),
    alignItems: "center",
    paddingBottom: hp(20),
    borderStyle: "dashed",
  },
  changePasswordBth: {
    width: "95%",
    marginBottom: hp(2),
    marginTop: hp(16),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formWrapper: {
    color: COLORS.light.primary,
    fontSize: wp(16),
    lineHeight: hp(25),
    textDecorationLine: "underline",
    fontFamily: "Roboto-Bold",
  },
  activityIndicatorStyle: {
    height: hp(150),
    justifyContent: "center",
    alignItems: "center",
  },
  adjustContainer: {
    marginBottom: hp(10),
    width: "100%",
  },
});
