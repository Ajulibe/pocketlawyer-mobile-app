import { AntDesign } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { hp, wp } from "utils/Dimensions";
import * as Animatable from "react-native-animatable";
import COLORS from "utils/Colors";
import { BusinessNameAndRegistration } from "./BottomSheetServices/BusinessNameAndRegistration";

interface Props {
  modalVisible: boolean;
  navigation: any;
  closeModal: () => void;
  serviceName: string;
  serviceCode: string;
}

const ServiceNames = {
  COMPANY_REGISTRATION: "Company name registration",
};

export default function SendMoneyModal(props: Props) {
  console.log(props.serviceName);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.closeModal()}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={props.closeModal}
      >
        <View style={[styles.container]}>
          <View style={{ height: 120 }} />
          <View style={styles.quickActions}>
            <Text style={styles.action}>Back</Text>
            <Text style={styles.action}>Close</Text>
          </View>
          <Animatable.View
            style={styles.wrapper}
            key={0}
            animation={"slideInUp"} //pulse
            easing={"linear"}
            duration={500}
          >
            <TouchableWithoutFeedback>
              <View>
                {props.serviceName === ServiceNames.COMPANY_REGISTRATION && (
                  <BusinessNameAndRegistration
                    navigation={props.navigation}
                    closeModal={props.closeModal}
                    serviceCode={props.serviceCode}
                  />
                )}
                {/* <BottomSheetContent
                  navigation={props.navigation}
                  closeModal={props.closeModal}
                /> */}
              </View>
            </TouchableWithoutFeedback>
          </Animatable.View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: wp(21),
  },
  wrapper: {
    flex: 1,
    paddingVertical: hp(24),
    paddingTop: wp(40),
    paddingHorizontal: wp(21),
    width: "100%",
    backgroundColor: "#F9F8FE",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  quickActions: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: wp(22),
    paddingVertical: hp(4),
    justifyContent: "space-between",
  },
  action: {
    fontSize: wp(16),
    lineHeight: hp(18),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: COLORS.light.white,
  },
});
