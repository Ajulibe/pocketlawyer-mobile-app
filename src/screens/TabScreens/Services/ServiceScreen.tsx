import { StackScreenProps } from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import ServiceSearch from "components/ServiceSearch";
import globalStyles from "css/GlobalCss";
import { ServiceDb } from "database/ServiceDb";
import { ROUTES } from "navigation/Routes";
import { ServiceStackParamList } from "navigation/ServiceStack";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { hp, wp } from "utils/Dimensions";
import ServiceCardTile from "./Components/ServiceCardTile";

type Props = StackScreenProps<ServiceStackParamList, ROUTES.SERVICE_SCREEN>;
// type Props = StackScreenProps<any>;

const ServiceScreen = ({ navigation }: Props) => {
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
            title="Services"
            showBorderBottom={false}
          />
          <ScrollView
            contentContainerStyle={[styles.container, { flexGrow: 1 }]}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <ServiceSearch />
            <View style={{ height: hp(13) }} />
            <FlatList
              data={ServiceDb.services}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ServiceCardTile
                  service={item}
                  onClick={() => navigation.navigate(ROUTES.PICK_LAWYER_SCREEN)}
                />
              )}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
  },
});
