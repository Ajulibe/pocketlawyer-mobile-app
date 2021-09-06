import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "navigation/HomeStack";
import {ROUTES} from "navigation/Routes";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import React from "react";
import {FlatList, SafeAreaView, View} from "react-native";
import {CategoryDb} from "database/CategoryDb";
import CategoryCard from "../../Components/CategoryCard";
import {
  CardColors,
  CardColorsTwo,
} from "screens/LawyerTabScreens/Home/CardColors";

type Props = StackScreenProps<HomeStackParamList, ROUTES.ALL_CATEGORY_SCREEN>;

export default function AllCategory({navigation}: Props) {
  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar navigation={navigation} title="All Categories" />
        <FlatList
          data={CategoryDb.categories}
          numColumns={2}
          contentContainerStyle={{flexGrow: 1, alignItems: "center"}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <CategoryCard
              category={item}
              colors={CardColorsTwo[index]}
              onClick={() =>
                navigation.navigate(ROUTES.CAT_SERVICE_SCREEN, {
                  category: item,
                })
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
        />
      </SafeAreaView>
    </>
  );
}
