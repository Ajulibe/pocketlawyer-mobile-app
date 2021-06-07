import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { Dispatch } from "react";
import { hp, wp } from "utils/Dimensions";
import * as Animatable from "react-native-animatable";
import COLORS from "utils/Colors";
import { Service } from "database/DBData";
import { LawyerModel } from "models/Interfaces";
import renderView from "./renderView";

import { BlurView } from "expo-blur";

export interface ModalProps {
  modalVisible: boolean;
  navigation: any;
  closeModal: () => void;
  service: Service;
  lawyer: LawyerModel;
  historyId: number;
  amount: number;
}

export default function BottomSheetModal(props: ModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.closeModal()}
    >
      <View style={[styles.container]}>
        <View style={{ height: 120 }} />
        <View style={styles.quickActions}>
          <TouchableOpacity
            onPress={() => {
              props.closeModal();
              props.navigation.goBack();
            }}
          >
            <Text style={styles.action}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={props.closeModal}>
            <Text style={styles.action}>Close</Text>
          </TouchableOpacity>
        </View>

        <Animatable.View
          style={styles.wrapper}
          key={0}
          animation={"slideInUp"} //pulse
          easing={"linear"}
          duration={500}
        >
          <View style={{ flex: 1 }}>{renderView(props)}</View>
        </Animatable.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: wp(21),
  },
  wrapper: {
    flex: 1,
    // paddingVertical: hp(24),
    paddingTop: wp(40),
    paddingHorizontal: wp(21),
    width: "100%",
    backgroundColor: "#F9F8FE",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: Platform.OS === "ios" ? 0.2 : 0.4,
    borderColor: COLORS.light.carouselBtn2,
  },
  quickActions: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: wp(22),
    paddingVertical: hp(20),
    justifyContent: "space-between",
  },
  action: {
    fontSize: wp(16),
    lineHeight: hp(23),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: COLORS.light.white,
  },
});
