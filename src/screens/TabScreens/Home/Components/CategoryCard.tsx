import globalStyles from "css/GlobalCss";
import { View } from "native-base";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "utils/Colors";
import CONSTANTS from "utils/Constants";
import { Category } from "database/DBData";
import { hp, wp } from "utils/Dimensions";
import { CategoryDb } from "database/CategoryDb";

interface Props {
  category: Category;
  onClick: () => void;
}

export default function CategoryCard({ category, onClick }: Props) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => onClick()}>
      <Image
        source={CategoryDb.findByCode({ catCode: category.categoryCode }).image}
        style={styles.icon}
      />
      <Text style={styles.title}>{category.categoryName}-</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: wp(120),
    height: hp(108),
    display: "flex",
    paddingVertical: hp(13),
    paddingHorizontal: wp(16),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F2FD",
    borderRadius: 8,
    marginRight: wp(24),
    ...globalStyles.shadowLight,
  },
  icon: {
    resizeMode: "contain",
    width: wp(30),
    height: wp(30),
  },
  title: {
    lineHeight: hp(13),
    fontWeight: "400",
    fontSize: wp(11),
    color: COLORS.light.primary,
    fontFamily: "Roboto",
    marginTop: hp(16),
    textAlign: "center",
  },
});
