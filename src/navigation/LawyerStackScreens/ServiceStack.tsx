/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {ROUTES} from "../Routes";
import COLORS from "utils/Colors";
import LawyerServiceScreen from "screens/LawyerTabScreens/Services/ServiceScreen";

export type ServiceStackParamList = {
  [ROUTES.SERVICE_SCREEN_LAWYER]: {service: any};
};

const ServiceStack = createStackNavigator<ServiceStackParamList>();

export default function ServiceNavigationStack() {
  const headerOptions = {
    headerShown: false,
    cardStyle: {backgroundColor: COLORS.light.white},
  };
  return (
    <ServiceStack.Navigator
      initialRouteName={ROUTES.SERVICE_SCREEN_LAWYER}
      headerMode={"none"}
      screenOptions={{
        cardStyle: {backgroundColor: COLORS.light.white},
        gestureEnabled: false,
        headerShown: false,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}>
      <ServiceStack.Screen
        name={ROUTES.SERVICE_SCREEN_LAWYER}
        component={LawyerServiceScreen}
        options={headerOptions}
      />
    </ServiceStack.Navigator>
  );
}
