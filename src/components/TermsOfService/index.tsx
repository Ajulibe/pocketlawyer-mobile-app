import React from "react";
import {View, StyleSheet, Text} from "react-native";
import {widthPercentageToDP as wpercent} from "react-native-responsive-screen";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";

export const Terms = () => {
  return (
    <View style={styles.loginWrapper}>
      <Text style={styles.signUpText}>
        By signing up, you agree with the
        <Text style={styles.login}> Terms of services </Text>and{" "}
        <Text style={styles.login}>Privacy policy </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    color: COLORS.light.black,
    lineHeight: hp(20),
  },

  loginWrapper: {
    flexDirection: "row",
    width: wpercent("80%"),
    justifyContent: "space-around",
    marginTop: hp(12),
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    letterSpacing: 0,
    color: COLORS.light.lightpurple,
  },
});
