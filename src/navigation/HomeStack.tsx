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
import { Lawyerdata } from "navigation/interfaces";

export type HomeStackParamList = {
  [ROUTES.HOME_SCREEN]: undefined;
  [ROUTES.ALL_CATEGORY_SCREEN]: undefined;
  [ROUTES.PICK_LAWYER_SCREEN]: undefined;
  [ROUTES.LAWYER_DETAIL_SCREEN]: any;
  [ROUTES.CHECKOUT_SCREEN]: any;
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export default function HomeNavigationStack() {
  const headerOptions = {
    headerShown: false,
    // cardStyle: { backgroundColor: COLORS.light.white },
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
        name={ROUTES.PICK_LAWYER_SCREEN}
        component={PickLawyer}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.LAWYER_DETAIL_SCREEN}
        component={LawyerDetail}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.CHECKOUT_SCREEN}
        component={Checkout}
        options={headerOptions}
      />
    </HomeStack.Navigator>
  );
}
