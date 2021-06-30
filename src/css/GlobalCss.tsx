import { Platform, StatusBar, StyleSheet } from "react-native";
import COLORS from "../utils/Colors";
import { hp, wp } from "../utils/Dimensions";

const globalStyles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: COLORS.light.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
    color: COLORS.light.white,
  },
  scrollViewContainer: {
    width: "100%",
    paddingHorizontal: wp(30),
    paddingVertical: hp(30),
    color: COLORS.light.white,
  },
  centerHorizontal: {
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  H1Style: {
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    fontSize: wp(19),
    lineHeight: wp(24),
    color: COLORS.light.primary,
  },
  H2Style: {
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    fontSize: wp(16),
    lineHeight: hp(24),
    color: COLORS.light.primary,
  },
  shadowLight: {
    shadowColor: COLORS.light.blackLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: Platform.OS === "ios" ? 8 : 0,
  },
  divider: {},
  topWrapper: {
    height: hp(55),
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: wp(12),
  },
  iconWrapper: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(35),
    backgroundColor: COLORS.light.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderColor: COLORS.light.primary,
    // borderWidth: 1,

    shadowColor: COLORS.light.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export default globalStyles;
