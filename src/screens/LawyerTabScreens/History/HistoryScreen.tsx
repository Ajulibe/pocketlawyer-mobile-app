import {StackScreenProps} from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import ServiceSearch from "components/ServiceSearch";
import globalStyles from "css/GlobalCss";
import {ROUTES} from "navigation/Routes";
import React, {useState} from "react";
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
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import axiosClient from "utils/axiosClient";
import {hp, wp} from "utils/Dimensions";
import {showError} from "../Home/Sections/BottomSheet/BottomSheetUtils/FormHelpers";
import HistoryListTile from "./Components/HistoryListTile";
import {useScrollToTop, useFocusEffect} from "@react-navigation/native";
import FullPageLoader from "components/FullPageLoader/index.component";
import {EmptyState} from "screens/TabScreens/EmptyState";

// type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN_STACK>;
type Props = StackScreenProps<any>;
export interface ServiceHistoryInterface {
  serviceHistoryID: number;
  tempServiceHistoryID: number;
  userID: number;
  serviceProvider: string;
  serviceProviderID: number;
  serviceName: string;
  serviceCode: string;
  categoryCode: string;
  amount: number;
  userType: number;
  status: number;
  transactionRef: null;
  createdAt: Date;
  serviceProviderImage: string;
}

const HistoryScreen = ({navigation}: Props) => {
  const [history, setHistory] = React.useState<ServiceHistoryInterface[]>([]);
  const ref = React.useRef<FlatList | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTop(ref);

  // React.useEffect(() => {
  //   getHistory();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getHistory();
    }, []),
  );

  const getHistory = async () => {
    setIsLoading(true);
    try {
      const userID = await AsyncStorageUtil.getUserId();
      const response = await axiosClient.get(
        `Service/GetServiceHistory?UserID=${userID}`,
      );
      const totalCount = response?.data?.count;
      const data = response?.data?.data;

      if (response != null && response?.data?.data?.length != 0) {
        const history: ServiceHistoryInterface[] = data.map(
          (h: any) => h?.serviceHistory,
        );
        setHistory(history);
        console.log(history, "lawyer history");
      } else {
        showError("Error encountered while loading service history");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <FullPageLoader message="FETCHING HISTORY" />
      ) : (
        <SafeAreaView style={globalStyles.AndroidSafeArea}>
          <KeyboardAvoidingView
            behavior={"padding"}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS == "android" ? -300 : -50}>
            <CustomAppbar
              navigation={navigation}
              title="Service History"
              showBorderBottom={false}
              hideBackButton={true}
            />
            {/* <ServiceSearch /> */}
            {history.length === 0 && !isLoading ? (
              <EmptyState message={"You have no Service History"} />
            ) : null}

            <FlatList
              ref={ref}
              data={history}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.container]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <HistoryListTile
                  history={item}
                  onClick={() => {
                    // navigation.navigate(ROUTES.CAT_SERVICE_SCREEN, {
                    //   category: item,
                    // });
                  }}
                />
              )}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
  },
});
