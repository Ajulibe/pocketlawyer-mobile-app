import { StackScreenProps } from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import ServiceSearch from "components/ServiceSearch";
import globalStyles from "css/GlobalCss";
import { CategoryDb } from "database/CategoryDb";
import { ServiceDb } from "database/ServiceDb";
import { ROUTES } from "navigation/Routes";
import { ServiceStackParamList } from "navigation/ServiceStack";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
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
                //send the selected service name as a param
                onClick={() =>
                  navigation.navigate(ROUTES.PICK_LAWYER_SCREEN, {
                    category: CategoryDb.findByCode({
                      catCode: item.categoryCode,
                    }),
                    service: item,
                  })
                }
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
