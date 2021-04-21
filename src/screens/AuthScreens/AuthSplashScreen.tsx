import React, { useEffect } from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/MainNavigator";
import { ROUTES } from "../../navigation/Routes";
import COLORS from "../../utils/Colors";
import IMAGES from "../../utils/Images";
import { wp, hp } from "../../utils/Dimensions";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SPLASH_SCREEN>;

const AuthSplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ROUTES.AUTH_GET_STARTED_SCREEN);
    }, 4000);
  });
  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor={COLORS.light.white}
        barStyle={"light-content"}
      />

      <Image source={IMAGES.logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light.white,
  },
  logo: {
    resizeMode: "contain",
    height: hp(89),
    width: wp(119),
  },
});

export default AuthSplashScreen;
