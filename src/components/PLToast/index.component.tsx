/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import {widthPercentageToDP} from "react-native-responsive-screen";
import Toast, {BaseToast} from "react-native-toast-message";
import {Platform} from "react-native";

import {wp, hp} from "utils/Dimensions";
import {icons, colors} from "./assets";

interface PLToastProps {
  message: string;
  duration?: number;
  type: string;
  position?: "top" | "bottom";
  topOffset?: number;
}

export const PLToast = ({
  message,
  duration = 500,
  type,
  position = "top",
}: PLToastProps) => {
  return Toast.show({
    text1: type === "success" ? "Success" : type === "error" ? "Error" : "Info",
    text2: message,
    visibilityTime: duration,
    type: type,
    position: position,
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
  success: ({type, ...rest}: ToastProps) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftWidth: 1,
        paddingLeft: wp(20),
        borderRadius: 4,
        backgroundColor: colors.mantis,
        height: hp(70),
      }}
      text1Style={{
        fontSize: wp(16),
        fontFamily: "HK-Bold",
        color: "white",
      }}
      onTrailingIconPress={() => {
        Toast.hide();
      }}
      text2Style={{
        fontSize: wp(14),
        fontFamily: "Roboto-Regular",
        color: "white",
      }}
      text1={
        type === "success" ? "SUCCESS" : type === "error" ? "ERROR" : "INFO"
      }
      text1NumberOfLines={1}
      text2NumberOfLines={1}
    />
  ),

  error: ({type, ...rest}: ToastProps) => (
    <BaseToast
      {...rest}
      style={{
        borderRadius: 4,
        backgroundColor: colors.red,
        borderLeftWidth: 1,
        paddingLeft: wp(20),
        height: hp(70),
      }}
      text1Style={{
        fontSize: wp(16),
        fontFamily: "Roboto-Bold",
        color: "white",
      }}
      onTrailingIconPress={() => {
        Toast.hide();
      }}
      text2Style={{
        fontSize: wp(14),
        fontFamily: "Roboto-Regular",
        color: "white",
      }}
      text1={
        type === "success" ? "SUCCESS" : type === "error" ? "ERROR" : "INFO"
      }
      text1NumberOfLines={1}
      text2NumberOfLines={1}
    />
  ),

  info: () => {},
  any_custom_type: () => {},
};
