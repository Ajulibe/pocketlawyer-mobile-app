import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP as wpercent,
} from "react-native-responsive-screen";
import COLORS from "utils/Colors";
import { wp } from "utils/Dimensions";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator color={COLORS.light.primary} />
      <Text style={styles.loading}> Loading...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    position: "absolute",
    width: wpercent("50%"),
    height: wpercent("50%"),
    zIndex: 1000,
    marginTop: heightPercentageToDP("30%"),
    borderRadius: wpercent("3%"),
  },
  loading: {
    color: COLORS.light.primary,
    marginTop: wpercent("4%"),
    fontFamily: "Roboto-Medium",
    fontSize: wp(11),
  },
});

export default index;
