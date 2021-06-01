import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "navigation/MainNavigator";
import { ROUTES } from "navigation/Routes";
import COLORS from "utils/Colors";
import IMAGES from "utils/Images";
import { wp, hp } from "utils/Dimensions";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SPLASH_SCREEN>;

const AuthSplashScreen = ({ navigation }: Props) => {
  React.useEffect(() => {
    removeValue();
  }, []);

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("@MyApp_key");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userType");
      await AsyncStorage.removeItem("userID");
      await AsyncStorage.removeItem("@signup_payload");
      await AsyncStorage.removeItem("@email");
      await AsyncStorage.removeItem("lawfirmPayload");
      await AsyncStorage.removeItem("previousPath");
      await AsyncStorage.removeItem("signup_payload");
      await AsyncStorage.removeItem("signup_payload");
      await AsyncStorage.removeItem("signup_payload");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor={COLORS.light.white}
        barStyle={"light-content"}
      />

      <Animatable.Image
        onAnimationEnd={() => {
          setTimeout(() => {
            navigation.navigate(ROUTES.AUTH_GET_STARTED_SCREEN);
          }, 2000);
        }}
        animation="zoomIn"
        easing="ease-in"
        source={IMAGES.logo}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light.splashscreenbg,
  },
  logo: {
    resizeMode: "contain",
    height: hp(89),
    width: wp(119),
  },
});

export default AuthSplashScreen;
