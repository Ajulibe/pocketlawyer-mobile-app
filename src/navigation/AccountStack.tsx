import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {ROUTES} from "./Routes";
import COLORS from "../utils/Colors";
import AccountScreen from "../screens/TabScreens/Account/AccountScreen";
import UpdatePassword from "../screens/TabScreens/Account/UpdateProfile/UpdatePassword";
import UpdateProfile from "screens/TabScreens/Account/UpdateProfile/UpdateProfile";
import UpdateImage from "screens/TabScreens/Account/UpdateImage";

export type AccountStackParamList = {
  [ROUTES.ACCOUNT_SCREEN]: any;
  [ROUTES.UPDATE_PASSWORD]: any;
  [ROUTES.UPDATE_PROFILE]: any;
  [ROUTES.UPDATE_IMAGE]: any;
};

const AccountStack = createStackNavigator<AccountStackParamList>();

export default function AccountNavigationStack() {
  const headerOptions = {
    headerShown: false,
    cardStyle: {backgroundColor: COLORS.light.white},
  };
  return (
    <AccountStack.Navigator
      initialRouteName={ROUTES.ACCOUNT_SCREEN}
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
      <AccountStack.Screen
        name={ROUTES.UPDATE_PROFILE}
        component={UpdateProfile}
        options={headerOptions}
      />
      <AccountStack.Screen
        name={ROUTES.UPDATE_IMAGE}
        component={UpdateImage}
        options={headerOptions}
      />
    </AccountStack.Navigator>
  );
}
