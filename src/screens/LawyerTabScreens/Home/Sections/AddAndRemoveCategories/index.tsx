import React from "react";
import {SafeAreaView, ScrollView} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "navigation/LawyerStackScreens/HomeStack";
import globalStyles from "css/GlobalCss";
import CustomAppbar from "components/CustomAppbar";
import {styles} from "./styles";
import {RemoveCategories} from "./sections/RemoveCategoriesPage";
import {AddCategories} from "./sections/AddCategoriesPage";

type Props = StackScreenProps<HomeStackParamList>;

const AddMoreCategories: React.FC<Props> = ({navigation, route}) => {
  const data = route?.params;

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <CustomAppbar
        navigation={navigation}
        title="Add Category"
        showBorderBottom={false}
        avatar={true}
      />

      <ScrollView contentContainerStyle={styles.contentWraper}>
        <AddCategories routedata={data} navigation={navigation} />
        {/* @ts-ignore */}
        {data?.length === 1 ? null : (
          <RemoveCategories routedata={data} navigation={navigation} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMoreCategories;
