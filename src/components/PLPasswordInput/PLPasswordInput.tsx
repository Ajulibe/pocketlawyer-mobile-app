import React from "react";
import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import { Input } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";
import { wp } from "../../utils/Dimensions";
import COLORS from "../../utils/Colors";

interface Props {
  placeholder: string;
  onChangeText: any;
}

export const PLPasswordInput: React.FC<Props> = ({
  placeholder,
  onChangeText,
}) => {
  const [value, setValue] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Feather
        name={secureTextEntry ? "eye-off" : "eye"}
        size={12}
        color="grey"
      />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={[styles.InputWrapper]}>
      <Input
        onChangeText={onChangeText}
        placeholder={placeholder}
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        style={styles.Input}
        textStyle={styles.textStyle}
        placeholderTextColor={COLORS.light.darkgrey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  InputWrapper: {
    width: "100%",
    height: wp(40),
    borderWidth: 0,
  },
  Input: {
    borderRadius: 4,
    backgroundColor: "white",
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0,
  },
  textStyle: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: COLORS.light.black,
  },
});
