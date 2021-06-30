import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import { hp, wp } from "utils/Dimensions";
import COLORS from "utils/Colors";

interface Props {
  onBackdropPress: () => void;
  visible: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

export const PLModal: React.FC<Props> = ({
  onBackdropPress,
  visible,
  onPress,
  children,
}) => {
  return (
    <View>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={onBackdropPress}
        style={{ position: "absolute", top: hp(120) }}
      >
        <Card
          disabled={true}
          style={{
            backgroundColor: COLORS.light.splashscreenbg,
            // marginBottom: wp(300),
            borderWidth: Platform.OS === "ios" ? 1 : 1,
            borderColor: COLORS.light.primary,
          }}
        >
          {children}
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});
