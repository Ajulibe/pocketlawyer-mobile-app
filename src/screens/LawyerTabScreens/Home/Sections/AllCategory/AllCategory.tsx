import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "navigation/LawyerStackScreens/HomeStack";
import {ROUTES} from "navigation/Routes";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import {CategoryDb} from "database/CategoryDb";
import CategoryCard from "../../Components/CategoryCard";
import TopFindingsCard from "../../Components/TopFindingsCard";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {hp, wp} from "utils/Dimensions";
import {ServiceHistoryInterface} from "screens/LawyerTabScreens/History/HistoryScreen";

type Props = StackScreenProps<
  HomeStackParamList,
  ROUTES.ALL_CATEGORY_SCREEN_LAWYER
>;

export default function AllCategory({navigation, route}: Props) {
  const history = route.params;
  console.log(history);

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar navigation={navigation} title="All Categories" />
        <View style={styles.container}>
          <View style={styles.resultsWrapper}>
            <FlatList
              scrollEnabled={false}
              data={history}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TopFindingsCard
                  status={item.status}
                  history={item}
                  onClick={() => {
                    if (item.status === 6) {
                      return;
                    } else {
                      navigation.navigate(
                        ROUTES.CAT_SERVICE_SCREEN_LAWYER,
                        item.serviceName,
                      );
                    }
                  }}
                />
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP("100"),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(20),
  },
  resultsWrapper: {
    width: widthPercentageToDP("90"),
  },
});
