import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { ROUTES } from "./Routes";
import COLORS from "../utils/Colors";
import PickLawyer from "../screens/TabScreens/Home/Sections/PickLawyer/PickLawyer";
import { Category, Service } from "database/DBData";

//--> Pick lawyer Navigator
export type PickLawyerParamList = {
  [ROUTES.PICK_LAWYER_SCREEN]: { category: Category; service: Service };
};
const PickLawyerStack = createStackNavigator<PickLawyerParamList>();

export const PickLawyerNavigationStack = () => {
  const headerOptions = {
    headerShown: false,
  };
  return (
    <PickLawyerStack.Navigator
      initialRouteName={ROUTES.PICK_LAWYER_SCREEN}
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
      <PickLawyerStack.Screen
        name={ROUTES.PICK_LAWYER_SCREEN}
        component={PickLawyer}
        options={headerOptions}
      />
    </PickLawyerStack.Navigator>
  );
};
