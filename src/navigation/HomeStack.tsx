import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {ROUTES} from "./Routes";
import COLORS from "../utils/Colors";
import HomeScreen from "../screens/TabScreens/Home/HomeScreen";
import Checkout from "../screens/TabScreens/Home/Sections/Checkout/Checkout";
import UpdateImage from "screens/TabScreens/Account/UpdateImage";
import AllCategory from "../screens/TabScreens/Home/Sections/AllCategory/AllCategory";
import CatServiceScreen from "../screens/TabScreens/Home/Sections/CatServiceScreen/CatServiceScreen";
import {Category, Service} from "database/DBData";
import {LawyerModel} from "models/Interfaces";

export type HomeStackParamList = {
  [ROUTES.HOME_SCREEN]: undefined;
  [ROUTES.ALL_CATEGORY_SCREEN]: undefined;
  [ROUTES.CAT_SERVICE_SCREEN]: {category: Category};
  [ROUTES.PICK_LAWYER_SCREEN]: {service: any};
  [ROUTES.UPDATE_IMAGE]: any;
  [ROUTES.LAWYER_DETAIL_SCREEN]: {
    lawyer: LawyerModel;
    category: Category;
    service: Service | string;
  };
  [ROUTES.CHECKOUT_SCREEN]: {
    lawyer: LawyerModel;
    service: Service;
    serviceHistoryID: number | string;
    amount: number;
  };
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export default function HomeNavigationStack() {
  const headerOptions = {
    headerShown: false,
    cardStyle: {backgroundColor: COLORS.light.white},
  };
  return (
    <HomeStack.Navigator
      initialRouteName={ROUTES.HOME_SCREEN}
      headerMode={"none"}
      screenOptions={{
        cardStyle: {backgroundColor: COLORS.light.white},
        gestureEnabled: true,
        headerShown: false,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}>
      <HomeStack.Screen
        name={ROUTES.HOME_SCREEN}
        component={HomeScreen}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.ALL_CATEGORY_SCREEN}
        component={AllCategory}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.CAT_SERVICE_SCREEN}
        component={CatServiceScreen}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.CHECKOUT_SCREEN}
        component={Checkout}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.UPDATE_IMAGE}
        component={UpdateImage}
        options={headerOptions}
      />
      {/* <HomeStack.Screen
        name={ROUTES.PICK_LAWYER_SCREEN}
        component={PickLawyer}
        options={headerOptions}
      /> */}
      {/* 
      <HomeStack.Screen
        name={ROUTES.PICK_LAWYER_SCREEN}
        component={PickLawyerScreen}
        options={headerOptions}
      /> */}
      {/* <HomeStack.Screen
        name={ROUTES.LAWYER_DETAIL_SCREEN}
        component={LawyerDetail}
        options={headerOptions}
      /> */}
      {/* <HomeStack.Screen
        name={ROUTES.CHECKOUT_SCREEN}
        component={Checkout}
        options={headerOptions}
      /> */}
    </HomeStack.Navigator>
  );
}
