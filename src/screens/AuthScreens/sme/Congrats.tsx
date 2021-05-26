import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "../../../navigation/MainNavigator";
import { ROUTES } from "../../../navigation/Routes";
import COLORS from "../../../utils/Colors";
import IMAGES from "../../../utils/Images";
import { wp, hp } from "../../../utils/Dimensions";
import PLButton from "../../../components/PLButton/PLButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_GET_STARTED_SCREEN
>;

const AuthGetStarted = ({ navigation }: Props) => {
  return (
    <Animatable.View animation="fadeIn" style={styles.wrapper}>
      <Animatable.Text
        animation="zoomIn"
        easing="ease-in"
        style={styles.textHeader}
      >
        You're all set!
      </Animatable.Text>
      <Image
        source={IMAGES.getstarted}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.intro}>
          Welcome to Pocket Lawyer! Proceed to select the categories that
          interest you
        </Text>
      </View>

      <PLButton
        style={styles.plButton}
        textColor={COLORS.light.white}
        btnText={"Select Categories"}
        onClick={() => navigation.navigate(ROUTES.AUTH_LOGIN_CATEGORY_SELECTOR)}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.TABSCREEN_STACK);
        }}
      >
        <View style={styles.loginWrapper}>
          <Text style={styles.already}>Go to Dashboard</Text>
        </View>
      </TouchableOpacity>
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
    marginTop: hp(78),
    width: wpercent("90%"),
    height: hp(252),
  },
  plButton: {
    marginTop: hp(115),
  },
  intro: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    width: "100%",
    fontStyle: "normal",
    lineHeight: hp(24),
    color: COLORS.light.black,
  },
  textWrapper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(38),
  },
  textHeader: {
    width: wp(264),
    height: wp(24),
    fontFamily: "Roboto-Bold",
    fontSize: wp(20),
    color: COLORS.light.primary,
    marginTop: hp(10),
    textAlign: "center",
  },
  already: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(20),
    color: COLORS.light.black,
    textAlign: "center",
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
    fontSize: wp(14),
    lineHeight: hp(16),
    letterSpacing: 0,
    color: COLORS.light.lightpurple,
  },
});

export default AuthGetStarted;
