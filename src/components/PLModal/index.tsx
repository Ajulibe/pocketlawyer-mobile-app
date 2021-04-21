import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Modal, Text } from "@ui-kitten/components";

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
      >
        <Card disabled={true}>{children}</Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});
