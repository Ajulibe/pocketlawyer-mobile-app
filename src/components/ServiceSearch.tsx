import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import COLORS from "utils/Colors";
import { hp, wp } from "utils/Dimensions";

export default function ServiceSearch() {
  return (
    <View style={styles.searchWrapper}>
      <Feather name="search" size={16} color={"rgba(0, 0, 0, 0.3)"} />
      <TextInput
        placeholder="Search for services"
        placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
        style={styles.searchInput}
        // value="Search for services..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: "#F1F1F2",
    paddingVertical: hp(8),
    paddingHorizontal: wp(16),
    marginBottom: hp(24),
    borderRadius: 8,
    minHeight: hp(40),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    fontWeight: "500",
    fontSize: wp(12),
    color: COLORS.light.primary,
    margin: 0,
    padding: 0,
    textTransform: "uppercase",
    fontFamily: "Roboto",
    marginLeft: wp(10),
  },
});
