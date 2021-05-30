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
import { Category } from "database/DBData";
import CategoryCard from "./Components/CategoryCard";
import TopFindingsCard from "./Components/TopFindingsCard";
import styles from "./homeStyles";
import { CategoryDb } from "database/CategoryDb";

type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN>;

const HomeScreen = ({ navigation }: Props) => {
  const [category, setCategory] = React.useState<Category[]>([]);
  React.useEffect(() => {
    // getCategories();
    getLawyers();
  }, []);

  const getCategories = async () => {
    const userID = await AsyncStorageUtil.getUserId();
    const getCats = await axiosClient.get(
      `Category/GetUserCategories/${userID}`
    );
    if (getCats != null) {
      const cats: Category[] = getCats?.data?.data;
      setCategory(cats);
    } else {
      setCategory(CategoryDb.categories.slice(0, 5));
    }
  };

  const getLawyers = async () => {
    const userID = await AsyncStorageUtil.getToken();

    const getSP = axiosClient.get("Category/GetSPUserCategories");
    getSP
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });

    // if (getSP != null) {
    //   const cats: Category[] = getSP?.data?.data;
    //   setCategory(cats);
    // } else {
    //   setCategory(CategoryDb.categories.slice(0, 5));
    // }
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
              <Text style={globalStyles.H1Style}>Hi Tola 👋🏼</Text>
              <Text style={styles.greeting}>
                Good morning, here are your available services
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
          <View style={{ display: "flex", flexDirection: "row" }}>
            <FlatList
              horizontal={true}
              data={category}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <CategoryCard
                  category={item}
                  onClick={() => navigation.navigate(ROUTES.PICK_LAWYER_SCREEN)}
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
