import {StackScreenProps} from "@react-navigation/stack";
import ServiceSearch from "components/ServiceSearch";
import globalStyles from "css/GlobalCss";
import {HomeStackParamList} from "navigation/LawyerStackScreens/HomeStack";
import {ROUTES} from "navigation/Routes";
import React, {useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Button,
  StatusBar,
} from "react-native";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import axiosClient from "utils/axiosClient";
import {hp, wp} from "utils/Dimensions";
import {Category} from "database/DBData";
import CategoryCard from "./Components/CategoryCard";
import TopFindingsCard from "./Components/TopFindingsCard";
import styles from "./homeStyles";
import {CategoryDb} from "database/CategoryDb";
import {LawyerModel} from "models/Interfaces";
import {useScrollToTop} from "@react-navigation/native";
import {CardColors} from "./CardColors";

//--> REDUX
import {useAppSelector, useAppDispatch} from "redux/hooks";
import COLORS from "utils/Colors";
import {getUser} from "redux/actions";
import {
  RectangularSkeleton,
  CategoriesSkeleton,
} from "components/PLSkeleton/PLSkeleton.component";
import {Avatar} from "react-native-elements";
import {
  capitalizeFirstLetter,
  getFirstLetterFromName,
} from "../Account/UpdateProfile/utilsFn";

import {ServiceHistoryInterface} from "screens/TabScreens/History/HistoryScreen";
import {showError} from "../Home/Sections/BottomSheet/BottomSheetUtils/FormHelpers";
import {EmptyState} from "../Global/EmptyState";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {OfflineModal} from "components/OfflineManager";
import {useIsConnected} from "react-native-offline";

type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN_LAWYER>;

const HomeScreen = ({navigation}: Props) => {
  const [category, setCategory] = React.useState<Category[]>([]);
  const [lawyers, setLawyers] = React.useState<LawyerModel[]>([]);
  const time = React.useRef("");
  const [profileImage, setProfileImage] = useState("abc.jpg");

  const [isCategoryLoading, setIsCategoryLoading] = React.useState(true);
  const [isTopFindingsLoading, setIsTopFindingsLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const userData = useAppSelector((state) => state?.users?.user); //--> state from redux store
  // const {user_, metaData} = userData;
  const isConnected = useIsConnected();
  const user_ = userData?.user_;
  const metaData = userData?.metaData;

  const dispatch = useAppDispatch();
  const ref = React.useRef<ScrollView | null>(null);
  const [history, setHistory] = React.useState<ServiceHistoryInterface[]>([]);
  const isMounted = React.useRef(false);

  useScrollToTop(ref);

  const wait = (timeout: any) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //--> get the time of the day
  const getTimePeriod = () => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      time.current = "Good morning";
    } else if (curHr < 18) {
      time.current = "Good afternoon";
    } else {
      time.current = "Good evening";
    }
  };

  //-->Get User's Categories whenever screen is focused
  useFocusEffect(
    React.useCallback(() => {
      if (isConnected) {
        getTimePeriod();
        getCategories();
        getHistory();
      }
    }, []),
  );

  React.useEffect(() => {
    if (typeof metaData === "undefined") {
      return;
    }
    setAvatar();
  }, [metaData]);

  const setAvatar = () => {
    let latestAvatar = metaData
      .slice()
      .reverse()
      .find((item: any) => {
        return item.key === "Avatar";
      });

    if (metaData?.length !== 0) {
      setProfileImage(latestAvatar?.value);
    } else {
      setProfileImage("abc.jpg");
    }
  };

  const getCategories = async () => {
    if (!isMounted.current) {
      setIsCategoryLoading(true);
    }

    try {
      const userID = await AsyncStorageUtil.getUserId();
      dispatch(getUser({userID: Number(userID)}));
      const getCats = await axiosClient.get(
        `Category/GetUserCategories/${userID}`,
      );
      if (getCats !== null && getCats?.data?.data?.length !== 0) {
        const cats: Category[] = getCats?.data?.data;
        const arr: string[] = [];
        cats.map((item: any) => {
          arr.push(item.categoryName);
        });

        const unique = [...new Set(arr)];

        setCategory(cats);
        getLawyers();
        setIsCategoryLoading(false);
        isMounted.current = true;
      } else {
        setCategory(CategoryDb.categories.slice(0, 4));
        setIsCategoryLoading(false);
      }
    } catch (error) {
      return error;
    }
  };

  const getLawyers = async () => {
    if (category == null) return;
    const catCodes = category.map((item) => {
      return {CategoryCode: item.categoryCode};
    });

    try {
      const {data} = await axiosClient.post(
        "Category/GetSPUserCategories",
        catCodes,
      );

      if (data != null) {
        const lawyers: LawyerModel[] = data?.data;
        setLawyers(lawyers);
        setIsTopFindingsLoading(false);
      }
    } catch (error) {}
  };

  const getHistory = async () => {
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
      } else {
        showError("Error encountered while loading service history");
      }
    } catch (error) {
      return;
    }
  };

  const skeletonArray = [1, 2, 3, 4, 5];

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.5)" />
        <View style={[styles.container, {flexGrow: 1, paddingHorizontal: 0}]}>
          <View style={[styles.header, {paddingHorizontal: wp(20)}]}>
            <View style={styles.headerTitleWrapper}>
              <Text style={globalStyles.H1Style}>
                Hi&nbsp;
                {capitalizeFirstLetter(
                  user_ &&
                    user_?.firstName &&
                    typeof user_?.firstName !== "undefined"
                    ? user_?.firstName
                    : user_?.company?.contactFirstName &&
                      typeof user_?.company?.contactFirstName !== "undefined"
                    ? user_?.company?.contactFirstName
                    : "",
                )}
                &nbsp;👋🏼
              </Text>
              <Text style={styles.greeting}>
                Here are your available services
              </Text>
            </View>

            <Avatar
              titleStyle={{
                fontFamily: "Roboto-Bold",
                fontSize: wp(12),
                color: COLORS.light.white,
              }}
              containerStyle={styles.user}
              size="medium"
              placeholderStyle={{backgroundColor: COLORS.light.primary}}
              rounded
              title={`${getFirstLetterFromName(
                user_ &&
                  user_?.firstName &&
                  typeof user_?.firstName !== "undefined"
                  ? user_?.firstName
                  : user_?.company?.contactFirstName &&
                    typeof user_?.company?.contactFirstName !== "undefined"
                  ? user_?.company?.contactFirstName
                  : "",
              )} ${getFirstLetterFromName(
                user_ &&
                  user_?.lastName &&
                  typeof user_?.lastName !== "undefined"
                  ? user_?.lastName
                  : user_?.company?.contactLastName &&
                    typeof user_?.company?.contactLastName !== "undefined"
                  ? user_?.company?.contactLastName
                  : "",
              )}`}
              source={{
                uri: `https://${profileImage}`,
              }}
              activeOpacity={0}
              onPress={() => navigation.navigate(ROUTES.UPDATE_IMAGE_LAWYER)}
            />
          </View>

          {/* <ServiceSearch /> */}
          {!isConnected && <OfflineModal isConnected={isConnected} />}

          <View style={{flex: 1}}>
            <View style={styles.titleWithViewMore}>
              <Text style={globalStyles.H2Style}>Recent Requests</Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.push(ROUTES.ALL_CATEGORY_SCREEN_LAWYER, history)
                }>
                {!isCategoryLoading && (
                  <Text style={styles.viewMore}>View all</Text>
                )}
              </TouchableOpacity>
            </View>

            {isTopFindingsLoading ? (
              <View
                style={[
                  styles.skeleton,
                  {
                    width: widthPercentageToDP("90%"),
                    alignSelf: "center",
                  },
                ]}>
                <RectangularSkeleton isLoading={isTopFindingsLoading} />
                <RectangularSkeleton isLoading={isTopFindingsLoading} />
                <RectangularSkeleton isLoading={isTopFindingsLoading} />
              </View>
            ) : null}

            {!isTopFindingsLoading && (
              <View style={styles.requestWrapper}>
                {/* map through the list of service requests */}
                {history.length > 0 ? (
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    scrollEnabled={true}
                    data={history.length > 2 ? history.slice(0, 3) : history}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <TopFindingsCard
                        key={item.userID}
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
                ) : (
                  <EmptyState title="You currently have no requests" />
                )}
              </View>
            )}

            <View style={styles.titleWithViewMore}>
              <Text style={[globalStyles.H2Style, {marginBottom: hp(5)}]}>
                Your Categories
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push(ROUTES.ADD_MORE_CATEGORIES, category)
                }>
                {!isCategoryLoading && (
                  <View style={styles.addCategory}>
                    <Text style={styles.viewMore}>Add/Remove Category</Text>
                    {/* <Ionicons
                      name="add-circle-sharp"
                      size={17}
                      color={COLORS.light.primary}
                    /> */}
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {isCategoryLoading ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  height: hp(150),
                }}>
                {skeletonArray.map((item) => {
                  return (
                    <CategoriesSkeleton
                      isLoading={isCategoryLoading}
                      key={item}
                    />
                  );
                })}
              </View>
            ) : null}

            {!isCategoryLoading && (
              <View style={styles.slidingScroll}>
                {category?.length > 0 ? (
                  <FlatList
                    horizontal={true}
                    data={category}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <CategoryCard
                        category={item}
                        colors={CardColors[index]}
                        onClick={
                          () => {}
                          // navigation.navigate(ROUTES.CAT_SERVICE_SCREEN_LAWYER, {
                          //   category: item,
                          // })
                        }
                      />
                    )}
                  />
                ) : (
                  <EmptyState title="You currently have no selected Categories" />
                )}
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
