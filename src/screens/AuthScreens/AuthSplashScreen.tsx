import React from "react";
import {View, StyleSheet, StatusBar} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "navigation/MainNavigator";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import IMAGES from "utils/Images";
import {wp, hp} from "utils/Dimensions";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {setResetUser} from "redux/actions";
// import {useAppSelector, useAppDispatch} from "redux/hooks";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SPLASH_SCREEN>;

const AuthSplashScreen = ({navigation}: Props) => {
  React.useEffect(() => {
    removeValue();
  }, []);
  // const dispatch = useAppDispatch();
  // const userData = useAppSelector((state) => state.users.user);

  const removeValue = async () => {
    // dispatch(setResetUser()); //remoev this if app is meant to be configured for offline mode
    //it contains all user data fetched from the api as at the time of running.
    try {
      await AsyncStorage.removeItem("@MyApp_key");
      // await AsyncStorage.removeItem("token"); // --> This is meant to persist
      // await AsyncStorage.removeItem("userType"); // --> This is meant to persist
      // await AsyncStorage.removeItem("userID"); // --> This is meant to persist
      await AsyncStorage.removeItem("@signup_payload");
      await AsyncStorage.removeItem("@email");
      await AsyncStorage.removeItem("lawfirmPayload");
      await AsyncStorage.removeItem("previousPath");
      await AsyncStorage.removeItem("signup_payload");
      await AsyncStorage.removeItem("signup_payload");
      await AsyncStorage.removeItem("signup_payload");
      await AsyncStorage.removeItem("firstName");
    } catch (e) {
      // remove error
    }
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor={COLORS.light.white}
        barStyle={"light-content"}
      />

      <Animatable.Image
        onAnimationEnd={() => {
          setTimeout(async () => {
            //-->check if a token is present to redirect straight to dashboard
            const token = await AsyncStorage.getItem("token");
            const userType = await AsyncStorage.getItem("userType");

            if (token) {
              if (Number(userType) === 1 || Number(userType) === 2) {
                navigation.navigate(ROUTES.TABSCREEN_STACK);
              } else {
                navigation.navigate(ROUTES.TABSCREEN_STACK_LAWYER);
              }
            } else {
              navigation.navigate(ROUTES.AUTH_GET_STARTED_SCREEN);
            }
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
