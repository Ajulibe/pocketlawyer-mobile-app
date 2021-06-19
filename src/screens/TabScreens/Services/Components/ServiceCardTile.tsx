import { View } from "native-base";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import COLORS from "utils/Colors";
import { hp, wp } from "utils/Dimensions";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "css/GlobalCss";
import { Service } from "database/DBData";
import { ServiceDb } from "database/ServiceDb";

interface Props {
  service: Service;
  onClick: () => void;
}
export default function ServiceCardTile({ service, onClick }: Props) {
  return (
    <TouchableOpacity
      style={[styles.wrapper, globalStyles.shadowLight]}
      onPress={onClick}
    >
      <View style={globalStyles.iconWrapper}>
        <Image
          source={
            ServiceDb.findByServiceCode({ serviceCode: service.serviceCode })
              .image
          }
          style={styles.icon}
        />
      </View>

      <Text style={styles.title}>{service.serviceName}</Text>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={24}
        color={COLORS.light.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: hp(16),
    paddingHorizontal: wp(15),
    alignItems: "center",
    backgroundColor: "#F3F2FD",
    borderRadius: 8,
    marginBottom: wp(12),
    borderWidth: Platform.OS === "ios" ? 0.3 : 0.4,
    borderColor: COLORS.light.carouselBtn2,
  },
  title: {
    flex: 1,
    fontSize: wp(14),
    lineHeight: Platform.OS === "ios" ? hp(20) : hp(28),
    fontWeight: "500",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Regular",
    marginLeft: wp(16),
  },
  icon: {
    width: wp(14),
    height: wp(14),
  },
});
