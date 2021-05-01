import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "utils/Colors";
import { hp, wp } from "utils/Dimensions";

type Props = {
  bgColor?: string;
  textColor?: string;
  btnText: string;
  onClick: () => void;
  isLoading?: boolean;
};

export default function CustomButton(props: Props) {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={[
        styles.btn,
        { backgroundColor: props.bgColor ?? COLORS.light.primary },
      ]}
    >
      <Text
        style={[styles.title, { color: props.textColor ?? COLORS.light.white }]}
      >
        {props.btnText}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    borderRadius: 7,
    paddingVertical: hp(13),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    fontWeight: "500",
    lineHeight: hp(16),
  },
});
