import React, {useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "navigation/HomeStack";
import {ROUTES} from "navigation/Routes";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";

import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {hp, wp} from "utils/Dimensions";
import LawyerTile from "./Components/LawyerTile";
import axiosClient from "utils/axiosClient";
import {LawyerModel} from "models/Interfaces";
import FullPageLoader from "components/FullPageLoader/index.component";
import {CategoryDb} from "database/CategoryDb";
import {EmptyState} from "screens/TabScreens/EmptyState";

type Props = StackScreenProps<HomeStackParamList, ROUTES.PICK_LAWYER_SCREEN>;

export default function PickLawyer({navigation, route}: Props) {
  const service = route.params.service;
  const [category, setCategory] = useState<any>("");

  React.useEffect(() => {
    if (typeof route.params.service === "undefined") {
      return;
    }
    getCategoryData();
  }, [service]);

  const getCategoryData = () => {
    const category = CategoryDb.findByCode({
      catCode: service?.categoryCode,
    });
    setCategory(category);
  };

  //--> state for the section
  const [lawyers, setLawyers] = React.useState<LawyerModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (category === "") {
      return;
    }
    getLawyersByCategory();
  }, [category]);

  //--> api to fetch all lawyers in this category using param
  const getLawyersByCategory = async () => {
    setIsLoading(true);
    try {
      const {data} = await axiosClient.post("Category/GetSPUserCategories", [
        {
          CategoryCode: category.categoryCode,
        },
      ]);
      const lawyers: LawyerModel[] = data?.data;
      setLawyers(lawyers);
    } catch (error) {
      return error;
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <FullPageLoader message="SEARCHING FOR LAWYERS..." />
      ) : (
        <SafeAreaView style={globalStyles.AndroidSafeArea}>
          <CustomAppbar
            navigation={navigation}
            title={category.categoryName}
            showBorderBottom={true}
          />
          <View style={[styles.container, {flexGrow: 1}]}>
            <Text style={globalStyles.H2Style}>Pick a Lawyer</Text>
            <View style={{height: hp(13)}} />

            {lawyers.length === 0 && !isLoading ? (
              <View style={{height: hp(250)}}>
                <EmptyState message={"No Lawyers Available"} />
              </View>
            ) : (
              <FlatList
                data={lawyers} //--> change back to lawyers
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}: any) => (
                  <>
                    <LawyerTile
                      data={item}
                      onClick={() =>
                        navigation.navigate(ROUTES.LAWYER_DETAIL_SCREEN, {
                          lawyer: item,
                          category: category,
                          service: service,
                        })
                      }
                    />
                  </>
                )}
              />
            )}
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
    flex: 1,
  },
});
