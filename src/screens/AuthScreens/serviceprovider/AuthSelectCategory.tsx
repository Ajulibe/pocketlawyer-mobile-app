import React from "react";
import { View, StyleSheet, SafeAreaView, Text, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/MainNavigator";
import { ROUTES } from "../../../navigation/Routes";
import COLORS from "../../../utils/Colors";
import { wp, hp } from "../../../utils/Dimensions";
import PLButton from "../../../components/PLButton/PLButton";
import { Radio, RadioGroup } from "@ui-kitten/components";
import NavBar from "../../../components/NavBar";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const AuthGetStarted = ({ navigation }: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const selectCategory = () => {
    if (selectedIndex === 0) {
      navigation.navigate(ROUTES.AUTH_SIGN_UP_LAWYER);
    } else if (selectedIndex === 1) {
      Alert.alert("solicitor");
      navigation.navigate(ROUTES.AUTH_SIGN_UP_SOLICITOR);
    } else {
      navigation.navigate(ROUTES.AUTH_SIGN_UP_LAWFIRM);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavBar
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_SIGN_UP_SECTION_TWO_SME);
        }}
        navText="Select Option"
        textStyle={styles.navBarText}
      />

      <View style={styles.welcomeText}>
        <Text style={styles.selectText}>
          Please select the category that best describes you as a service
          provider
        </Text>
      </View>

      <View style={styles.radiobtnFirstWrapper}>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={(index) => setSelectedIndex(index)}
        >
          <Radio style={styles.radioBtn}>Lawyer</Radio>
          <Radio style={styles.radioBtn}>Solicitor</Radio>
          <Radio style={styles.radioBtn}>Law Firm</Radio>
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

  selectText: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    color: COLORS.light.black,
  },
  welcomeText: {
    textAlign: "left",
    marginTop: hp(33),
    width: wp(320),
  },
  navBarText: {
    color: COLORS.light.primary,
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
