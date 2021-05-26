import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "../../../navigation/MainNavigator";
import { ROUTES } from "../../../navigation/Routes";
import COLORS from "../../../utils/Colors";
import { wp, hp } from "../../../utils/Dimensions";
import NavBar from "../../../components/NavBar";
import PLButton from "../../../components/PLButton/PLButton";
import { PLPasswordInput } from "../../../components/PLPasswordInput/PLPasswordInput";
import { PLTextInput } from "../../../components/PLTextInput/PLTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PLModal } from "../../../components/PLModal";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const AuthGetStarted = ({ navigation }: Props) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavBar
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_GET_STARTED_SCREEN);
        }}
        navText="Login"
      />
      <View style={styles.contentWraper}>
        <Text style={styles.welcomeMessage}>
          Welcome back! Log in to continue.
        </Text>

        <View>
          <Text style={styles.inputText}>Email</Text>
          <PLTextInput
            textContentType="emailAddress"
            style={styles.input}
            placeholder="Type your email address"
          />
        </View>

        <View>
          <Text style={styles.inputText}>Password</Text>
          <View style={styles.phoneNumberWrapper}>
            <PLPasswordInput placeholder="Enter your Password" />
          </View>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* RESET PASSWORD MODAL */}
        <PLModal
          onBackdropPress={() => setVisible(false)}
          visible={visible}
          onPress={() => setVisible(false)}
        >
          <Text style={styles.resetPasswordText}>Please Enter your Email</Text>
          <PLTextInput
            textContentType="emailAddress"
            style={styles.resetPasswordInput}
            placeholder="Type your email address"
          />
          <PLButton
            textColor={COLORS.light.white}
            btnText={"Send Reset Link"}
            // onClick={() => setVisible(false)}
            style={styles.resetPasswordBtn}
          />
        </PLModal>

        <PLButton
          style={styles.plButton}
          textColor={COLORS.light.white}
          btnText={"Next"}
          onClick={() =>
            navigation.navigate(ROUTES.AUTH_LOGIN_CATEGORY_SELECTOR)
          }
        />
        <View style={styles.loginWrapper}>
          <TouchableOpacity
            // onPress={() => navigation.navigate(ROUTES.AUTH_SIGN_UP)}
            onPress={() => navigation.navigate(ROUTES.TABSCREEN_STACK)}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Roboto-Regular",
                fontSize: wp(14),
                color: COLORS.light.black,
              }}
            >
              Do not have an account?
              <Text style={styles.login}> Sign up </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(20),
    textAlign: "left",
    alignSelf: "flex-start",
    color: COLORS.light.black,
    marginBottom: hp(39),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(38),
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  resetPasswordInput: {
    width: wp(300),
    height: wp(40),
    marginTop: wp(20),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  resetPasswordText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    color: COLORS.light.black,
    textAlign: "center",
  },
  resetPasswordBtn: {
    marginTop: wp(40),
    width: wp(300),
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    color: COLORS.light.darkgrey,
  },

  inputText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(12),
    marginTop: hp(12),
  },
  forgotPassword: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.lightpurple,
    textAlign: "right",
    fontSize: wp(12),
    marginTop: wp(8),
  },
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
  },
  plButton: {
    marginTop: hp(306),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(84),
    width: wpercent("90%"),
  },
  carouselIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wpercent("7%"),
  },
  phoneNumberWrapper: {
    width: wpercent("90%"),
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-between",
    borderRadius: 4,
    borderColor: "#f0f0f0",
  },
  loginWrapper: {
    flexDirection: "row",
    width: wpercent("80%"),
    justifyContent: "space-around",
    marginTop: hp(12),
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: hp(16),
    letterSpacing: 0,
    color: COLORS.light.lightpurple,
  },
  countryPickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
    paddingLeft: wpercent("2%"),
    width: wpercent("26%"),
  },
});

export default AuthGetStarted;
