import {View} from "native-base";
import React from "react";
import {Image, Platform, Pressable, StyleSheet, Text} from "react-native";
import COLORS from "utils/Colors";
import CONSTANTS from "utils/Constants";
import {hp, wp} from "utils/Dimensions";
import StarRating from "react-native-star-rating";
import {ServiceHistoryInterface} from "screens/LawyerTabScreens/History/HistoryScreen";
import {Badge} from "native-base";
import {Avatar} from "react-native-elements";
import {getFirstLetterFromName} from "screens/LawyerTabScreens/Account/UpdateProfile/utilsFn";

interface Props {
  onClick?: () => void;
  history?: ServiceHistoryInterface;
  status?: number;
}

type actionType = "warning" | "success" | "danger" | "info";

// const badgeCreator = ({name, ...rest}:Props ) => {
//   return (
//     <Badge  {...rest} style={styles.badge}>
//       <Text style={styles.badgetitle}>{name}</Text>
//     </Badge>
//   );
// };

const renderBadge = (status: number) => {
  switch (status) {
    case 1:
      return (
        <Badge info style={styles.badge}>
          <Text style={styles.badgetitle}>Not Paid</Text>
        </Badge>
      );
    case 2:
      return (
        <Badge warning style={styles.badge}>
          <Text style={styles.badgetitle}>In progress</Text>
        </Badge>
      );
    case 4:
      return (
        <Badge success style={styles.badge}>
          <Text style={styles.badgetitle}>Accepted</Text>
        </Badge>
      );
    case 6:
      return (
        <Badge danger style={styles.badge}>
          <Text style={styles.badgetitle}>Declined</Text>
        </Badge>
      );
    default:
      return (
        <Badge info style={styles.badge}>
          <Text style={styles.badgetitle}>Unassigned</Text>
        </Badge>
      );
  }
};

export default function TopFindingsCard({onClick, history, status}: Props) {
  return (
    <Pressable onPress={onClick}>
      <View style={styles.wrapper}>
        {/* <Image
          style={styles.user}
          source={{
            uri: `https://${history?.serviceProviderImage}`,
          }}
        /> */}
        <Avatar
          titleStyle={{
            fontFamily: "Roboto-Bold",
            fontSize: wp(12),
            color: COLORS.light.white,
          }}
          containerStyle={styles.user}
          size="medium"
          placeholderStyle={{backgroundColor: COLORS.light.primary}}
          rounded
          title={`${getFirstLetterFromName(history?.serviceProvider ?? "")}`}
          source={{
            uri: `https://${history?.serviceProviderImage}`,
            cache: "force-cache",
          }}
          activeOpacity={0}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{history?.serviceProvider}</Text>
          <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
            {history?.serviceName}
          </Text>
        </View>
        <View style={styles.trailingWrapper}>
          {status ? (
            renderBadge(status)
          ) : (
            <StarRating
              maxStars={5}
              rating={3}
              disabled={true}
              starSize={8}
              fullStarColor={"rgba(50, 173, 38, 1)"}
            />
          )}
        </View>
      </View>
    </Pressable>
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
    fontSize: wp(15),
    lineHeight: hp(20),
    fontWeight: "700",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Bold",
    marginBottom: hp(6),
  },
  subtitle: {
    fontSize: wp(11),
    lineHeight: hp(15),
    fontWeight: "300",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Regular",
    width: wp(180),
  },
  badgetitle: {
    fontSize: wp(8),
    color: COLORS.light.white,
    fontFamily: "Roboto-Regular",
  },
  badge: {
    height: hp(20),
  },
  trailingWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: wp(70),
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
