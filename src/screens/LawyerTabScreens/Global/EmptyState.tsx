import React from "react";
import {Text, View} from "react-native";
import styles from "../Home/homeStyles";
import COLORS from "utils/Colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";

interface Props {
  title: string;
}

export const EmptyState = ({title}: Props) => {
  return (
    <View style={styles.emptyState}>
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons
          name="timer-sand-empty"
          size={14}
          color={COLORS.light.primary}
        />
      </View>
      <Text style={styles.emptyText}>{title}</Text>
    </View>
  );
};
