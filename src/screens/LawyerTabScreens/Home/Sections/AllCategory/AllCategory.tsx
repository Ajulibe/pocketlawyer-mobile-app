import React, {useEffect} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "navigation/LawyerStackScreens/HomeStack";
import {ROUTES} from "navigation/Routes";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";

import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import TopFindingsCard from "../../Components/TopFindingsCard";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {hp, wp} from "utils/Dimensions";
import {ServiceHistoryInterface} from "screens/LawyerTabScreens/History/HistoryScreen";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import axiosClient from "utils/axiosClient";
import {showError} from "../BottomSheet/BottomSheetUtils/FormHelpers";
import {useScrollToTop} from "@react-navigation/native";
import {EmptyState} from "screens/LawyerTabScreens/Global/EmptyState";

type Props = StackScreenProps<
  HomeStackParamList,
  ROUTES.ALL_CATEGORY_SCREEN_LAWYER
>;

export default function AllCategory({navigation, route}: Props) {
  const [history, setHistory] = React.useState<ServiceHistoryInterface[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const ref = React.useRef<FlatList | null>(null);
  useScrollToTop(ref);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = React.useCallback(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    setRefreshing(true);
    try {
      const userID = await AsyncStorageUtil.getUserId();

      const response = await axiosClient.get(
        `Service/GetServiceHistory?UserID=${userID}`,
      );
      const data = response?.data?.data;

      if (response != null && response?.data?.data?.length != 0) {
        const history: ServiceHistoryInterface[] = data.map(
          (h: any) => h?.serviceHistory,
        );
        setHistory(history);
        setRefreshing(false);
        setIsLoading(false);
      } else {
        showError("Error encountered while loading service history");
      }
    } catch (error) {
      setIsLoading(false);
      setRefreshing(false);
      return;
    }
  };

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar navigation={navigation} title="All Categories" />

        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator style={styles.indicator} />
          ) : (
            <View style={styles.resultsWrapper}>
              {history.length > 0 ? (
                <FlatList
                  scrollEnabled={true}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  style={{flex: 1}}
                  data={history}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TopFindingsCard
                      status={item?.status}
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
              ) : (
                <EmptyState title="You currently have no requests" />
              )}
            </View>
          )}
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
    flex: 1,
  },
  indicator: {
    marginBottom: hp(200),
  },
  resultsWrapper: {
    width: widthPercentageToDP("90"),
    flex: 1,
  },
});
