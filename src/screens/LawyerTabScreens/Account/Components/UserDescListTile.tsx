import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "utils/Colors";
import { hp, wp } from "utils/Dimensions";

interface Props {
  leading: String;
  value: string;
  makeBold?: boolean;
}
export default function UserDescListTile(props: Props) {
  const { leading, value, makeBold } = props;
  return (
    <View style={styles.tileWrapper}>
      <Text style={styles.tileLeading}>{leading}</Text>
      <Text
        style={[
          styles.tileTrailing,
          {
            fontSize: makeBold ? wp(16) : wp(12),
            color: makeBold ? COLORS.light.primary : "rgba(0, 0, 0, 1)",
          },
        ]}
      >
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
    fontSize: wp(12),
    lineHeight: hp(20),
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto",
  },
  tileTrailing: {
    fontWeight: "700",
    fontSize: wp(12),
    // lineHeight: hp(14),
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Roboto-Bold",
  },
});
