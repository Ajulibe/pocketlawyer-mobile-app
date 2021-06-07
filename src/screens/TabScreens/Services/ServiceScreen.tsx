import { useFocusEffect } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/routers";
import { StackScreenProps } from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import ServiceSearch from "components/ServiceSearch";
import globalStyles from "css/GlobalCss";
import { CategoryDb } from "database/CategoryDb";
import { ServiceDb } from "database/ServiceDb";
import { ROUTES } from "navigation/Routes";
import { ServiceStackParamList } from "navigation/ServiceStack";
import React, { useEffect } from "react";
import {
  BackHandler,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import { hp, wp } from "utils/Dimensions";
import ServiceCardTile from "./Components/ServiceCardTile";

type Props = StackScreenProps<ServiceStackParamList, ROUTES.SERVICE_SCREEN>;

const ServiceScreen = ({ navigation }: Props) => {
  const ServiceHeader = () => (
    <>
      <ServiceSearch />
      <View style={{ height: hp(13) }} />
    </>
  );

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
            hideBackButton={true}
          />
          <FlatList
            data={ServiceDb.services}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={[styles.container]}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => ServiceHeader()}
            renderItem={({ item }) => (
              <ServiceCardTile
                service={item}
                onClick={() => {
                  navigation.navigate(ROUTES.PICK_LAWYER_SCREEN, {
                    category: CategoryDb.findByCode({
                      catCode: item.categoryCode,
                    }),
                    service: item,
                  });
                }}
              />
            )}
          />
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
