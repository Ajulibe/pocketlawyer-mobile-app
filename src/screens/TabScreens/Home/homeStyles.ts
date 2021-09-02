import {Platform, StyleSheet} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
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
    marginTop: hp(12),
  },
  viewMore: {
    color: COLORS.light.primary,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    fontFamily: "Roboto",
    fontSize: wp(12),
    lineHeight: hp(24),
  },
  slidingScroll: {
    display: "flex",
    flexDirection: "row",
    width: widthPercentageToDP("100"),
  },
  topFindingSubtitle: {
    fontFamily: "Roboto",
    fontSize: wp(14),
    lineHeight: hp(20),
    color: COLORS.light.primary,
    marginBottom: hp(20),
  },
  topFindingswrapper: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: hp(10),
    paddingHorizontal: wp(15),
    alignItems: "center",
    backgroundColor: "#F3F2FD",
    borderRadius: 8,
    marginBottom: wp(9),
    borderWidth: Platform.OS === "ios" ? 0.3 : 0.4,
    borderColor: COLORS.light.carouselBtn2,
  },
});

export default styles;
