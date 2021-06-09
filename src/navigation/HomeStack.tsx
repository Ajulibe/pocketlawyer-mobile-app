import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { ROUTES } from "./Routes";
import COLORS from "../utils/Colors";
import HomeScreen from "../screens/TabScreens/Home/HomeScreen";
import PickLawyer from "../screens/TabScreens/Home/Sections/PickLawyer/PickLawyer";
import LawyerDetail from "../screens/TabScreens/Home/Sections/LawyerDetail/LawyerDetail";
import Checkout from "../screens/TabScreens/Home/Sections/Checkout/Checkout";
import AllCategory from "../screens/TabScreens/Home/Sections/AllCategory/AllCategory";
import CatServiceScreen from "../screens/TabScreens/Home/Sections/CatServiceScreen/CatServiceScreen";
import { Category, Service } from "database/DBData";
import { LawyerModel } from "models/Interfaces";
import { PickLawyerScreen } from "./PickLawyerStack";

export type HomeStackParamList = {
  [ROUTES.HOME_SCREEN]: undefined;
  [ROUTES.ALL_CATEGORY_SCREEN]: undefined;
  [ROUTES.CAT_SERVICE_SCREEN]: { category: Category };
  [ROUTES.PICK_LAWYER_SCREEN]: { category: Category; service: Service };
  [ROUTES.LAWYER_DETAIL_SCREEN]: {
    lawyer: LawyerModel;
    category: Category;
    service: Service;
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
    cardStyle: { backgroundColor: COLORS.light.white },
  };
  return (
    <HomeStack.Navigator
      initialRouteName={ROUTES.HOME_SCREEN}
      headerMode={"none"}
      screenOptions={{
        cardStyle: { backgroundColor: COLORS.light.white },
        gestureEnabled: true,
        headerShown: false,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          //   backgroundColor: "#fff",
        },
      }}
    >
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
      <HomeStack.Screen
        name={ROUTES.CHECKOUT_SCREEN}
        component={Checkout}
        options={headerOptions}
      />
    </HomeStack.Navigator>
  );
}
