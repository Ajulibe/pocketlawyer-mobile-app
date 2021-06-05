import React, { useReducer, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Input as TextInput } from "@ui-kitten/components";
import { hp, wp } from "utils/Dimensions";
import COLORS from "../utils/Colors";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  keyboardType?: any;
  secureTextEntry?: boolean;
  required?: boolean;
  minLength?: number;
  // autoCompleteType?: any;
  autoCapitalize?: any;
  errorText?: string;
  initialValue?: string;
  initiallyValid?: boolean;
  email?: string | null;
  min?: number | null;
  max?: number | null;
  value?: string | undefined;
  textContentType?: any;
  touched?: boolean;
  returnKeyType?: any;
  placeholder?: string;
  placeholderTextColor?: any;
  onSubmit?: () => void;
  onChangeText?: any;
  icon?: any;
  onPress?: () => void;
  dataValue?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const Input: React.FC<Props> = (props) => {
  const renderIcon = () => (
    <AntDesign name="clouduploado" size={14} color={COLORS.light.primary} />
  );

  const fileUploadName = () => {
    const { dataValue } = props;
    if (dataValue != null) {
      const split = dataValue.split("/");
      if (split.length > 1) {
        return split[split.length - 1];
      }
      return dataValue;
    }
    return null;
  };

  return props.icon ? (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          height: wp(40),
          width: "100%",
          flexDirection: "row",
          borderColor: COLORS.light.inputBdColor,
          borderWidth: 1,
          justifyContent: "center",
          backgroundColor: COLORS.light.inputBackgnd,
          borderRadius: 4,
          alignItems: "center",
        }}
      >
        <View style={{ width: "70%", paddingLeft: wp(20) }}>
          <Text
            style={{
              fontSize: wp(12),
              fontFamily: "Roboto-Regular",
              color: COLORS.light.disabled,
            }}
          >
            {fileUploadName()}
          </Text>
        </View>
        <View
          style={{ width: "30%", alignItems: "flex-end", paddingRight: wp(20) }}
        >
          {renderIcon()}
        </View>
      </TouchableOpacity>
      {/* Displaying error  */}
      {props.errorText === "" || props.errorText == null ? (
        <View />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  ) : (
    <View style={[styles.formControl]}>
      {/* <View> */}
      <TextInput
        {...props}
        textStyle={[
          { ...styles.input, height: props.multiline ? 100 : hp(30) },
        ]}
        placeholderTextColor={COLORS.light.darkgrey}
        keyboardType="default"
        onChangeText={props.onChangeText}
        autoCapitalize="sentences"
        returnKeyType="done"
      />
      {/* </View> */}
      {/* Displaying error  */}
      {props.errorText === "" || props.errorText == null ? (
        <View />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  input: {
    // borderRadius: 4,
    // backgroundColor: COLORS.light.white,
    fontSize: wp(12),
    fontFamily: "Roboto-Regular",
    // paddingHorizontal: wp(16),
    // paddingVertical: hp(8),
    minHeight: hp(30),
    borderColor: COLORS.light.primaryLight,
    // borderWidth: 0.2,
    color: COLORS.light.black,
  },
  errorContainer: {
    marginVertical: 0,
  },
  errorText: {
    marginTop: hp(2),
    fontFamily: "Roboto-Regular",
    color: COLORS.light.red,
    fontSize: 13,
  },
});

export default Input;
