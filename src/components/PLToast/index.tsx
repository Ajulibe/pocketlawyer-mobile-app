import React from "react";
import Toast, { BaseToast } from "react-native-toast-message";
import COLORS from "utils/Colors";
import { hp, wp } from "utils/Dimensions";
import { icons, colors } from "./assets";

type ToastTypes = "success | error | info";

interface PLToastProps {
  message: string;
  duration?: number;
  type: string;
  position?: "top" | "bottom";
}

export const PLToast = ({
  message,
  duration = 4000,
  type,
  position = "top",
}: PLToastProps) => {
  return Toast.show({
    text1: type === "success" ? "Success" : type === "error" ? "Error" : "Info",
    text2: message,
    visibilityTime: duration,
    type: type,
    position: position,
    topOffset: 60,
  });
};

export interface ToastProps {
  ref: (ref: any) => any;
  topOffset?: number;
  bottomOffset?: number;
  keyboardOffset?: number;
  visibilityTime?: number;
  autoHide?: boolean;
  height?: number;
  type?: string;
  text1: string;
  message: string;
}

//--> to be properly configured later
export const toastConfig = {
  success: ({ type, ...rest }: ToastProps) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: colors.mantis,
        borderLeftWidth: 1,
        borderWidth: 1,
        borderColor: colors.mantis,
        borderRadius: 6,
        backgroundColor: "#DDEADE",
      }}
      leadingIcon={icons.success}
      leadingIconStyle={{ backgroundColor: "white", borderRadius: wp(50) }}
      text1Style={{
        fontSize: wp(15),
        fontFamily: "Roboto-Bold",
        color: colors.mantis,
      }}
      onTrailingIconPress={() => {
        Toast.hide();
      }}
      text2Style={{
        fontSize: wp(13),
        fontFamily: "Roboto-Regular",
        color: "grey",
      }}
      text1={
        type === "success" ? "Success" : type === "error" ? "Error" : "Info"
      }
      text1NumberOfLines={1}
      text2NumberOfLines={1}
    />
  ),

  error: ({ type, ...rest }: ToastProps) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: colors.red,
        borderLeftWidth: 1,
        borderWidth: 1,
        borderColor: colors.red,
        borderRadius: 6,
        backgroundColor: colors.lightRed,
      }}
      leadingIcon={icons.error}
      leadingIconStyle={{ backgroundColor: "white", borderRadius: wp(50) }}
      text1Style={{
        fontSize: wp(15),
        fontFamily: "Roboto-Bold",
        color: colors.red,
      }}
      onTrailingIconPress={() => {
        Toast.hide();
      }}
      text2Style={{
        fontSize: wp(13),
        fontFamily: "Roboto-Regular",
        color: "grey",
      }}
      text1={
        type === "success" ? "Success" : type === "error" ? "Error" : "Info"
      }
      text1NumberOfLines={1}
      text2NumberOfLines={1}
    />
  ),

  info: () => {},
  any_custom_type: () => {},
};
