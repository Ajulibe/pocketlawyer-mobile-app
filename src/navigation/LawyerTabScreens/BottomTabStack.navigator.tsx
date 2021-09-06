import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Text} from "react-native";
import {ROUTES} from "../Routes";
import COLORS from "utils/Colors";
import HomeStack from "../LawyerStackScreens/HomeStack";
import ServiceStack from "../LawyerStackScreens/ServiceStack";
import HistoryStack from "../LawyerStackScreens/HistoryStack";
import AccountStack from "../LawyerStackScreens/AccountStack";
import {wp} from "utils/Dimensions";
import {Entypo} from "@expo/vector-icons";
import {FontAwesome5} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export type HomeTabStackParamList = {
  [ROUTES.HOME_STACK]: undefined;
  [ROUTES.SERVICE_STACK]: undefined;
  [ROUTES.HISTORY_STACK]: undefined;
  [ROUTES.ACCOUNT_STACK]: undefined;
};

const Tab = createBottomTabNavigator<HomeTabStackParamList>();

export default function LawyerBottomTabStack() {
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: COLORS.light.primary,
            paddingTop: wp(7),
          },
          activeTintColor: COLORS.light.white,
          inactiveTintColor: COLORS.light.carouselBtn2,
        }}>
        <Tab.Screen
          name={ROUTES.HOME_STACK}
          component={HomeStack}
          options={() => ({
            tabBarLabel: ({focused}: any) => <Text></Text>,
            tabBarIcon: ({color, focused}: any) => (
              <Entypo name="home" size={18} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name={ROUTES.SERVICE_STACK}
          component={ServiceStack}
          options={() => ({
            tabBarLabel: () => <Text></Text>,
            tabBarIcon: ({color, focused}: any) => (
              <FontAwesome5 name="business-time" size={15} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name={ROUTES.HISTORY_STACK}
          component={HistoryStack}
          options={{
            tabBarLabel: () => <Text></Text>,
            tabBarIcon: ({color, focused}: any) => (
              <FontAwesome name="history" size={16} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.ACCOUNT_STACK}
          component={AccountStack}
          options={{
            tabBarLabel: () => <Text></Text>,
            tabBarIcon: ({color, focused}: any) => (
              <MaterialCommunityIcons name="account" size={23} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
