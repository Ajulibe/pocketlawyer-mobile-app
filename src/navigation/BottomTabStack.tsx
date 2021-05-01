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
        return focused ? IMAGES["logo"] : IMAGES["logo"];
      case 1:
        return focused ? IMAGES["logo"] : IMAGES["logo"];
      case 2:
        return focused ? IMAGES["logo"] : IMAGES["logo"];
      default:
        return focused ? IMAGES["logo"] : IMAGES["logo"];
    }
  };
  const Title = ({ index, focused }: { index: number; focused: boolean }) => {
    let title: string;
    let color: string;

    switch (index) {
      case 0:
        title = "Home";
        color = focused ? COLORS.light.white : COLORS.light.disabled;
        break;
      case 1:
        title = "Services";
        color = focused ? COLORS.light.white : COLORS.light.disabled;
        break;
      case 2:
        title = "History";
        color = focused ? COLORS.light.white : COLORS.light.disabled;
        break;
      default:
        title = "Account";
        color = focused ? COLORS.light.white : COLORS.light.disabled;
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
          // height: Platform.OS === "ios" ? 90 : 80,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowColor: COLORS.light.textinputborder,
          shadowOpacity: 0.2,
          paddingTop: hp(16),
        },
        activeTintColor: COLORS.light.secondary,
        inactiveTintColor: COLORS.light.tint,
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME_STACK}
        component={HomeStack}
        options={() => ({
          tabBarLabel: ({ focused }: any) => (
            <Title index={0} focused={focused} />
          ),
          tabBarIcon: ({ focused }: any) => (
            <Image source={tabBarIcon(0, focused)} style={styles.tabBarImage} />
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
          tabBarIcon: ({ focused }: any) => (
            <Image source={tabBarIcon(1, focused)} style={styles.tabBarImage} />
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
          tabBarIcon: ({ focused }: any) => (
            <Image source={tabBarIcon(2, focused)} style={styles.tabBarImage} />
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
          tabBarIcon: ({ focused }: any) => (
            <Image source={tabBarIcon(3, focused)} style={styles.tabBarImage} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: "Roboto-Regular",
    fontSize: hp(12),
    lineHeight: hp(16),
    marginBottom: hp(12),
  },
  tabBarImage: {
    resizeMode: "contain",
    width: wp(20),
    height: hp(20),
    marginBottom: hp(2),
  },
});
