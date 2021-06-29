import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {ROUTES} from "./Routes";
import COLORS from "../utils/Colors";
import HistoryScreen from "../screens/TabScreens/History/HistoryScreen";

export type HistoryStackParamList = {
  [ROUTES.HISTORY_SCREEN]: undefined;
};

const HistoryStack = createStackNavigator<HistoryStackParamList>();

export default function HistoryNavigationStack() {
  const headerOptions = {
    headerShown: false,
    cardStyle: {backgroundColor: COLORS.light.white},
  };
  return (
    <HistoryStack.Navigator
      initialRouteName={ROUTES.HISTORY_SCREEN}
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
      <HistoryStack.Screen
        name={ROUTES.HISTORY_SCREEN}
        component={HistoryScreen}
        options={headerOptions}
      />
    </HistoryStack.Navigator>
  );
}
