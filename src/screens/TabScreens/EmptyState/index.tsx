import React from "react";
import {Text} from "react-native";
import {StyleSheet, View} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import COLORS from "utils/Colors";
import {hp} from "utils/Dimensions";
import {MaterialCommunityIcons} from "@expo/vector-icons";

interface Props {
  message: string;
}

export const EmptyState = ({message}: Props) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="timer-sand-empty"
        size={24}
        color={COLORS.light.primary}
      />
      <Text
        style={[
          styles.topFindingswrapper,
          {
            fontFamily: "Roboto-Regular",
            color: COLORS.light.primary,
            fontWeight: "300",
          },
        ]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP("90%"),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F3F2FD",
    borderColor: COLORS.light.carouselBtn2,
    borderRadius: 8,
  },
  topFindingswrapper: {
    display: "flex",
    textAlign: "center",
    marginTop: hp(20),
  },
});
