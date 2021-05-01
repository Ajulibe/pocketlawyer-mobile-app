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

export type HomeStackParamList = {
  [ROUTES.HOME_SCREEN]: undefined;
  [ROUTES.PICK_LAWYER_SCREEN]: undefined;
  [ROUTES.LAWYER_DETAIL_SCREEN]: undefined;
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
        name={ROUTES.PICK_LAWYER_SCREEN}
        component={PickLawyer}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.LAWYER_DETAIL_SCREEN}
        component={LawyerDetail}
        options={headerOptions}
      />
    </HomeStack.Navigator>
  );
}
