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
import { widthPercentageToDP } from "react-native-responsive-screen";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import { hp, wp } from "utils/Dimensions";
import ServiceCardTile from "./Components/ServiceCardTile";
import { useScrollToTop } from "@react-navigation/native";

type Props = StackScreenProps<ServiceStackParamList, ROUTES.SERVICE_SCREEN>;

const ServiceScreen = ({ navigation }: Props) => {
  const ServiceHeader = () => (
    <>
      <ServiceSearch />
      <View style={{ height: hp(13) }} />
    </>
  );

  const ref = React.useRef<FlatList | null>(null);

  useScrollToTop(ref);

  return (
    <>
      <SafeAreaView
        style={[globalStyles.AndroidSafeArea, styles.safeAreaContainer]}
      >
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

          <ServiceSearch style={styles.searchBar} />

          <FlatList
            ref={ref}
            data={ServiceDb.services}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={[styles.container]}
            keyExtractor={(item, index) => index.toString()}
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
  safeAreaContainer: {},
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
  },
  searchBar: {
    width: widthPercentageToDP("95%"),
    alignSelf: "center",
  },
});
