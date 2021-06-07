import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { hp, wp } from "../utils/Dimensions";

interface Props {
  onBackPress?: () => void; //Back button press
  title: any; //title of the app bar
  subtitle?: any; // Appbar subtitle
  trailing?: JSX.Element; //the trailing/end icon(s)
  navigation?: any; //list click listener
  showBorderBottom?: boolean;
  hideBackButton?: any;
}
const CustomAppbar = (props: Props) => {
  const onBackPress = () => {
    if (props.onBackPress == null) {
      // default back button behavior
      props.navigation?.goBack();
    } else {
      //Overriding the back buton from the screen
      props.onBackPress();
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: props.showBorderBottom
            ? "rgba(0, 0, 0, 0.1)"
            : "transparent",
        },
      ]}
    >
      <TouchableOpacity
        onPress={onBackPress}
        style={[
          styles.leading,
          {
            height: props.hideBackButton && 0,
            opacity: props.hideBackButton && 0,
          },
        ]}
      >
        <MaterialIcons
          name="keyboard-arrow-left"
          size={28}
          color={"rgba(0, 0, 0, 0.7)"}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        {props.subtitle && (
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        )}
      </View>
      <View style={styles.trailing}>
        {props.trailing != null && props.trailing}
      </View>
    </View>
  );
};

export default CustomAppbar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: hp(16),
    paddingHorizontal: wp(6),
    borderBottomColor: "rgba(32,47,68,.06)",
    borderBottomWidth: 0.8,
  },
  leading: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto-Medium",
    lineHeight: hp(24),
    fontSize: wp(20),
    textAlign: "center",
    fontWeight: "700",
    color: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    // display: "flex",
    // flexWrap: "nowrap",
    // flex: 1,
    // flexShrink: 1,
  },
  subtitle: {
    fontFamily: "Roboto-Regular",
    lineHeight: hp(16),
    fontSize: wp(10),
    color: "rgba(0, 0, 0, 0.7)",
  },
  trailing: {
    alignItems: "flex-end",
    minWidth: 40,
  },
});
