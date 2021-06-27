import { View } from "native-base";
import React from "react";
import { Image, Platform, StyleSheet, Text } from "react-native";
import COLORS from "utils/Colors";
import CONSTANTS from "utils/Constants";
import { hp, wp } from "utils/Dimensions";
import StarRating from "react-native-star-rating";
import { LawyerModel } from "models/Interfaces";

interface Props {
  lawyer: LawyerModel;
  onClick: () => void;
}

export default function TopFindingsCard(props: Props) {
  const { lawyer } = props;
  return (
    <View style={styles.wrapper}>
      <Image style={styles.user} source={{ uri: CONSTANTS.user }} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{lawyer?.name}</Text>
        <Text style={styles.subtitle}>{lawyer?.categoryName}</Text>
      </View>
      <View style={styles.trailingWrapper}>
        {/* <Text style={styles.trailingTitle}>N56,000</Text> */}
        <StarRating
          maxStars={5}
          rating={3}
          disabled={true}
          starSize={8}
          fullStarColor={"rgba(50, 173, 38, 1)"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: hp(10),
    paddingHorizontal: wp(15),
    alignItems: "center",
    backgroundColor: "#F3F2FD",
    borderRadius: 8,
    marginBottom: wp(6),
    borderWidth: Platform.OS === "ios" ? 0.2 : 0.4,
    borderColor: COLORS.light.carouselBtn2,
  },
  user: {
    resizeMode: "cover",
    width: wp(50),
    height: wp(50),
    borderRadius: 50,
  },
  titleWrapper: {
    marginLeft: wp(19),
  },
  title: {
    fontSize: wp(12),
    lineHeight: hp(20),
    fontWeight: "500",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    marginBottom: hp(6),
  },
  subtitle: {
    fontSize: wp(10),
    lineHeight: hp(15),
    fontWeight: "300",
    color: COLORS.light.primary,
    fontFamily: "Roboto",
  },
  trailingWrapper: {
    flex: 1,
    alignItems: "flex-end",
  },
  trailingTitle: {
    fontSize: wp(10),
    lineHeight: hp(16),
    fontWeight: "400",
    color: COLORS.light.primary,
    fontFamily: "Roboto",
    marginBottom: hp(7),
    opacity: 0,
  },
});
