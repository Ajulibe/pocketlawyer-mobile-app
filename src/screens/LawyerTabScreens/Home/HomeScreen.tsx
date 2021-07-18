import {StackScreenProps} from "@react-navigation/stack";
import ServiceSearch from "components/ServiceSearch";
import globalStyles from "css/GlobalCss";
import {HomeStackParamList} from "navigation/LawyerStackScreens/HomeStack";
import {ROUTES} from "navigation/Routes";
import React, {useState} from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
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

//--> REDUX
import {useAppSelector, useAppDispatch} from "redux/hooks";
import PLButton from "components/PLButton/PLButton.component";
import COLORS from "utils/Colors";
import {getUser} from "redux/actions";
import {RectangularSkeleton} from "components/PLSkeleton/PLSkeleton.component";
import {Avatar} from "react-native-elements";
import {
  capitalizeFirstLetter,
  getFirstLetterFromName,
} from "../Account/UpdateProfile/utilsFn";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {ServiceHistoryInterface} from "screens/TabScreens/History/HistoryScreen";
import {showError} from "../Home/Sections/BottomSheet/BottomSheetUtils/FormHelpers";

type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN_LAWYER>;

const HomeScreen = ({navigation}: Props) => {
  const [category, setCategory] = React.useState<Category[]>([]);
  const [lawyers, setLawyers] = React.useState<LawyerModel[]>([]);
  const time = React.useRef("");
  const [profileImage, setProfileImage] = useState("abc.jpg");

  const [isCategoryLoading, setIsCategoryLoading] = React.useState(true);
  const [isTopFindingsLoading, setIsTopFindingsLoading] = React.useState(true);

  const userData = useAppSelector((state) => state?.users?.user); //--> state from redux store
  const {user_, metaData} = userData;

  const dispatch = useAppDispatch();
  const ref = React.useRef<ScrollView | null>(null);
  const [history, setHistory] = React.useState<ServiceHistoryInterface[]>([]);

  useScrollToTop(ref);

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

  //-->Get User's Categories
  React.useEffect(() => {
    getTimePeriod();
    getCategories();
    getHistory();
  }, []);

  React.useEffect(() => {
    if (typeof metaData === "undefined") {
      return;
    }
    setAvatar();
  }, [metaData]);

  const setAvatar = () => {
    if (metaData?.length !== 0) {
      setProfileImage(metaData[metaData?.length - 1]?.value);
    } else {
      setProfileImage("abc.jpg");
    }
  };

  const getCategories = async () => {
    setIsCategoryLoading(true);

    try {
      const userID = await AsyncStorageUtil.getUserId();
      dispatch(getUser({userID: Number(userID)}));
      const getCats = await axiosClient.get(
        `Category/GetUserCategories/${userID}`,
      );
      if (getCats != null && getCats?.data?.data?.length != 0) {
        const cats: Category[] = getCats?.data?.data;

        setCategory(cats);
        getLawyers();
        setIsCategoryLoading(false);
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

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <View style={[styles.container, {flexGrow: 1, paddingHorizontal: 0}]}>
          <View style={[styles.header, {paddingHorizontal: wp(20)}]}>
            <View style={styles.headerTitleWrapper}>
              <Text style={globalStyles.H1Style}>
                Hi &nbsp;
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
                fontFamily: "Roboto-Medium",
                fontSize: wp(14),
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

          <ServiceSearch />

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

            {isTopFindingsLoading && (
              <View style={styles.skeleton}>
                <RectangularSkeleton isLoading={isTopFindingsLoading} />
                <RectangularSkeleton isLoading={isTopFindingsLoading} />
                <RectangularSkeleton isLoading={isTopFindingsLoading} />
              </View>
            )}

            {!isTopFindingsLoading && (
              <View style={styles.requestWrapper}>
                {/* map through the list of service requests */}
                <FlatList
                  scrollEnabled={false}
                  data={history.length > 2 ? history.slice(0, 3) : history}
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
            )}

            <View style={styles.titleWithViewMore}>
              <Text style={globalStyles.H2Style}>Your Categories</Text>
              <TouchableOpacity
                onPress={
                  () => true
                  // navigation.push(ROUTES.ALL_CATEGORY_SCREEN_LAWYER, history)
                }>
                {/* {!isCategoryLoading && (
                  <Text style={styles.viewMore}>View all</Text>
                )} */}
              </TouchableOpacity>
            </View>
            <View style={styles.slidingScroll}>
              {!isCategoryLoading ? (
                <FlatList
                  horizontal={true}
                  data={category}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <CategoryCard
                      category={item}
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
                <RectangularSkeleton isLoading={isCategoryLoading} />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
