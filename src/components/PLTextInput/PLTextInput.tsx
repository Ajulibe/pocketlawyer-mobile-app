import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { wp } from "../../utils/Dimensions";
import { Input } from "@ui-kitten/components";
import COLORS from "../../utils/Colors";

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
  value?: string | null;
  textContentType: any;
  touched?: boolean;
  returnKeyType?: any;
  style: any;
  placeholder?: string;
  placeholderTextColor?: any;
}

export const PLTextInput: React.FC<Props> = (props) => {
  const [value, setValue] = useState("");

  return (
    <View style={[styles.InputWrapper]}>
      <Input
        {...props}
        style={[styles.Input, props.style]}
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
        textStyle={styles.textStyle}
        placeholderTextColor={COLORS.light.darkgrey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  InputWrapper: {
    height: wp(40),
  },
  Input: {
    width: "100%",
    borderRadius: 4,
    backgroundColor: "white",
    borderColor: COLORS.light.textinputborder,
  },
  textStyle: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: COLORS.light.black,
  },
});

export default PLTextInput;
