import React from "react";
import { StyleSheet, GestureResponderEvent } from "react-native";
import { wp, hp } from "../../utils/Dimensions";
import COLORS from "../../utils/Colors";
import { Button } from "@ui-kitten/components";

type Props = {
  textColor: string;
  btnText?: string;
  onClick?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  style?: any;
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
  },
  btn: {
    width: wp(312),
    height: wp(45),
    backgroundColor: COLORS.light.primary,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: wp(15.94),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderRadius: wp(7),
  },
});
