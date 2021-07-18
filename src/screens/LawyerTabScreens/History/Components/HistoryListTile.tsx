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
import {hp, wp} from "utils/Dimensions";
import Utilities from "utils/Utilities";
import {ServiceHistoryInterface} from "../HistoryScreen";
import {Avatar, Badge, Icon, withBadge} from "react-native-elements";

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

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => onClick()}>
      <Image style={styles.user} source={{uri: CONSTANTS.user}} />

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{history.serviceProvider}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {history.serviceName}
        </Text>
        <View style={styles.dateWrapper}>
          <Text style={styles.date}>
            {Utilities.currentDate(history.createdAt.toString())}
          </Text>
        </View>
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
    marginBottom: hp(10),
    borderWidth: Platform.OS === "ios" ? 0.3 : 0.4,
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
    fontSize: Platform.OS === "ios" ? wp(15) : wp(14),
    lineHeight: hp(20),
    fontWeight: "700",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    marginBottom: hp(2),
  },
  subtitle: {
    fontSize: wp(12),
    fontWeight: "300",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Regular",
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
    fontSize: wp(9),
    lineHeight: hp(14),
    fontWeight: "300",
    color: COLORS.light.white,
    fontFamily: "Roboto-Medium",
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
