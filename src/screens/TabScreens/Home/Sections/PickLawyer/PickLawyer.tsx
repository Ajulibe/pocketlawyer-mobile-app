import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "navigation/HomeStack";
import { ROUTES } from "navigation/Routes";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { hp, wp } from "utils/Dimensions";
import LawyerTile from "./Components/LawyerTile";
import axiosClient from "utils/axiosClient";
import { LawyerModel } from "models/Interfaces";
import FullPageLoader from "components/FullPageLoader";

type Props = StackScreenProps<HomeStackParamList, ROUTES.PICK_LAWYER_SCREEN>;

export default function PickLawyer({ navigation, route }: Props) {
  const category = route.params.category;
  const service = route.params.service;

  //--> state for the section
  const [lawyers, setLawyers] = React.useState<LawyerModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof route.params.category === "undefined") {
      return;
    }

    getLawyersByCategory();
  }, [category]);

  //--> api to fetch all lawyers in this category using param
  const getLawyersByCategory = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosClient.post("Category/GetSPUserCategories", [
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
          <View style={[styles.container, { flexGrow: 1 }]}>
            <Text style={globalStyles.H2Style}>Pick a Lawyer</Text>
            <View style={{ height: hp(13) }} />

            <FlatList
              data={lawyers} //--> change back to lawyers
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }: any) => (
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
