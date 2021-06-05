import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import { hp } from "utils/Dimensions";

interface Props {
  modalVisible: boolean;
  // setModalVisible: (state: boolean) => void;
  content: React.ReactNode;
}

const LoadingSpinner = (props: Props) => {
  const { modalVisible, content } = props;

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <ActivityIndicator />
        <View style={{ height: hp(12) }} />
        <Text style={styles.textStyle}>{content}</Text>
      </View>
    </Modal>
  );
};
export default LoadingSpinner;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    // backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
});
