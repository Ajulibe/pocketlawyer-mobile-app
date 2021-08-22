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
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "navigation/MainNavigator";
import COLORS from "utils/Colors";
import {hp, wp} from "utils/Dimensions";
import * as Animatable from "react-native-animatable";
import globalStyles from "css/GlobalCss";

interface Props {
  message: string;
}

const index: React.FC<Props> = ({message}) => {
  return (
    <SafeAreaView
      style={{
        ...globalStyles.AndroidSafeArea,
        backgroundColor: COLORS.light.white,
        height: "100%",
        width: "100%",
      }}>
      <View style={styles.container}>
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

        <ActivityIndicator color={COLORS.light.primary} />

        <Animatable.Text style={styles.loading}>{message}...</Animatable.Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.light.white,
    height: "100%",
    width: "100%",
  },
  loading: {
    color: COLORS.light.primary,
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    marginTop: wp(32),
  },
  logo: {
    resizeMode: "contain",
    height: hp(59),
    width: wp(89),
    marginBottom: wp(32),
  },
});

export default index;
