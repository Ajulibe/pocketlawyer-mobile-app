import {Platform, StyleSheet} from "react-native";
import COLORS from "utils/Colors";
import {hp, wp} from "utils/Dimensions";

const modalFormstyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingBottom: Platform.OS === "android" ? hp(60) : hp(30),
  },
  extraScrollHeight: {
    paddingBottom: 60,
  },
  titleDesc: {
    fontSize: wp(16),
    lineHeight: hp(22),
    fontWeight: "400",
    fontFamily: "Roboto-Medium",
    color: "rgba(0, 0, 0, 0.7)",
    marginBottom: hp(26),
    marginTop: hp(10),
  },
  subHeader: {
    fontSize: wp(13),
    lineHeight: hp(24),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: COLORS.light.primary,
    marginBottom: hp(4),
  },
  inputLabel: {
    fontSize: wp(14),
    lineHeight: hp(24),
    fontWeight: "500",
    fontFamily: "HK-SemiBold",
    color: "rgba(0, 0, 0, 0.7)",
    marginBottom: hp(2),
  },
  required: {
    color: "red",
  },
  addMoreWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(12),
    marginBottom: hp(12),
  },
  addMoreBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  addText: {
    fontSize: wp(12),
    lineHeight: hp(24),
    fontWeight: "300",
    fontFamily: "Roboto",
    color: COLORS.light.primary,
  },
});
export default modalFormstyles;
