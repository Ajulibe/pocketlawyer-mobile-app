import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "navigation/HomeStack";
import { ROUTES } from "navigation/Routes";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { hp, wp } from "utils/Dimensions";
import LawyerTile from "./Components/LawyerTile";

type Props = StackScreenProps<HomeStackParamList, ROUTES.PICK_LAWYER_SCREEN>;

export default function PickLawyer({ navigation }: Props) {
  const data = [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
  ];
  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar
          navigation={navigation}
          title="Business Name Registration"
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
            data={data}
            renderItem={({ item }) => (
              <LawyerTile
                onClick={() => navigation.navigate(ROUTES.LAWYER_DETAIL_SCREEN)}
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
