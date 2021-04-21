import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  GestureResponderEvent,
} from "react-native";
import IMAGES from "../utils/Images";
import { wp, hp } from "../utils/Dimensions";
import COLORS from "../utils/Colors";
import { Button } from "@ui-kitten/components";

type Props = {
  textColor: string;
  btnText: string;
  onClick: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  style: any;
};

export default function PLButton({
  textColor,
  btnText,
  onClick,
  style,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <Button onPress={onClick} style={[styles.btn, style]} {...rest}>
      {btnText}
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(375),
    borderWidth: 1,
    // alignItems: "center",
  },
  btn: {
    width: wp(312),
    height: hp(44),
    backgroundColor: COLORS.light.primary,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: wp(15.94),
  },
});
