import { StackScreenProps } from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import { ServiceDb } from "database/ServiceDb";
import { HomeStackParamList } from "navigation/HomeStack";
import { ROUTES } from "navigation/Routes";
import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { hp, wp } from "utils/Dimensions";
import ServiceCardTile from "../../../Services/Components/ServiceCardTile";
type Props = StackScreenProps<HomeStackParamList, ROUTES.CAT_SERVICE_SCREEN>;

const CatServiceScreen = ({ navigation, route }: Props) => {
  const category = route.params?.category;

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar
          navigation={navigation}
          title={category.categoryName}
          showBorderBottom={false}
        />
        <FlatList
          data={ServiceDb.findByCategoryCode({
            catCode: category.categoryCode,
          })}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => (
            <Text style={[globalStyles.H2Style, { marginBottom: 12 }]}>
              Services
            </Text>
          )}
          contentContainerStyle={[styles.container]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ServiceCardTile
              service={item}
              onClick={() =>
                navigation.navigate(ROUTES.PICK_LAWYER_SCREEN, {
                  // category: category,
                  service: item,
                })
              }
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default CatServiceScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
  },
});
