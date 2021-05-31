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

import { allServices } from "database/DBData";

type Props = StackScreenProps<HomeStackParamList, ROUTES.PICK_LAWYER_SCREEN>;

export default function PickLawyer({ navigation, route }: Props) {
  const param: any = route.params;

  //--> state for the section
  const [lawyers, setLawyers] = React.useState<any>();
  const [servicename, setServiceName] = React.useState<any>("");

  React.useEffect(() => {
    if (typeof param === "undefined") {
      return;
    }
    //--> find the category name based on the params code
    const category = allServices.find((item) => {
      return item.serviceCode === param;
    });

    setServiceName(category?.serviceName);

    getLawyersByCategory(param);
  }, [param]);

  //--> api to fetch all lawyers in this category using param
  const getLawyersByCategory = async (param: any) => {
    try {
      const { data } = await axiosClient.post("Category/GetSPUserCategories", [
        {
          CategoryCode: param,
        },
      ]);
      setLawyers(data.data);
    } catch (error) {
      return error;
    }
  };

  // const data = [
  //   { id: "1" },
  //   { id: "2" },
  //   { id: "3" },
  //   { id: "4" },
  //   { id: "5" },
  //   { id: "6" },
  //   { id: "7" },
  //   { id: "8" },
  //   { id: "9" },
  // ];
  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar
          navigation={navigation}
          title={servicename}
          showBorderBottom={true}
        />
        <View
          style={[styles.container, { flexGrow: 1 }]}
          // keyboardShouldPersistTaps="handled"
          // bounces={false}
        >
          <Text style={globalStyles.H2Style}>Pick a Lawyer</Text>
          <View style={{ height: hp(13) }} />
          <FlatList
            data={lawyers}
            renderItem={({ item }: any) => (
              <LawyerTile
                data={item}
                //send the id of the lawyer as a param
                onClick={() =>
                  navigation.navigate(ROUTES.LAWYER_DETAIL_SCREEN, {
                    item: item,
                    serviceName: servicename,
                    serviceCode: param,
                  })
                }
              />
            )}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
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
