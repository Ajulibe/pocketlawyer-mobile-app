import {StackScreenProps} from "@react-navigation/stack";
import ServiceSearch from "components/ServiceSearch";
import globalStyles from "css/GlobalCss";
import {HomeStackParamList} from "navigation/HomeStack";
import {ROUTES} from "navigation/Routes";
import React, {useState} from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  LogBox,
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

type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN>;

const HomeScreen = ({navigation}: Props) => {
  const [category, setCategory] = React.useState<Category[]>([]);
  const [lawyers, setLawyers] = React.useState<LawyerModel[]>([]);
  const time = React.useRef("");
  const [profileImage, setProfileImage] = useState("abc.jpg");

  const [isCategoryLoading, setIsCategoryLoading] = React.useState(true);
  const [isTopFindingsLoading, setIsTopFindingsLoading] = React.useState(true);

  const userData = useAppSelector((state) => state?.users?.user); //--> state from redux store
  const {user_, metaData} = userData;
  console.log(user_);

  const dispatch = useAppDispatch();

  const ref = React.useRef<ScrollView | null>(null);

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
    // getUserDetails();
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

  const getLawyersFn = React.useCallback(() => {
    getLawyers();
  }, [category]);

  React.useEffect(() => {
    getLawyersFn();
  }, [getLawyersFn]);

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
        setTimeout(() => {
          setIsTopFindingsLoading(false);
        }, 2000);
      }
    } catch (error) {}
  };

  LogBox.ignoreAllLogs();
  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <View style={[styles.container, {flexGrow: 1, paddingHorizontal: 0}]}>
          <View style={[styles.header, {paddingHorizontal: wp(20)}]}>
            <View style={styles.headerTitleWrapper}>
              <Text style={globalStyles.H1Style}>
                Hi&nbsp;
                {capitalizeFirstLetter(
                  user_ && user_?.userType === 1
                    ? user_?.firstName
                    : user_?.company?.contactFirstName,
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
                user_ && user_?.userType === 1
                  ? user_?.firstName
                  : user_?.company?.contactFirstName,
              )} ${getFirstLetterFromName(
                user_ && user_?.userType === 1
                  ? user_?.lastName
                  : user_?.company?.contactLastName,
              )}`}
              source={{
                uri: `https://${profileImage}`,
              }}
              activeOpacity={0}
              onPress={() => navigation.navigate(ROUTES.UPDATE_IMAGE)}
            />
          </View>

          <ServiceSearch />

          <ScrollView
            style={{flex: 1}}
            ref={ref}
            contentContainerStyle={{}}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <View
              style={[styles.titleWithViewMore, {paddingHorizontal: wp(20)}]}>
              <Text style={globalStyles.H2Style}>Your Categories</Text>
              <TouchableOpacity
                onPress={() => navigation.push(ROUTES.ALL_CATEGORY_SCREEN)}>
                {!isCategoryLoading && (
                  <Text style={styles.viewMore}>View all</Text>
                )}
              </TouchableOpacity>
            </View>

            <RectangularSkeleton isLoading={isCategoryLoading} />

            <View style={styles.slidingScroll}>
              {!isCategoryLoading && (
                <FlatList
                  horizontal={true}
                  data={category}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <CategoryCard
                      category={item}
                      onClick={() =>
                        navigation.navigate(ROUTES.CAT_SERVICE_SCREEN, {
                          category: item,
                        })
                      }
                    />
                  )}
                />
              )}
            </View>

            <View style={{paddingHorizontal: wp(20)}}>
              <Text
                style={[
                  globalStyles.H2Style,
                  {marginTop: hp(22), marginBottom: hp(6)},
                ]}>
                Top Findings
              </Text>

              <Text style={styles.topFindingSubtitle}>
                Based on selected categories
              </Text>

              <RectangularSkeleton isLoading={isTopFindingsLoading} />
              <RectangularSkeleton isLoading={isTopFindingsLoading} />
              <RectangularSkeleton isLoading={isTopFindingsLoading} />
              <RectangularSkeleton isLoading={isTopFindingsLoading} />

              {!isTopFindingsLoading && (
                <FlatList
                  data={lawyers}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TopFindingsCard
                      lawyer={item}
                      onClick={() => {
                        // navigation.navigate(ROUTES.CAT_SERVICE_SCREEN, {
                        //   category: item,
                        // });
                      }}
                    />
                  )}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
