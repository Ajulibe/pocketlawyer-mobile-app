/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {ROUTES} from "../Routes";
import COLORS from "utils/Colors";
import LawyerAccountScreen from "screens/LawyerTabScreens/Account/AccountScreen";
import LawyerUpdatePassword from "screens/LawyerTabScreens/Account/UpdateProfile/UpdatePassword";
import LawyerUpdateProfile from "screens/LawyerTabScreens/Account/UpdateProfile/UpdateProfile";
import LawyerUpdateImage from "screens/LawyerTabScreens/Account/UpdateImage";

export type AccountStackParamList = {
  [ROUTES.ACCOUNT_SCREEN_LAWYER]: any;
  [ROUTES.UPDATE_PASSWORD_LAWYER]: any;
  [ROUTES.UPDATE_PROFILE_LAWYER]: any;
  [ROUTES.UPDATE_IMAGE_LAWYER]: any;
  [ROUTES.AUTH_LOGIN]: any;
};

const AccountStack = createStackNavigator<AccountStackParamList>();

export default function AccountNavigationStack() {
  const headerOptions = {
    headerShown: false,
    cardStyle: {backgroundColor: COLORS.light.white},
  };
  return (
    <AccountStack.Navigator
      initialRouteName={ROUTES.ACCOUNT_SCREEN_LAWYER}
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
        name={ROUTES.ACCOUNT_SCREEN_LAWYER}
        component={LawyerAccountScreen}
        options={headerOptions}
      />
      <AccountStack.Screen
        name={ROUTES.UPDATE_PASSWORD_LAWYER}
        component={LawyerUpdatePassword}
        options={headerOptions}
      />
      <AccountStack.Screen
        name={ROUTES.UPDATE_PROFILE_LAWYER}
        component={LawyerUpdateProfile}
        options={headerOptions}
      />
      <AccountStack.Screen
        name={ROUTES.UPDATE_IMAGE_LAWYER}
        component={LawyerUpdateImage}
        options={headerOptions}
      />
    </AccountStack.Navigator>
  );
}
