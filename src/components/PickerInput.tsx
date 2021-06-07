import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { hp, wp } from "utils/Dimensions";
import COLORS from "../utils/Colors";
import { Picker } from "@react-native-picker/picker";

interface Props {
  data: Array<any>;
  onSelectChange: (value: string, index?: number) => void;
  errorText?: string;
}

const PickerInput: React.FC<Props> = (props) => {
  const { data, onSelectChange, errorText } = props;

  return (
    <>
      <View style={styles.pickerWrapper}>
        <Picker
          style={styles.picker}
          itemStyle={{ fontSize: wp(8) }}
          onValueChange={(itemValue: string, itemIndex) =>
            onSelectChange(itemValue, itemIndex)
          }
        >
          {data.map((item, index) => (
            <Picker.Item
              // style={styles.pickerItem}
              color={"red"}
              key={`${index}`}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
      {errorText === "" || errorText == null ? (
        <View />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  pickerWrapper: {
    // height: wp(40),
    // width: "100%",
    borderColor: COLORS.light.inputBdColor,
    borderWidth: 1,
    backgroundColor: COLORS.light.inputBackgnd,
    borderRadius: 4,
  },
  picker: {
    height: hp(40),
  },
  pickerItem: {
    color: COLORS.light.disabled,
    backgroundColor: "red",
  },
  errorContainer: {
    marginVertical: 0,
  },
  errorText: {
    marginTop: hp(6),
    fontFamily: "Roboto-Regular",
    color: COLORS.light.red,
    fontSize: wp(12),
  },
});

export default PickerInput;
