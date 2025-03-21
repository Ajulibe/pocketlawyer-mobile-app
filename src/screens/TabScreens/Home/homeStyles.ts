import { StyleSheet } from "react-native";
import COLORS from "utils/Colors";
import { hp, wp } from "utils/Dimensions";

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: wp(20),
      paddingVertical: hp(18),
    },
    header: {
      display: "flex",
      flexDirection: "row",
    },
    headerTitleWrapper: {
      flex: 1,
    },
    greeting: {
      fontFamily: "Roboto",
      fontWeight: "400",
      fontSize: wp(14),
      lineHeight: hp(24),
      color: "rgba(0, 0, 0, 0.7)",
      marginBottom: hp(18),
    },
    user: {
      resizeMode: "cover",
      width: wp(50),
      height: wp(50),
      borderRadius: 50,
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
      color: "#7068CA",
      textDecorationStyle: "solid",
      textDecorationLine: "underline",
      fontFamily: "Roboto",
      fontWeight: "500",
      fontSize: wp(12),
      lineHeight: hp(24),
    },
    topFindingSubtitle: {
      fontFamily: "Roboto",
      fontWeight: "300",
      fontSize: wp(12),
      lineHeight: hp(13),
      color: COLORS.light.primary,
      marginBottom: hp(20),
    },
  });

  export default styles;
  