import React from "react";
import Toast, { BaseToast } from "react-native-toast-message";
import COLORS from "utils/Colors";
import { wp } from "utils/Dimensions";

type ToastTypes = "success | error | info";

interface PLToastProps {
  message: string;
  duration?: number;
  type: string;
  position?: "top" | "bottom";
}

export const PLToast = ({
  message,
  duration = 5000000,
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
  success: ({ type, message, ...rest }: ToastProps) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 15,
      }}
      text1={
        type === "success" ? "Success" : type === "error" ? "Error" : "Info"
      }
      text2={message}
      text1NumberOfLines={1}
      text2NumberOfLines={1}
    />
  ),

  error: ({ type, message, ...rest }: ToastProps) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "red" }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: COLORS.light.splashscreenbg,
        borderColor: COLORS.light.carouselBtn2,
        borderWidth: 1,
      }}
      text1Style={{
        fontSize: wp(15),
      }}
      text2Style={{
        fontSize: wp(13),
      }}
      text1={
        type === "success" ? "Success" : type === "error" ? "Error" : "Info"
      }
      text2={message}
      text1NumberOfLines={1}
      text2NumberOfLines={1}
    />
  ),

  info: () => {},
  any_custom_type: () => {},
};
