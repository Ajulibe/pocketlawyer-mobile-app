import {LawyerModel} from "models/Interfaces";
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import StarRating from "react-native-star-rating";
import {getFirstLetterFromName} from "screens/TabScreens/Account/UpdateProfile/utilsFn";
import COLORS from "utils/Colors";
import CONSTANTS from "utils/Constants";
import {hp, wp} from "utils/Dimensions";
import {Avatar} from "react-native-elements";
import {widthPercentageToDP} from "react-native-responsive-screen";

interface Props {
  onClick: () => void;
  data: LawyerModel;
}

export default function LawyerTile({data, onClick}: Props) {
  const colors = [
    "#727072",
    "#c7c8de",
    "#3b3d8b",
    "#1b1464",
    "#c33d41",
    "#4a4e69",
    "#5282bb",
  ];

  const randomColor = (colors: Array<string>) => {
    var i = Math.floor(Math.random() * colors.length);
    if (colors && i in colors) {
      return colors.splice(i, 1)[0];
    }
    return colors[i];
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onClick}>
      <View style={{height: hp(60), marginTop: hp(20)}}>
        <Avatar
          titleStyle={{
            fontFamily: "Roboto-Medium",
            fontSize: wp(14),
            color: COLORS.light.white,
          }}
          containerStyle={styles.user}
          size="medium"
          placeholderStyle={{backgroundColor: randomColor(colors)}}
          rounded
          title={`${getFirstLetterFromName(data?.name ?? "")}`}
          source={{
            uri: `https://${data?.avatar}`,
          }}
          activeOpacity={0}
        />
      </View>

      <View style={{flex: 1}}>
        <Text style={styles.name} numberOfLines={2}>
          {data?.name}
        </Text>
        {/* <Text style={styles.price}>N56,000</Text> */}
        <Text style={styles.location} numberOfLines={1}>
          {data?.address}
        </Text>
      </View>
      {/* <StarRating
        maxStars={5}
        rating={3}
        disabled={true}
        starSize={8}
        fullStarColor={"rgba(50, 173, 38, 1)"}
      /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // width: wp(103.9),
    width: "30%",
    display: "flex",
    paddingBottom: hp(12),
    paddingHorizontal: wp(8),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F2FD",
    borderRadius: 8,
    marginLeft: "1.67%",
    marginRight: "1.67%",
    // marginRight: wp(12),
    marginBottom: hp(12),
    borderWidth: 0.5,
    borderColor: COLORS.light.primaryLight,
  },
  user: {
    width: wp(42),
    height: wp(42),
    borderRadius: wp(42),
  },
  name: {
    lineHeight: hp(20),
    fontWeight: "500",
    fontSize: wp(14),
    color: COLORS.light.primary,
    fontFamily: "Roboto-Bold",
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
    fontSize: wp(12),
    lineHeight: hp(20),
    fontWeight: "300",
    color: COLORS.light.primary,
    marginBottom: hp(9),
    fontFamily: "Roboto-Medium",
    marginTop: hp(5),
  },
});
