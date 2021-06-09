import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { hp, wp } from "utils/Dimensions";
import COLORS from "../utils/Colors";
import { Picker } from "@react-native-picker/picker";
import ModalSelector from "react-native-modal-selector";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  data: Array<any>;
  onSelectChange: (value: string, key?: any) => void;
  errorText?: string;
  dataValue?: string;
}

const PickerInput: React.FC<Props> = (props) => {
  const { data, onSelectChange, errorText, dataValue } = props;

  const ifValueSet = data.find((i) => i.label === dataValue);
  return (
    <>
      <View style={styles.pickerWrapper}>
        <ModalSelector
          data={data}
          initValue="Select something yummy!"
          scrollViewAccessibilityLabel={"Scrollable options"}
          cancelButtonAccessibilityLabel={"Cancel Button"}
          onChange={(item) => {
            onSelectChange(item.label, item.key);
          }}
        >
          <View style={styles.picker}>
            <TextInput
              style={styles.input}
              editable={false}
              placeholder={dataValue ?? ""}
              value={ifValueSet ? dataValue : ""}
            />
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color={COLORS.light.black}
            />
          </View>
        </ModalSelector>
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
    // borderColor: COLORS.light.inputBdColor,
    // borderWidth: 1,
    // backgroundColor: COLORS.light.inputBackgnd,
    // borderRadius: 4,
  },
  picker: {
    height: hp(44),
    borderColor: COLORS.light.inputBdColor,
    borderWidth: 1,
    backgroundColor: COLORS.light.inputBackgnd,
    borderRadius: 4,
    paddingLeft: wp(20),
    paddingRight: wp(8),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: COLORS.light.black,
    flex: 1,
    fontSize: wp(12),
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
