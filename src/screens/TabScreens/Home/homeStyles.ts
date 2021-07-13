import {Platform, StyleSheet} from "react-native";
import COLORS from "utils/Colors";
import {hp, wp} from "utils/Dimensions";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    paddingTop: hp(18),
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  headerTitleWrapper: {
    flex: 1,
  },
  greeting: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: wp(14),
    lineHeight: Platform.OS === "ios" ? hp(24) : hp(28),
    color: "rgba(0, 0, 0, 0.7)",
    marginBottom: hp(18),
    marginTop: hp(3),
  },
  user: {
    width: wp(40),
    height: wp(40),
    // borderColor: COLORS.light.primary,
    marginRight: wp(7),
    // borderWidth: 1,
  },
  searchWrapper: {
    backgroundColor: "#F1F1F2",
    paddingVertical: hp(8),
    paddingHorizontal: wp(16),
    marginBottom: hp(24),
    borderRadius: 8,
    minHeight: hp(40),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    fontWeight: "500",
    fontSize: wp(12),
    color: COLORS.light.primary,
    margin: 0,
    padding: 0,
    textTransform: "uppercase",
    fontFamily: "Roboto",
    marginLeft: wp(10),
  },
  titleWithViewMore: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(12),
  },
  viewMore: {
    color: COLORS.light.primary,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: wp(12),
    lineHeight: hp(24),
  },
  topFindingSubtitle: {
    fontFamily: "Roboto",
    fontWeight: "300",
    fontSize: wp(14),
    lineHeight: hp(20),
    color: COLORS.light.primary,
    marginBottom: hp(20),
  },
});

export default styles;
