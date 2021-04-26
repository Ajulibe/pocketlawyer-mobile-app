import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text } from "react-native";

// type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN_STACK>;
type Props = StackScreenProps<any>;

const HistoryScreen = ({ navigation }: Props) => {
  return (
    <>
      <Text>History</Text>
    </>
  );
};

export default HistoryScreen;
