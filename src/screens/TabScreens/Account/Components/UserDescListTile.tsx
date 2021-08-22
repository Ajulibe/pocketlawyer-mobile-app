import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import COLORS from "utils/Colors";
import {hp, wp} from "utils/Dimensions";

interface Props {
  leading: String;
  value: string;
  makeBold?: boolean;
}
export default function UserDescListTile(props: Props) {
  const {leading, value, makeBold} = props;
  return (
    <View style={styles.tileWrapper}>
      <Text style={styles.tileLeading}>{leading}</Text>
      <Text
        style={[
          styles.tileTrailing,
          {
            fontSize: makeBold ? wp(14) : wp(14),
            color: makeBold ? COLORS.light.primary : "rgba(0, 0, 0, 1)",
            fontFamily: makeBold ? "Roboto-Bold" : "Roboto-Medium",
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
    fontSize: wp(14),
    lineHeight: hp(20),
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Roboto-Bold",
  },
  tileTrailing: {
    fontWeight: "700",
    fontSize: wp(12),
    width: "70%",
    textAlign: "right",
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto-Medium",
  },
});
