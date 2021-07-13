import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "navigation/HomeStack";
import {ROUTES} from "navigation/Routes";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import React from "react";
import {FlatList, SafeAreaView, ScrollView, View} from "react-native";
import {CategoryDb} from "database/CategoryDb";
import CategoryCard from "../../Components/CategoryCard";
import TopFindingsCard from "../../Components/TopFindingsCard";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {hp} from "utils/Dimensions";

type Props = StackScreenProps<HomeStackParamList, ROUTES.ALL_CATEGORY_SCREEN>;

export default function AllCategory({navigation}: Props) {
  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar navigation={navigation} title="All Categories" />
        <ScrollView
          contentContainerStyle={{
            width: widthPercentageToDP("100"),
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(20),
          }}>
          <View style={{width: widthPercentageToDP("90")}}>
            <TopFindingsCard
              onClick={() => {
                navigation.navigate(ROUTES.CAT_SERVICE_SCREEN_LAWYER);
              }}
            />
            <TopFindingsCard />
            <TopFindingsCard />
            <TopFindingsCard />
            <TopFindingsCard />
            <TopFindingsCard />
            <TopFindingsCard />
            <TopFindingsCard />
          </View>
        </ScrollView>
        {/* <FlatList
          data={CategoryDb.categories}
          numColumns={2}
          contentContainerStyle={{flexGrow: 1, alignItems: "center"}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            
            <CategoryCard
              category={item}
              onClick={
                () => {}
                // navigation.navigate(ROUTES.CAT_SERVICE_SCREEN, {
                //   category: item,
                // })
              }
            />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 20,
              }}
            />
          )}
        /> */}
      </SafeAreaView>
    </>
  );
}
