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
import CONSTANTS from "utils/Constants";
import { hp, wp } from "utils/Dimensions";
import Utilities from "utils/Utilities";
import { ServiceHistoryInterface } from "../HistoryScreen";

interface Props {
  history: ServiceHistoryInterface;
  onClick: () => void;
}
export default function HistoryListTile({ history, onClick }: Props) {
  const status = () => {
    if (history.status === 1) {
      return "pending";
    } else {
      return "completed";
    }
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => onClick()}>
      <Image style={styles.user} source={{ uri: CONSTANTS.user }} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{history.serviceProvider}</Text>
        <Text style={styles.subtitle}>{history.serviceName}</Text>
        <Text style={styles.date}>
          {Utilities.currentDate(history.createdAt.toString())}
        </Text>
      </View>
      <View style={styles.trailingWrapper}>
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
    flex: 1,
  },
  title: {
    fontSize: wp(12),
    lineHeight: hp(14),
    fontWeight: "500",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    marginBottom: hp(6),
  },
  subtitle: {
    fontSize: wp(10),
    lineHeight: hp(12),
    fontWeight: "300",
    color: COLORS.light.primary,
    fontFamily: "Roboto",
    marginBottom: hp(6),
  },
  date: {
    fontSize: wp(8),
    lineHeight: hp(10),
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
    lineHeight: hp(12),
    fontWeight: "400",
    color: COLORS.light.primary,
    fontFamily: "Roboto",
    marginBottom: hp(7),
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
