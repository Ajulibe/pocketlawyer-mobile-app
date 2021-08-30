import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../../navigation/MainNavigator";
import {ROUTES} from "../../../navigation/Routes";
import COLORS from "../../../utils/Colors";
import {wp, hp} from "../../../utils/Dimensions";
import PLButton from "../../../components/PLButton/PLButton.component";
import {Radio, RadioGroup} from "@ui-kitten/components";
import * as Animatable from "react-native-animatable";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {FS} from "utils/FontSize";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const AuthGetStarted = ({navigation}: Props) => {
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
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.welcomeText}>
        <Animatable.Text animation="slideInDown" style={styles.Hello}>
          Hello 👋
        </Animatable.Text>
        <Text style={styles.selectText}>
          Please select the category that best describes you.
        </Text>
      </View>

      <Animatable.View
        animation="fadeIn"
        easing="ease-in"
        style={styles.radiobtnFirstWrapper}>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={(index) => setSelectedIndex(index)}>
          <Radio style={styles.radioBtn}>Individual</Radio>
          <Radio style={styles.radioBtn}>SME/Business</Radio>
          <Radio style={styles.radioBtn}>Service Provider</Radio>
        </RadioGroup>
      </Animatable.View>

      <PLButton
        style={styles.plButton}
        textColor={COLORS.light.white}
        btnText={"Next"}
        onClick={selectCategory}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_LOGIN);
        }}
        style={{justifyContent: "center", marginTop: hp(30)}}>
        <Text style={styles.already}>
          Already have an account? &nbsp;
          <Text style={styles.login}>Log in</Text>
        </Text>
      </TouchableOpacity>
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
    fontSize: FS.heading,
    color: COLORS.light.primary,
  },
  selectText: {
    fontFamily: "Roboto-Regular",
    fontSize: FS.mainBody,
    color: COLORS.light.black,
    marginTop: hp(10),
    lineHeight: Platform.OS === "ios" ? hp(32) : hp(40),
  },
  welcomeText: {
    textAlign: "left",
    marginTop: hp(33),
    width: widthPercentageToDP("90"),
  },
  radiobtnFirstWrapper: {
    width: wp(335),
    height: hp(208),
    marginTop: hp(90),
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
    marginTop: hp(172),
    width: widthPercentageToDP("90%"),
  },
  already: {
    fontFamily: "HK-Medium",
    fontSize: FS.mainBody,
    lineHeight: hp(24),
    color: COLORS.light.black,
  },
  login: {
    fontFamily: "HK-Bold",
    fontSize: FS.mainBody,
    lineHeight: hp(24),
    letterSpacing: 0,
    color: COLORS.light.primary,
    justifyContent: "center",
  },
});

export default AuthGetStarted;
