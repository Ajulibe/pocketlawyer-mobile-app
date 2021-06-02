import { StyleSheet } from "react-native";
import { hp, wp } from "utils/Dimensions";

const modalFormstyles = StyleSheet.create({
  titleDesc: {
    fontSize: wp(12),
    lineHeight: hp(14),
    fontWeight: "400",
    fontFamily: "Roboto",
    color: "rgba(0, 0, 0, 0.7)",
    marginVertical: hp(24),
  },
  inputLabel: {
    fontSize: wp(12),
    lineHeight: hp(24),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "rgba(0, 0, 0, 0.7)",
    marginBottom: hp(2),
  },
  required: {
    color: "red",
  },
});
export default modalFormstyles;
