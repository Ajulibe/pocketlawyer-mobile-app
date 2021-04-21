import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthSplashScreen from "../screens/AuthScreens/AuthSplashScreen";
import AuthGetStartedScreen from "../screens/AuthScreens/AuthGetStarted";
import AuthBlankScreen from "../screens/AuthScreens/AuthBlankScreen";
import AuthLogin from "../screens/AuthScreens/AuthLogin";
import AuthLoginCategorySelector from "../screens/AuthScreens/AuthLoginCategorySelector";
import AuthSelectCategory from "../screens/AuthScreens/AuthSelectCategory";
import AuthSignUp from "../screens/AuthScreens/AuthSignup";

import { ROUTES } from "./Routes";

export type RootStackParamList = {
  [ROUTES.AUTH_BLANK_SCREEN]: undefined;
  [ROUTES.AUTH_GET_STARTED_SCREEN]: undefined;
  [ROUTES.AUTH_LOGIN]: undefined;
  [ROUTES.AUTH_LOGIN_CATEGORY_SELECTOR]: undefined;
  [ROUTES.AUTH_SELECT_CATEGORY]: undefined;
  [ROUTES.AUTH_SIGN_UP]: undefined;
  [ROUTES.AUTH_SPLASH_SCREEN]: undefined;
};

const MainStack = createStackNavigator<RootStackParamList>();
export default function MainNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName={ROUTES.AUTH_BLANK_SCREEN}
      headerMode={"none"}
    >
      <MainStack.Screen
        name={ROUTES.AUTH_BLANK_SCREEN}
        component={AuthBlankScreen}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_SPLASH_SCREEN}
        component={AuthSplashScreen}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_GET_STARTED_SCREEN}
        component={AuthGetStartedScreen}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_SELECT_CATEGORY}
        component={AuthSelectCategory}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_SIGN_UP}
        component={AuthSignUp}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_LOGIN}
        component={AuthLogin}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_LOGIN_CATEGORY_SELECTOR}
        component={AuthLoginCategorySelector}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}
