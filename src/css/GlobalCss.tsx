import { Platform, StatusBar, StyleSheet } from "react-native";
import COLORS from "../utils/Colors";
import { hp, wp } from "../utils/Dimensions";

const globalStyles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: COLORS.light.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "green",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: wp(30),
    paddingVertical: hp(30),
    paddingBottom: hp(54),
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
  inputGap: {
    height: 8,
  },
  divider: {},
});

export default globalStyles;
