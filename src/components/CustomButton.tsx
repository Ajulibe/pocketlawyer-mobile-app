import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import COLORS from "utils/Colors";
import { hp, wp } from "utils/Dimensions";

type Props = {
  bgColor?: string;
  textColor?: string;
  btnText: string;
  onClick: () => void;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
};

const LoadingIndicator = (props: any) => (
  <ActivityIndicator style={[props.style, styles.indicator]} />
);

export default function CustomButton({
  bgColor,
  textColor,
  btnText,
  onClick,
  loadingText,
  disabled,
  isLoading = false,
}: Props) {
  return isLoading ? (
    <TouchableOpacity
      disabled
      onPress={onClick}
      style={[styles.btn, { backgroundColor: bgColor ?? COLORS.light.primary }]}
    >
      <Text style={[styles.title, { color: textColor ?? COLORS.light.white }]}>
        {loadingText}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={[styles.btn, { backgroundColor: bgColor ?? COLORS.light.primary }]}
    >
      <Text
        style={[
          styles.title,
          {
            color: disabled
              ? COLORS.light.lighterdisabled
              : textColor ?? COLORS.light.white,
          },
        ]}
      >
        {btnText}
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
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    fontWeight: "500",
    lineHeight: hp(16),
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
});
