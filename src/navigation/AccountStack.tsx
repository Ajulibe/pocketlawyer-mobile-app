import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { ROUTES } from "./Routes";
import COLORS from "../utils/Colors";
import AccountScreen from "../screens/TabScreens/Account/AccountScreen";
import UpdatePassword from "../screens/TabScreens/Account/UpdatePassword";

export type AccountStackParamList = {
  [ROUTES.ACCOUNT_SCREEN]: undefined;
  [ROUTES.UPDATE_PASSWORD]: undefined;
};

const AccountStack = createStackNavigator<AccountStackParamList>();

export default function AccountNavigationStack() {
  const headerOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: COLORS.light.white },
  };
  return (
    <AccountStack.Navigator
      initialRouteName={ROUTES.ACCOUNT_SCREEN}
      headerMode={"none"}
      screenOptions={{
        cardStyle: { backgroundColor: COLORS.light.white },
        gestureEnabled: true,
        headerShown: false,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <AccountStack.Screen
        name={ROUTES.ACCOUNT_SCREEN}
        component={AccountScreen}
        options={headerOptions}
      />
      <AccountStack.Screen
        name={ROUTES.UPDATE_PASSWORD}
        component={UpdatePassword}
        options={headerOptions}
      />
    </AccountStack.Navigator>
  );
}
