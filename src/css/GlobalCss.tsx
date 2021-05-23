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
    fontSize: wp(18),
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
    shadowColor: COLORS.light.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  divider: {},
});

export default globalStyles;
