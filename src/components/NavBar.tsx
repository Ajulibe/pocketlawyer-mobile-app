import React from "react";
import { View, StyleSheet, Text, TextStyle } from "react-native";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import COLORS from "../utils/Colors";
import { wp, hp } from "../utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface NavProps {
  onPress: any;
  navText: string;
  textStyle?: TextStyle;
}

const NavBar = ({ onPress, navText, textStyle }: NavProps) => {
  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons
          name="chevron-back-outline"
          size={27}
          color={COLORS.light.black}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Text style={[styles.navText, textStyle]}>{navText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wpercent("90%"),
    marginTop: hp(21),
  },
  navText: {
    fontFamily: "Roboto-Bold",
    fontSize: wp(20),
    fontWeight: "bold",
    color: COLORS.light.black,
    width: wpercent("80%"),
    textAlign: "center",
  },
  backIcon: {
    width: wpercent("7%"),
  },
});

export default NavBar;
