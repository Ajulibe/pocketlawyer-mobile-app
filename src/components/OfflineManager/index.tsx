/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {useState} from "react";
import {View, StyleSheet, Text} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {wp} from "utils/Dimensions";
import PLButton from "components/PLButton/PLButton.component";
import {BottomSheet} from "react-native-elements";

interface Props {
  isConnected: boolean;
}

export const OfflineModal = ({isConnected}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  const onRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      if (isConnected) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setIsRetrying(false);
    }, 500);
  };

  return (
    <BottomSheet
      modalProps={{
        visible: isVisible,
        statusBarTranslucent: true,
      }}
      isVisible={isVisible}
      containerStyle={{backgroundColor: "rgba(0,0,0,0.7)"}}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Connection Error</Text>
        <Text style={styles.modalText}>
          Oops🙊! Your device is not connected to the Internet.
        </Text>

        <PLButton
          textColor={"#fff"}
          btnText={"Retry"}
          onClick={onRetry}
          isLoading={isRetrying}
          style={styles.button}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: wp(20),
    fontWeight: "600",
    fontFamily: "Roboto-Bold",
  },
  modalText: {
    fontSize: wp(16),
    color: "#555",
    marginTop: 14,
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ef5da8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 10,
    borderColor: "#FBF2FD",
    borderWidth: 2,
    width: widthPercentageToDP("90%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
