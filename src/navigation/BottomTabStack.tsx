import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, StyleSheet, Platform } from "react-native";
import { ROUTES } from "./Routes";
import COLORS from "../utils/Colors";
import HomeStack from "./HomeStack";
import ServiceStack from "./ServiceStack";
import HistoryStack from "./HistoryStack";
import AccountStack from "./AccountStack";
import IMAGES from "../utils/Images";
import { hp, wp } from "../utils/Dimensions";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type HomeTabStackParamList = {
  [ROUTES.HOME_STACK]: undefined;
  [ROUTES.SERVICE_STACK]: undefined;
  [ROUTES.HISTORY_STACK]: undefined;
  [ROUTES.ACCOUNT_STACK]: undefined;
};

const Tab = createBottomTabNavigator<HomeTabStackParamList>();

export default function HomeBottomTabStack() {
  const tabBarIcon = (index: number, focused: boolean) => {
    switch (index) {
      case 0:
        return focused ? IMAGES["home-active"] : IMAGES["home-active"];
      case 1:
        return focused
          ? IMAGES["service-inactive"]
          : IMAGES["service-inactive"];
      case 2:
        return focused
          ? IMAGES["history-inactive"]
          : IMAGES["history-inactive"];
      default:
        return focused
          ? IMAGES["account-inactive"]
          : IMAGES["account-inactive"];
    }
  };
  const Title = ({ index, focused }: { index: number; focused: boolean }) => {
    let title: string;
    let color: string;

    switch (index) {
      case 0:
        title = "Home";
        color = focused ? COLORS.light.white : COLORS.light.blackLight;
        break;
      case 1:
        title = "Services";
        color = focused ? COLORS.light.white : COLORS.light.blackLight;
        break;
      case 2:
        title = "History";
        color = focused ? COLORS.light.white : COLORS.light.blackLight;
        break;
      default:
        title = "Account";
        color = focused ? COLORS.light.white : COLORS.light.blackLight;
        break;
    }
    return (
      <Text
        style={[
          styles.tabBarLabel,
          {
            color: color,
          },
        ]}
      >
        {title}
      </Text>
    );
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: COLORS.light.primary,
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowColor: COLORS.light.textinputborder,
          shadowOpacity: 0.2,
          paddingTop: wp(7),
        },
        activeTintColor: COLORS.light.white,
        inactiveTintColor: COLORS.light.blackLight,
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME_STACK}
        component={HomeStack}
        options={() => ({
          tabBarLabel: ({ focused }: any) => (
            <Title index={0} focused={focused} />
          ),
          tabBarIcon: ({ color, focused }: any) => (
            <Entypo name="home" size={18} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name={ROUTES.SERVICE_STACK}
        component={ServiceStack}
        options={() => ({
          tabBarLabel: ({ focused }: any) => (
            <Title index={1} focused={focused} />
          ),
          tabBarIcon: ({ color }: any) => (
            <FontAwesome5 name="business-time" size={15} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name={ROUTES.HISTORY_STACK}
        component={HistoryStack}
        options={{
          tabBarLabel: ({ focused }: any) => (
            <Title index={2} focused={focused} />
          ),
          tabBarIcon: ({ color }: any) => (
            <FontAwesome name="history" size={16} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.ACCOUNT_STACK}
        component={AccountStack}
        options={{
          tabBarLabel: ({ focused }: any) => (
            <Title index={3} focused={focused} />
          ),
          tabBarIcon: ({ color }: any) => (
            <MaterialCommunityIcons name="account" size={23} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: "Roboto-Medium",
    fontSize: hp(13),
    paddingBottom: hp(6),
  },
  tabBarImage: {
    resizeMode: "contain",
    width: wp(13),
    height: wp(13),
    paddingTop: hp(10),
    marginBottom: hp(6),
    marginTop: hp(6),
  },
});
