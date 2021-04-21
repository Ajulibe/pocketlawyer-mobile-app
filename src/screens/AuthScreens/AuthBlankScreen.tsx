import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/MainNavigator";
import { ROUTES } from "../../navigation/Routes";
import COLORS from "../../utils/Colors";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_BLANK_SCREEN>;

const AuthBlankScreen = ({ navigation }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ROUTES.AUTH_SPLASH_SCREEN);
    }, 2000);
  });

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor={COLORS.light.primary}
        barStyle={"light-content"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.light.primary,
  },
});

export default AuthBlankScreen;
