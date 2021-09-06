import globalStyles from "css/GlobalCss";
import {View} from "native-base";
import React from "react";
import {Platform, StyleSheet, Text, TouchableOpacity} from "react-native";
import COLORS from "utils/Colors";
import {Category} from "database/DBData";
import {hp, wp} from "utils/Dimensions";
import {CategoryDb} from "database/CategoryDb";

interface Props {
  category: Category;
  onClick: () => void;
  colors: string;
}

export default function CategoryCard({
  category,
  onClick,
  colors = "#F3F2FD",
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.wrapper, {backgroundColor: colors}]}
      onPress={() => onClick()}>
      <View style={globalStyles.topWrapper}>
        <View style={globalStyles.iconWrapper}>
          {CategoryDb.findByCode({catCode: category.categoryCode!}).newImage}
          {/* <Image
            source={
              CategoryDb.findByCode({ catCode: category.categoryCode }).image
            }
            style={styles.icon}
          /> */}
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {category.categoryName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: wp(120),
    // height: Platform.OS === "ios" ? hp(140) : hp(139),
    display: "flex",
    paddingBottom: hp(12),
    paddingHorizontal: wp(12),
    alignItems: "center",
    backgroundColor: "#F3F2FD",
    borderRadius: 8,
    marginLeft: wp(15),
    borderWidth: Platform.OS === "ios" ? 0.3 : 0.4,
    borderColor: COLORS.light.carouselBtn2,
    ...globalStyles.shadowLight,
  },

  icon: {
    resizeMode: "contain",
    width: wp(14),
    height: wp(14),
  },
  title: {
    lineHeight: hp(20),
    fontWeight: "400",
    fontSize: wp(14),
    color: COLORS.light.primary,
    fontFamily: "Roboto",
    marginTop: hp(16),
    textAlign: "center",
  },
});
