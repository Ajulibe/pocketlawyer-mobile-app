import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { wp, hp } from "utils/Dimensions";
import { Input } from "@ui-kitten/components";
import COLORS from "utils/Colors";

interface Props {
  id?: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  required?: boolean;
  minLength?: number;
  autoCapitalize?: any;
  errorText?: string;
  initialValue?: string;
  initiallyValid?: boolean;
  email?: string | null;
  min?: number | null;
  max?: number | null;
  value?: any;
  textContentType: any;
  touched?: boolean;
  returnKeyType?: any;
  style?: any;
  placeholder?: string;
  placeholderTextColor?: any;
  onChangeText: any;
  onFocus?: any;
  onBlur?: any;
  disabled?: boolean;
  errorMessage?: string;
  name?: string;
  error?: boolean;
  labelText?: string;
  labelTextRequired?: boolean;
  maxLength?: number;
}

export const PLTextInput: React.FC<Props> = (props) => {
  return (
    <View style={styles.InputWrapper}>
      {typeof props.labelText !== "undefined" && (
        <Text style={styles.label}>
          {props.labelText}{" "}
          <Text style={styles.required}>{props.labelTextRequired && "*"}</Text>
        </Text>
      )}

      <Input
        value={props.value}
        {...props}
        autoCorrect={false}
        disabled={props.disabled ? props.disabled : false}
        style={[
          styles.Input,
          props.error ? { borderColor: "red" } : null,
          props.style,
        ]}
        maxLength={props.maxLength ? props.maxLength : 555}
        onChangeText={props.onChangeText}
        textStyle={styles.textStyle}
        placeholderTextColor={COLORS.light.darkgrey}
      />
      {/* <Text>{props.errorMessage}</Text> */}

      {props.error && (
        <View style={styles.errorWrapper}>
          <Text style={styles.error}>* {props.name} is required</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  InputWrapper: {},
  Input: {
    width: "100%",
    borderRadius: 4,
    backgroundColor: "white",
    // borderColor: COLORS.light.textinputborder,
  },
  textStyle: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: COLORS.light.black,
  },
  error: {
    color: "red",
    fontSize: wp(11),
    marginTop: wp(5),
  },
  errorWrapper: {
    marginBottom: wp(10),
  },
  label: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(4),
    marginTop: hp(12),
  },
  required: {
    color: "red",
  },
});

export default PLTextInput;
