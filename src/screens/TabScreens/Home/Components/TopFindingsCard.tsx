import {View} from "native-base";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import COLORS from "utils/Colors";
import CONSTANTS from "utils/Constants";
import {hp, wp} from "utils/Dimensions";
import StarRating from "react-native-star-rating";
import {LawyerModel} from "models/Interfaces";
import {Avatar} from "react-native-elements";
import {getFirstLetterFromName} from "screens/TabScreens/Account/UpdateProfile/utilsFn";

interface Props {
  lawyer: LawyerModel;
  onClick: () => void;
}

export default function TopFindingsCard(props: Props) {
  const {lawyer} = props;

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
    <TouchableOpacity onPress={props.onClick}>
      <View style={styles.wrapper}>
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
          title={`${getFirstLetterFromName(lawyer?.name ?? "")}`}
          source={{
            uri: `https://${lawyer?.avatar}`,
          }}
          activeOpacity={0}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{lawyer?.name}</Text>
          <Text style={styles.subtitle}>{lawyer?.categoryName}</Text>
        </View>
        {/* <View style={styles.trailingWrapper}>
        <Text style={styles.trailingTitle}>N56,000</Text>
        <StarRating
          maxStars={5}
          rating={3}
          disabled={true}
          starSize={8}
          fullStarColor={"rgba(50, 173, 38, 1)"}
        />
      </View> */}
      </View>
    </TouchableOpacity>
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
    marginBottom: wp(9),
    borderWidth: Platform.OS === "ios" ? 0.3 : 0.4,
    borderColor: COLORS.light.carouselBtn2,
  },
  user: {
    resizeMode: "cover",
    width: wp(40),
    height: wp(40),
    borderRadius: 40,
  },
  titleWrapper: {
    marginLeft: wp(19),
  },
  title: {
    fontSize: wp(16),
    lineHeight: hp(20),
    fontWeight: "700",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Bold",
    marginBottom: hp(6),
  },
  subtitle: {
    fontSize: wp(14),
    lineHeight: hp(15),
    fontWeight: "300",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
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
