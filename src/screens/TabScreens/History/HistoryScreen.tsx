import { StackScreenProps } from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import ServiceSearch from "components/ServiceSearch";
import globalStyles from "css/GlobalCss";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import axiosClient from "utils/axiosClient";
import { hp, wp } from "utils/Dimensions";
import { showError } from "../Home/Sections/BottomSheet/BottomSheetUtils/FormHelpers";
import HistoryListTile from "./Components/HistoryListTile";

// type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN_STACK>;
type Props = StackScreenProps<any>;
export interface ServiceHistoryInterface {
  serviceHistoryID: number;
  tempServiceHistoryID: number;
  userID: number;
  serviceProvider: string;
  serviceProviderID: number;
  serviceName: string;
  serviceCode: string;
  categoryCode: string;
  amount: number;
  userType: number;
  status: number;
  transactionRef: null;
  createdAt: Date;
  serviceProviderImage: string;
}

const HistoryScreen = ({ navigation }: Props) => {
  const [history, setHistory] = React.useState<ServiceHistoryInterface[]>([]);

  React.useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      const userID = await AsyncStorageUtil.getUserId();
      const response = await axiosClient.get(
        `Service/GetServiceHistory?UserID=${userID}`
      );
      const totalCount = response?.data?.count;
      const data = response?.data?.data;

      if (response != null && response?.data?.data?.length != 0) {
        const history: ServiceHistoryInterface[] = data.map(
          (h: any) => h?.serviceHistory
        );
        setHistory(history);
      } else {
        showError("Error encountered while loading service history");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <KeyboardAvoidingView
          behavior={"padding"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS == "android" ? -300 : -50}
        >
          <CustomAppbar
            navigation={navigation}
            title="Service History"
            showBorderBottom={false}
          />
          <ScrollView
            contentContainerStyle={[styles.container, { flexGrow: 1 }]}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <ServiceSearch />
            <View style={{ height: hp(13) }} />
            <HistoryListTile />
            <HistoryListTile />
            <HistoryListTile />
            <HistoryListTile />
            <HistoryListTile />
            <HistoryListTile />
            <HistoryListTile />
            <HistoryListTile />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
  },
});
