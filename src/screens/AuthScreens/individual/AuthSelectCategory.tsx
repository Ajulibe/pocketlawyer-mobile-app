import React from "react";
import { View, StyleSheet, SafeAreaView, Text, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/MainNavigator";
import { ROUTES } from "../../../navigation/Routes";
import COLORS from "../../../utils/Colors";
import { wp, hp } from "../../../utils/Dimensions";
import PLButton from "../../../components/PLButton/PLButton";
import { Radio, RadioGroup } from "@ui-kitten/components";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const AuthGetStarted = ({ navigation }: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const selectCategory = () => {
    if (selectedIndex === 0) {
      navigation.navigate(ROUTES.AUTH_SIGN_UP);
    } else if (selectedIndex === 1) {
      navigation.navigate(ROUTES.AUTH_SIGN_UP_SME);
    } else {
      navigation.navigate(ROUTES.SERVICE_PROVIDER_CATEGORY_SELECTOR);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.welcomeText}>
        <Text style={styles.Hello}>Hello 👋</Text>
        <Text style={styles.selectText}>
          Please select the category that best describes you.{" "}
        </Text>
      </View>

      <View style={styles.radiobtnFirstWrapper}>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={(index) => setSelectedIndex(index)}
        >
          <Radio style={styles.radioBtn}>Individual</Radio>
          <Radio style={styles.radioBtn}>SME/Business</Radio>
          <Radio style={styles.radioBtn}>Service Provider</Radio>
        </RadioGroup>
      </View>

      <PLButton
        style={styles.plButton}
        textColor={COLORS.light.white}
        btnText={"Next"}
        onClick={selectCategory}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.light.white,
  },
  Hello: {
    fontFamily: "Roboto-Bold",
    fontSize: wp(20),
    color: COLORS.light.black,
  },
  selectText: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    color: COLORS.light.black,
    marginTop: hp(20),
  },
  welcomeText: {
    textAlign: "left",
    marginTop: hp(33),
  },
  radiobtnFirstWrapper: {
    width: wp(335),
    height: hp(208),
    marginTop: hp(139),
    justifyContent: "center",
  },
  radioBtn: {
    borderRadius: 7,
    height: hp(60),
    paddingLeft: wp(20),
    marginTop: hp(14),
    backgroundColor: COLORS.light.checkpurple,
  },
  plButton: {
    marginTop: hp(202),
  },
});

export default AuthGetStarted;
