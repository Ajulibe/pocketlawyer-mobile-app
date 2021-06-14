import React from "react";
import { View, StyleSheet, Image, Text, Platform } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "../../navigation/MainNavigator";
import { ROUTES } from "../../navigation/Routes";
import COLORS from "../../utils/Colors";
import IMAGES from "../../utils/Images";
import { wp, hp } from "../../utils/Dimensions";
import PLButton from "../../components/PLButton/PLButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_GET_STARTED_SCREEN
>;

const AuthGetStarted = ({ navigation }: Props) => {
  return (
    <Animatable.View animation="fadeIn" style={styles.wrapper}>
      <Image
        source={IMAGES.getstarted}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.textHeader}>Access Highly Skilled Laywers</Text>
      <View style={styles.textWrapper}>
        <Text style={styles.intro}>
          We provide easy access to competent, verified and highly skilled
          lawyers at affordable rates
        </Text>
      </View>

      <PLButton
        style={styles.plButton}
        textColor={COLORS.light.white}
        btnText={"Get Started"}
        onClick={() => navigation.navigate(ROUTES.AUTH_SELECT_CATEGORY)}
      />
      <View style={styles.loginWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.AUTH_LOGIN);
          }}
          style={{ justifyContent: "center" }}
        >
          <Text style={styles.already}>
            Already have an account? &nbsp;
            <Text style={styles.login}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.light.white,
  },
  image: {
    marginTop: hp(40),
    width: wpercent("90%"),
    height: hp(252),
  },
  plButton: {
    marginTop: hp(115),
  },
  intro: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(15),
    width: wp(260),
    fontStyle: "normal",
    lineHeight: Platform.OS === "ios" ? hp(28) : hp(32),
    color: COLORS.light.black,
  },
  textWrapper: {
    width: wpercent("80%"),
    alignItems: "center",
    marginTop: hp(20),
  },
  textHeader: {
    fontFamily: "Roboto-Bold",
    fontSize: wp(22),
    color: COLORS.light.primary,
    marginTop: hp(78),
  },
  already: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(15),
    lineHeight: hp(20),
    color: COLORS.light.black,
  },
  loginWrapper: {
    flexDirection: "row",
    width: wpercent("60%"),
    justifyContent: "space-around",
    marginTop: hp(21),
    alignItems: "center",
  },
  login: {
    fontFamily: "Roboto-Bold",
    fontSize: wp(15),
    lineHeight: hp(16),
    letterSpacing: 0,
    color: COLORS.light.primary,
    justifyContent: "center",
  },
});

export default AuthGetStarted;
