import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "utils/Colors";
import {hp, wp} from "utils/Dimensions";
import Utilities from "utils/Utilities";
import {ServiceHistoryInterface} from "../HistoryScreen";
import {Avatar, Badge, Icon, withBadge} from "react-native-elements";
import {getFirstLetterFromName} from "screens/TabScreens/Account/UpdateProfile/utilsFn";

interface Props {
  history: ServiceHistoryInterface;
  onClick: () => void;
}
export default function HistoryListTile({history, onClick}: Props) {
  const status = () => {
    if (history.status === 1) {
      return "pending";
    } else {
      return "completed";
    }
  };

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
    <TouchableOpacity style={styles.wrapper} onPress={() => onClick()}>
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
        title={`${getFirstLetterFromName(history?.serviceProvider ?? "")}`}
        source={{
          uri: `https://${history?.serviceProviderImage}`,
        }}
        activeOpacity={0}
      />

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{history.serviceProvider}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {history.serviceName}
        </Text>
        {/* <View style={styles.dateWrapper}>
          <Text style={styles.date}>
            {Utilities.currentDate(history.createdAt.toString())}
          </Text>
        </View> */}
      </View>

      <View style={styles.trailingWrapper}>
        <Text style={styles.date}>
          {Utilities.currentDate(history.createdAt.toString())}
        </Text>
        <Text style={styles.trailingTitle}>
          {Utilities.dateTime(history.createdAt.toString())}
        </Text>
        <Text style={styles.status}>{status()}</Text>
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
    marginBottom: wp(12),
    borderWidth: Platform.OS === "ios" ? 0.3 : 0.4,
    borderColor: COLORS.light.carouselBtn2,
  },
  user: {
    resizeMode: "cover",
    width: wp(45),
    height: wp(45),
    borderRadius: wp(45),
  },
  titleWrapper: {
    marginLeft: wp(19),
    flex: 1,
    height: hp(65),
  },
  title: {
    fontSize: Platform.OS === "ios" ? wp(14) : wp(14),
    lineHeight: hp(20),
    fontWeight: "700",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Bold",
    marginBottom: hp(7),
  },
  subtitle: {
    fontSize: wp(12),
    fontWeight: "300",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Regular",
    lineHeight: wp(18),
  },
  dateWrapper: {
    backgroundColor: COLORS.light.primary,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(5),
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: COLORS.light.blackLight,
    shadowOpacity: 0.2,
  },
  date: {
    fontSize: wp(10),
    lineHeight: hp(14),
    fontWeight: "300",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    marginBottom: hp(8),
  },
  trailingWrapper: {
    flex: 1,
    alignItems: "flex-end",
    height: hp(65),
  },
  trailingTitle: {
    fontSize: wp(10),
    lineHeight: hp(12),
    fontWeight: "400",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    marginBottom: hp(8),
  },
  status: {
    paddingVertical: hp(4),
    paddingHorizontal: wp(7),
    fontSize: wp(8),
    lineHeight: hp(10),
    fontWeight: "400",
    color: COLORS.light.primary,
    fontFamily: "Roboto",
    backgroundColor: "#DEFFD6",
    borderRadius: 9,
    overflow: "hidden",
  },
});
