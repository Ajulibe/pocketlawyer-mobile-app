import React from "react";
import { Text, View } from "react-native";
import modalFormstyles from "../BottomSheetServices/ModalFormStyles";

interface Props {
  text: string;
  isRequired?: boolean;
  giveMargin?: boolean;
}
export default function ModalFormLabel(props: Props) {
  const { text, isRequired = true, giveMargin = true } = props;
  return (
    <>
      {giveMargin && <View style={{ height: 16 }} />}
      <Text style={modalFormstyles.inputLabel}>
        {text} {isRequired && <Text style={modalFormstyles.required}>*</Text>}
      </Text>
    </>
  );
}
