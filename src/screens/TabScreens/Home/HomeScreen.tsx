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
import ServiceCard from "./Components/ServiceCard";
import TopFindingsCard from "./Components/TopFindingsCard";
import styles from "./homeStyles";
import { CategoryDb } from "database/CategoryDb";

type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN>;

const HomeScreen = ({ navigation }: Props) => {
  const [category, setCategory] = React.useState<Category[]>([]);
  React.useEffect(() => {
    (async () => {
      const userID = await AsyncStorageUtil.getUserId();
      // const token = await AsyncStorageUtil.getToken();
      // console.log(token);

      const getCats = await axiosClient.get(
        "Category/GetUserCategories/" + userID
      );
      if (getCats != null) {
        const cats: Category[] = getCats?.data?.data;
        setCategory(cats);
      }
    })();
    // await AsyncStorage.setItem("token", token);
    // await AsyncStorage.setItem("userType", JSON.stringify(userType));
    // await AsyncStorage.setItem("userID", JSON.stringify(userID));
  }, []);
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
              onPress={() => navigation.push(ROUTES.PICK_LAWYER_SCREEN)}
            >
              <Text style={styles.viewMore}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <FlatList
              horizontal={true}
              data={category}
              renderItem={({ item }) => <ServiceCard category={item} />}
              keyExtractor={(item, index) => index.toString()}
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
