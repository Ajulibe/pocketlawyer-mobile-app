import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextStyle,
  Platform,
  TextInput,
  ViewStyle,
} from "react-native";
import {widthPercentageToDP as wpercent} from "react-native-responsive-screen";
import COLORS from "../utils/Colors";
import {wp, hp} from "../utils/Dimensions";
import {Ionicons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

interface NavProps {
  onPress?: any;
  navText?: string;
  textStyle?: TextStyle;
  style?: ViewStyle;
  isDisabledGoBack?: boolean;
}

const NavBar = ({
  onPress,
  navText,
  textStyle,
  style,
  isDisabledGoBack,
}: NavProps) => {
  return (
    <View style={[styles.navigationBar, style]}>
      {isDisabledGoBack ? null : (
        <TouchableOpacity onPress={onPress} style={styles.backIcon}>
          <Ionicons
            name="chevron-back-outline"
            size={27}
            color={COLORS.light.black}
          />
        </TouchableOpacity>
      )}

      <Animatable.Text animation="fadeIn" style={[styles.navText, textStyle]}>
        {navText}
      </Animatable.Text>

      <TouchableOpacity onPress={onPress} style={styles.backIconNone}>
        <Ionicons
          name="chevron-back-outline"
          size={27}
          color={COLORS.light.black}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: wpercent("93%"),
    marginTop: Platform.OS === "ios" ? hp(12) : hp(5),
  },
  navText: {
    fontFamily: "HK-SemiBold",
    fontSize: wp(20),
    fontWeight: "400",
    color: COLORS.light.primary,
    flex: 1,
    textAlign: "center",
  },
  backIcon: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: "auto",
    height: Platform.OS === "android" ? 0 : "auto",
  },
  backIconNone: {
    width: "100%",
    marginRight: "auto",
    color: "transparent",
    opacity: 0,
    height: 0,
  },
});

export default NavBar;
