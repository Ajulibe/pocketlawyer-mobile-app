import { LawyerModel } from "models/Interfaces";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
import COLORS from "utils/Colors";
import CONSTANTS from "utils/Constants";
import { hp, wp } from "utils/Dimensions";

interface Props {
  onClick?: () => void;
  data: LawyerModel;
}

export default function LawyerTile({ data, onClick }: Props) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onClick}>
      <Image
        source={{
          uri: CONSTANTS.user,
        }}
        style={styles.user}
      />
      <Text style={styles.name}>{data?.name}</Text>
      {/* <Text style={styles.price}>N56,000</Text> */}
      <Text style={styles.location}>{data?.address}</Text>
      <StarRating
        maxStars={5}
        rating={3}
        disabled={true}
        starSize={8}
        fullStarColor={"rgba(50, 173, 38, 1)"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: wp(104),
    display: "flex",
    paddingVertical: hp(12),
    paddingHorizontal: wp(8),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F2FD",
    borderRadius: 8,
    marginRight: wp(12),
    marginBottom: hp(12),
  },
  user: {
    width: wp(42),
    height: wp(42),
    borderRadius: wp(42),
  },
  name: {
    lineHeight: hp(20),
    fontWeight: "500",
    fontSize: wp(13),
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    marginTop: hp(10),
    marginBottom: hp(6),
    textAlign: "center",
  },
  price: {
    fontSize: wp(10),
    lineHeight: hp(12),
    fontWeight: "400",
    color: COLORS.light.primary,
    fontFamily: "Roboto",
    marginBottom: hp(3),
  },
  location: {
    fontSize: wp(9),
    lineHeight: hp(14),
    fontWeight: "300",
    color: COLORS.light.primary,
    marginBottom: hp(9),
    fontFamily: "Roboto-Regular",
    marginTop: hp(5),
  },
});
