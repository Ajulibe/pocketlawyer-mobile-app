import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "navigation/HomeStack";
import { ROUTES } from "navigation/Routes";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { CategoryDb } from "database/CategoryDb";
import CategoryCard from "../../Components/CategoryCard";

type Props = StackScreenProps<HomeStackParamList, ROUTES.ALL_CATEGORY_SCREEN>;

export default function AllCategory({ navigation }: Props) {
  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar navigation={navigation} title="All Categories" />
        <FlatList
          data={CategoryDb.categories}
          numColumns={2}
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onClick={() => navigation.navigate(ROUTES.PICK_LAWYER_SCREEN)}
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
