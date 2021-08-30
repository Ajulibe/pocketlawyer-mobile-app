/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import {View, SafeAreaView, Text} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "navigation/MainNavigator";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton.component";
import {PLPasswordInput} from "components/PLPasswordInput/PLPasswordInput.component";
import {PLTextInput} from "components/PLTextInput/PLTextInput.component";
import {TouchableOpacity} from "react-native-gesture-handler";
import {PLModal} from "components/PLModal/index.component";
import globalStyles from "css/GlobalCss";
import {styles} from "./Styles";
import {useLogin} from "./useLogin";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const AuthLogin = ({navigation}: Props) => {
  const {
    resetPassword,
    Login,
    isResetDisabled,
    isresetLoading,
    setResetEmail,
    setPassword,
    visible,
    isDisabled,
    isLoading,
    setEmail,
    setVisible,
  } = useLogin(navigation);

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <NavBar
        onPress={() => {
          navigation.goBack();
        }}
        navText="Login"
        isDisabledGoBack={true}
      />
      <View style={styles.contentWraper}>
        <Text style={styles.welcomeMessage}>
          Welcome back. Log in to continue.
        </Text>

        <View>
          <PLTextInput
            labelText="Email"
            labelTextRequired={true}
            onChangeText={setEmail}
            autoCapitalize="none"
            textContentType="emailAddress"
            style={styles.input}
            placeholder="Type your email address"
          />
        </View>

        <View>
          <Text style={styles.inputText}>
            Password <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.phoneNumberWrapper}>
            <PLPasswordInput
              placeholder="Enter your Password"
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* RESET PASSWORD MODAL */}

        <PLModal
          onBackdropPress={() => setVisible(false)}
          visible={visible}
          onPress={() => setVisible(false)}>
          <Text style={styles.resetPasswordText}>Please Enter your Email</Text>

          <PLTextInput
            textContentType="emailAddress"
            style={styles.resetPasswordInput}
            placeholder="Type your email address"
            labelText="Email"
            autoCapitalize="none"
            labelTextRequired={true}
            onChangeText={setResetEmail}
          />

          <PLButton
            disabled={isResetDisabled}
            isLoading={isresetLoading}
            textColor={COLORS.light.white}
            btnText={"Send Reset Link"}
            onClick={resetPassword}
            style={styles.resetPasswordBtn}
          />
        </PLModal>

        <PLButton
          style={styles.plButton}
          textColor={COLORS.light.white}
          btnText={"Login"}
          disabled={isDisabled}
          onClick={Login}
          isLoading={isLoading}
        />
        <View style={styles.loginWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.AUTH_SELECT_CATEGORY)}>
            <Text style={styles.signupText}>
              Do not have an account?
              <Text style={styles.login}>&nbsp; Sign up </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthLogin;
