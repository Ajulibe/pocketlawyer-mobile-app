import React from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RootStackParamList } from "../../navigation/MainNavigator";
import { ROUTES } from "../../navigation/Routes";
import COLORS from "../../utils/Colors";
import IMAGES from "../../utils/Images";
// import {wp, hp} from "../../utils/Dimensions"

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_LOGIN>;

const AuthLogin = ({ navigation }: Props) => {
  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor={COLORS.light.secondary}
        barStyle={"light-content"}
      />
      <View style={styles.overlayWrapper}>
        <Image
          source={IMAGES["top-overlay-dark"]}
          style={styles.overlayImage}
        />
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <Image source={IMAGES.logo} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    flex: 1,
    backgroundColor: COLORS.light.secondary,
  },
  overlayWrapper: {
    height: hp("60%"),
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: hp("6.13%"),
  },
  overlayImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("8%"),
    paddingVertical: hp("8%"),
  },
  logo: {
    resizeMode: "contain",
    height: hp("5.1%"),
    width: wp("43.48%"),
  },
});

export default AuthLogin;
