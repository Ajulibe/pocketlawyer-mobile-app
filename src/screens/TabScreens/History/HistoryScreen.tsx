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
import { hp, wp } from "utils/Dimensions";
import HistoryListTile from "./Components/HistoryListTile";

// type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN_STACK>;
type Props = StackScreenProps<any>;

const HistoryScreen = ({ navigation }: Props) => {
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
