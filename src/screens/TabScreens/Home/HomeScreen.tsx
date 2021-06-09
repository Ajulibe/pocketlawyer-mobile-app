import { StackScreenProps } from "@react-navigation/stack";
import ServiceSearch from "components/ServiceSearch";
import globalStyles from "css/GlobalCss";
import { HomeStackParamList } from "navigation/HomeStack";
import { ROUTES } from "navigation/Routes";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import axiosClient from "utils/axiosClient";
import CONSTANTS from "utils/Constants";
import { hp } from "utils/Dimensions";
import { Category, Service } from "database/DBData";
import CategoryCard from "./Components/CategoryCard";
import TopFindingsCard from "./Components/TopFindingsCard";
import styles from "./homeStyles";
import { CategoryDb } from "database/CategoryDb";
import { LawyerModel } from "models/Interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN>;

const HomeScreen = ({ navigation }: Props) => {
  const [category, setCategory] = React.useState<Category[]>([]);
  const [lawyers, setLawyers] = React.useState<LawyerModel[]>([]);
  const [user, setUser] = React.useState("");
  const [time, setTime] = React.useState("");
  //--> Route redirects...
  React.useLayoutEffect(() => {
    (async () => {
      const catRoute = await AsyncStorageUtil.getGotoPickLawyer();
      const checkoutRoute = await AsyncStorageUtil.getGotoCheckout();

      if (catRoute != null && catRoute != "") {
        const service: Service = JSON.parse(catRoute);
        AsyncStorageUtil.setGotoPickLawyer("");
        navigation.navigate(ROUTES.PICK_LAWYER_SCREEN, {
          category: CategoryDb.findByCode({
            catCode: service.categoryCode,
          }),
          service: service,
        });
      } else if (checkoutRoute != null && checkoutRoute != "") {
        const service: Service = JSON.parse(checkoutRoute);
        AsyncStorageUtil.setGotoCheckout("");
        navigation.navigate(ROUTES.PICK_LAWYER_SCREEN, {
          category: CategoryDb.findByCode({
            catCode: service.categoryCode,
          }),
          service: service,
        });
      }
    })();
  });

  //--> get the time of the day
  const getTimePeriod = () => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      setTime("Good morning");
    } else if (curHr < 18) {
      setTime("Good afternoon");
    } else if (curHr < 20) {
      setTime("Good evening");
    } else {
      setTime("Sleep well");
    }
  };

  //--> capitalize the first letter of the name
  const capitalizeFirstLetter = (name: string) => {
    const lower = name?.toLowerCase();
    return name?.charAt(0).toUpperCase() + lower?.slice(1);
  };
  //-->Get User's Categories
  React.useEffect(() => {
    getTimePeriod();
    getCategories();
  }, []);
  const getCategories = async () => {
    const userID = await AsyncStorageUtil.getUserId();
    const name = await AsyncStorage.getItem("firstName");
    const firstname = capitalizeFirstLetter(name ? name : "");
    setUser(firstname ? firstname : "");
    const getCats = await axiosClient.get(
      `Category/GetUserCategories/${userID}`
    );
    if (getCats != null && getCats?.data?.data?.length != 0) {
      const cats: Category[] = getCats?.data?.data;
      setCategory(cats);
      getLawyers();
    } else {
      setCategory(CategoryDb.categories.slice(0, 4));
    }
  };

  const getLawyers = async () => {
    if (category == null) return;
    const catCodes = category.map((item) => {
      return { CategoryCode: item.categoryCode };
    });

    const { data } = await axiosClient.post(
      "Category/GetSPUserCategories",
      catCodes
    );

    if (data != null) {
      const lawyers: LawyerModel[] = data?.data;
      console.log(lawyers, "Lawyers");

      setLawyers(lawyers);
    }
  };

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <ScrollView
          contentContainerStyle={[styles.container, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles.header}>
            <View style={styles.headerTitleWrapper}>
              <Text style={globalStyles.H1Style}>Hi {user} 👋🏼</Text>
              <Text style={styles.greeting}>
                {time}, here are your available services
              </Text>
            </View>
            <Image source={{ uri: CONSTANTS.user }} style={styles.user} />
          </View>
          <ServiceSearch />
          <View style={styles.titleWithViewMore}>
            <Text style={globalStyles.H2Style}>Your Categories</Text>
            <TouchableOpacity
              onPress={() => navigation.push(ROUTES.ALL_CATEGORY_SCREEN)}
            >
              <Text style={styles.viewMore}>View all</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <FlatList
              horizontal={true}
              data={category}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
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
          </View>
          <Text
            style={[
              globalStyles.H2Style,
              { marginTop: hp(22), marginBottom: hp(6) },
            ]}
          >
            Top Findings
          </Text>
          <Text style={styles.topFindingSubtitle}>
            Based on selected categories
          </Text>

          <TopFindingsCard />
          <TopFindingsCard />
          <TopFindingsCard />
          <TopFindingsCard />
          <TopFindingsCard />
          <TopFindingsCard />
          <TopFindingsCard />
          <TopFindingsCard />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
