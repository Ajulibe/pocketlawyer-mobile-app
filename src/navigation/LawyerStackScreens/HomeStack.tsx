/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {ROUTES} from "../Routes";
import COLORS from "utils/Colors";
import LawyerHomeScreen from "screens/LawyerTabScreens/Home/HomeScreen";
import LawyerCheckout from "screens/LawyerTabScreens/Home/Sections/Checkout/Checkout";
import LawyerAllCategory from "screens/LawyerTabScreens/Home/Sections/AllCategory/AllCategory";
import LawyerCatServiceScreen from "screens/LawyerTabScreens/Home/Sections/CatServiceScreen/CatServiceScreen";
import {Category, Service} from "database/DBData";
import {LawyerModel} from "models/Interfaces";
import LawyerUpdateImageScreen from "screens/LawyerTabScreens/Account/UpdateImage";
import {ServiceHistoryInterface} from "screens/LawyerTabScreens/History/HistoryScreen";
import LayerAddMoreCategories from "screens/LawyerTabScreens/Home/Sections/AddMoreCategories/AddMoreCategories";

export type HomeStackParamList = {
  [ROUTES.HOME_SCREEN_LAWYER]: undefined;
  [ROUTES.ALL_CATEGORY_SCREEN_LAWYER]: ServiceHistoryInterface[];
  [ROUTES.CAT_SERVICE_SCREEN_LAWYER]: String;
  [ROUTES.UPDATE_IMAGE_LAWYER]: any;
  [ROUTES.ADD_MORE_CATEGORIES]: Category[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [ROUTES.PICK_LAWYER_SCREEN_LAWYER]: {service: any};
  [ROUTES.LAWYER_DETAIL_SCREEN_LAWYER]: {
    lawyer: LawyerModel;
    category: Category;
    service: Service;
  };
  [ROUTES.CHECKOUT_SCREEN_LAWYER]: {
    lawyer: LawyerModel;
    service: Service;
    serviceHistoryID: number | string;
    amount: number;
  };
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export default function HomeNavigationStack() {
  const headerOptions = {
    headerShown: false,
    cardStyle: {backgroundColor: COLORS.light.white},
  };
  return (
    <HomeStack.Navigator
      initialRouteName={ROUTES.HOME_SCREEN_LAWYER}
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
      <HomeStack.Screen
        name={ROUTES.HOME_SCREEN_LAWYER}
        component={LawyerHomeScreen}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.ALL_CATEGORY_SCREEN_LAWYER}
        component={LawyerAllCategory}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.CAT_SERVICE_SCREEN_LAWYER}
        component={LawyerCatServiceScreen}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.CHECKOUT_SCREEN_LAWYER}
        component={LawyerCheckout}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.UPDATE_IMAGE_LAWYER}
        component={LawyerUpdateImageScreen}
        options={headerOptions}
      />
      <HomeStack.Screen
        name={ROUTES.ADD_MORE_CATEGORIES}
        component={LayerAddMoreCategories}
        options={headerOptions}
      />
    </HomeStack.Navigator>
  );
}
