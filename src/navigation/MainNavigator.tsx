import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthSplashScreen from "../screens/AuthScreens/AuthSplashScreen";
import AuthGetStartedScreen from "../screens/AuthScreens/AuthGetStarted";
import AuthBlankScreen from "../screens/AuthScreens/AuthBlankScreen";
import AuthLoginCategorySelector from "../screens/AuthScreens/individual/AuthLoginCategorySelector";
import AuthSelectCategory from "../screens/AuthScreens/individual/AuthSelectCategory";

//INDIVIDUAL
import AuthSignUp from "../screens/AuthScreens/individual/AuthSignup";
import AuthSignupSectionTwo from "../screens/AuthScreens/individual/AuthSignupSectionTwo";
import AuthLogin from "../screens/AuthScreens/individual/AuthLogin";

//SME
import AuthSignUpSme from "../screens/AuthScreens/sme/AuthSignup";
import AuthSignupSectionTwoSme from "../screens/AuthScreens/sme/AuthSignupSectionTwo";
import AuthLoginSme from "../screens/AuthScreens/sme/AuthLogin";

import { ROUTES } from "./Routes";

export type RootStackParamList = {
  [ROUTES.AUTH_BLANK_SCREEN]: undefined;
  [ROUTES.AUTH_SPLASH_SCREEN]: undefined;
  [ROUTES.AUTH_GET_STARTED_SCREEN]: undefined;
  [ROUTES.AUTH_LOGIN_CATEGORY_SELECTOR]: undefined;
  [ROUTES.AUTH_SELECT_CATEGORY]: undefined;

  //INDIVIDUAL
  [ROUTES.AUTH_SIGN_UP]: undefined;
  [ROUTES.AUTH_SIGN_UP_SECTION_TWO]: undefined;
  [ROUTES.AUTH_LOGIN]: undefined;

  //SME
  [ROUTES.AUTH_SIGN_UP_SME]: undefined;
  [ROUTES.AUTH_SIGN_UP_SECTION_TWO_SME]: undefined;
  [ROUTES.AUTH_LOGIN_SME]: undefined;
};

const MainStack = createStackNavigator<RootStackParamList>();
export default function MainNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName={ROUTES.AUTH_BLANK_SCREEN}
      headerMode={"none"}
    >
      {/* <MainStack.Navigator
      initialRouteName={ROUTES.AUTH_SELECT_CATEGORY}
      headerMode={"none"}
     > */}
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

      {/* INDIVIDUALS */}
      <MainStack.Screen
        name={ROUTES.AUTH_SIGN_UP}
        component={AuthSignUp}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_SIGN_UP_SECTION_TWO}
        component={AuthSignupSectionTwo}
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

      {/* SME */}
      <MainStack.Screen
        name={ROUTES.AUTH_SIGN_UP_SME}
        component={AuthSignUpSme}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_SIGN_UP_SECTION_TWO_SME}
        component={AuthSignupSectionTwoSme}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_LOGIN_SME}
        component={AuthLoginSme}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}
