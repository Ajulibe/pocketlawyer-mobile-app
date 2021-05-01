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

//SERVICE PROVIDER
import ServiceProviderCategory from "../screens/AuthScreens/serviceprovider/AuthSelectCategory";
import AuthSignUpLawyer from "../screens/AuthScreens/serviceprovider/lawyer/AuthSignup";
import AuthPasswordLawyer from "../screens/AuthScreens/serviceprovider/lawyer/AuthLogin";
import AuthEducationLawyer from "../screens/AuthScreens/serviceprovider/lawyer/EducationDetails";
import AuthProfileImageLawyer from "../screens/AuthScreens/serviceprovider/lawyer/ProfileImage";
import AuthLawCategoryLawyer from "../screens/AuthScreens/serviceprovider/lawyer/LawCategory";
import AuthSignUpSolicitor from "../screens/AuthScreens/serviceprovider/solicitor/AuthSignup";
import AuthSignUpLawFirm from "../screens/AuthScreens/serviceprovider/lawfirm/AuthSignup";
import AuthSignUpLawFirmSectionTwo from "../screens/AuthScreens/serviceprovider/lawfirm/AuthSignUpSectionTwo";
import AuthCACLawFirm from "../screens/AuthScreens/serviceprovider/lawfirm/CACDocument";

//TABS SCREENS STACK
import BottomTabStack from "./BottomTabStack";

import { ROUTES } from "./Routes";
import Colors from "utils/Colors";

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

  //SERVICE PROVIDER
  [ROUTES.SERVICE_PROVIDER_CATEGORY_SELECTOR]: undefined;
  [ROUTES.AUTH_SIGN_UP_LAWYER]: undefined;
  [ROUTES.AUTH_PASSWORD_LAWYER]: undefined;
  [ROUTES.AUTH_EDUCATION_LAWYER]: undefined;
  [ROUTES.AUTH_PROFILE_IMAGE_LAWYER]: undefined;
  [ROUTES.AUTH_SIGN_UP_SOLICITOR]: undefined;
  [ROUTES.AUTH_SIGN_UP_LAWFIRM]: undefined;
  [ROUTES.AUTH_SIGN_UP_LAWFIRM_SECTION_TWO]: undefined;
  [ROUTES.AUTH_LAW_CATEGORY_LAWYER]: undefined;
  [ROUTES.AUTH_CAC_LAWFIRM]: undefined;
  //TABS SCREENS STACK
  [ROUTES.TABSCREEN_STACK]: undefined;
};

const MainStack = createStackNavigator<RootStackParamList>();
export default function MainNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName={ROUTES.TABSCREEN_STACK}
      // initialRouteName={ROUTES.AUTH_PASSWORD_LAWYER}
      headerMode={"none"}
      screenOptions={{
        headerStyle: {
          // backgroundColor: "#fff",
        },
        cardStyle: { backgroundColor: Colors.light.white },
      }}
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

      {/* SERVICE PROVIDER */}
      <MainStack.Screen
        name={ROUTES.SERVICE_PROVIDER_CATEGORY_SELECTOR}
        component={ServiceProviderCategory}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_SIGN_UP_LAWYER}
        component={AuthSignUpLawyer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_SIGN_UP_SOLICITOR}
        component={AuthSignUpSolicitor}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_SIGN_UP_LAWFIRM}
        component={AuthSignUpLawFirm}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_PASSWORD_LAWYER}
        component={AuthPasswordLawyer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_EDUCATION_LAWYER}
        component={AuthEducationLawyer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_PROFILE_IMAGE_LAWYER}
        component={AuthProfileImageLawyer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_LAW_CATEGORY_LAWYER}
        component={AuthLawCategoryLawyer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_SIGN_UP_LAWFIRM_SECTION_TWO}
        component={AuthSignUpLawFirmSectionTwo}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name={ROUTES.AUTH_CAC_LAWFIRM}
        component={AuthCACLawFirm}
        options={{ headerShown: false }}
      />
      {/* DASHBOARD STACK...  */}
      <MainStack.Screen
        name={ROUTES.TABSCREEN_STACK}
        component={BottomTabStack}
      />
    </MainStack.Navigator>
  );
}
