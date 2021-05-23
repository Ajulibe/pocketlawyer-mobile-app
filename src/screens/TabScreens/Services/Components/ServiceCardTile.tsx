import { View } from "native-base";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import COLORS from "utils/Colors";
import CONSTANTS from "utils/Constants";
import { hp, wp } from "utils/Dimensions";
import StarRating from "react-native-star-rating";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import globalStyles from "css/GlobalCss";

export default function ServiceCardTile() {
  return (
    <View style={[styles.wrapper, globalStyles.shadowLight]}>
      <MaterialCommunityIcons
        name="card-bulleted-off-outline"
        size={24}
        color={COLORS.light.primary}
      />

      <Text style={styles.title}>Business Name Registration</Text>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={24}
        color={COLORS.light.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: hp(16),
    paddingHorizontal: wp(15),
    alignItems: "center",
    backgroundColor: "#F3F2FD",
    borderRadius: 8,
    marginBottom: wp(12),
  },
  title: {
    flex: 1,
    fontSize: wp(14),
    lineHeight: hp(17),
    fontWeight: "500",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    marginLeft: wp(16),
  },
});
