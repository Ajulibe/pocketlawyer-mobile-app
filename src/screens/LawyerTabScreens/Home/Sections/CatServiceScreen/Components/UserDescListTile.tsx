import React from "react";
import {StyleSheet, Text, View} from "react-native";
import COLORS from "utils/Colors";
import {hp, wp} from "utils/Dimensions";

interface Props {
  leading: String;
  value: any;
  makeBold?: boolean;
}
export default function UserDescListTile(props: Props) {
  const {leading, value, makeBold} = props;
  return (
    <View style={styles.tileWrapper}>
      <Text
        style={[
          styles.tileLeading,
          {
            fontSize: makeBold ? wp(17) : wp(13),
            color: makeBold ? COLORS.light.primary : "rgba(0, 0, 0, 0.6)",
            fontWeight: makeBold ? "700" : "500",
            fontFamily: makeBold ? "Roboto-Medium" : "Roboto-Regular",
          },
        ]}>
        {leading}
      </Text>
      <Text
        style={[
          styles.tileTrailing,
          {
            fontSize: makeBold ? wp(14) : wp(12),
            fontWeight: makeBold ? "700" : "500",
            fontFamily: makeBold ? "Roboto-Regular" : "Roboto-Thin",
          },
        ]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tileWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(12),
    width: "100%",
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    borderBottomWidth: 1,
    paddingBottom: hp(12),
  },
  tileLeading: {
    fontWeight: "400",
    fontSize: wp(16),
    lineHeight: hp(20),
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto-Bold",
  },
  tileTrailing: {
    fontWeight: "700",
    fontSize: wp(12),
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Roboto-Regular",
  },
});
