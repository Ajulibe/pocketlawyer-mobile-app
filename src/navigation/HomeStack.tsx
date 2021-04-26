import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { ROUTES } from "./Routes";
import COLORS from "../utils/Colors";
import HomeScreen from "../screens/TabScreens/Home/HomeScreen";

export type HomeStackParamList = {
  [ROUTES.HOME_SCREEN]: undefined;
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
    </HomeStack.Navigator>
  );
}
