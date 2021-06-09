import React from "react";
import {
  StyleSheet,
  GestureResponderEvent,
  ActivityIndicator,
  View,
  ViewStyle,
  Platform,
} from "react-native";
import { wp, hp } from "../../utils/Dimensions";
import COLORS from "../../utils/Colors";
import { Button, Spinner } from "@ui-kitten/components";

type Props = {
  textColor: string;
  btnText?: string;
  onClick: (event: any) => void;
  isLoading?: boolean;
  style?: any;
  disabled?: boolean;
  loadingText?: any;
};

const LoadingIndicator = (props: any) => (
  <ActivityIndicator style={[props.style, styles.indicator]} color="#fff" />
);

export default function PLButton({
  textColor,
  btnText,
  onClick,
  style,
  isLoading = false,
  disabled,
  loadingText,
  ...rest
}: Props) {
  return isLoading ? (
    <Button
      style={[styles.btn, style]}
      accessoryLeft={LoadingIndicator}
      disabled={true}
    >
      {loadingText}
    </Button>
  ) : (
    <Button
      onPress={onClick}
      style={[styles.btn, style]}
      {...rest}
      disabled={disabled ? disabled : false}
    >
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
    borderWidth: Platform.OS === "ios" ? 0.2 : 0.4,
    borderColor: COLORS.light.lightpurple,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
});
