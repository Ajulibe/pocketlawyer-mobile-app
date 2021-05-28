import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import IMAGES from "utils/Images";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wpercent,
} from "react-native-responsive-screen";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "navigation/MainNavigator";
import COLORS from "utils/Colors";
import { wp } from "utils/Dimensions";
import * as Animatable from "react-native-animatable";

interface Props {
  message: string;
}

const index: React.FC<Props> = ({ message }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.light.splashscreenbg,
        height: "100%",
        width: "100%",
      }}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <StatusBar
            backgroundColor={COLORS.light.white}
            barStyle={"light-content"}
          />

          <Animatable.Image
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            source={IMAGES.logo}
            style={styles.logo}
          />
        </View>

        <ActivityIndicator />

        <Animatable.Text style={styles.loading}>{message}...</Animatable.Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.light.splashscreenbg,
    marginTop: wpercent("60%"),
  },
  loading: {
    color: COLORS.light.primary,
    fontFamily: "Roboto-Regular",
    fontSize: wp(11),
    marginTop: wpercent("10%"),
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light.splashscreenbg,
    marginBottom: wpercent("20%"),
  },
  logo: {
    resizeMode: "contain",
    height: hp(59),
    width: wp(89),
  },
});

export default index;
