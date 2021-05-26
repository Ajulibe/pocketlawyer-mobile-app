import { StackScreenProps } from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Input from "components/Input";
import { hp, wp } from "utils/Dimensions";
import CustomButton from "components/CustomButton";

// type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN_STACK>;
type Props = StackScreenProps<any>;

const UpdatePassword = ({ navigation }: Props) => {
  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <KeyboardAvoidingView
          behavior={"padding"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS == "android" ? -300 : -50}
        >
          <CustomAppbar
            navigation={navigation}
            title="Change Password"
            showBorderBottom={false}
          />
          <ScrollView
            contentContainerStyle={[styles.container, { flexGrow: 1 }]}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <Text style={styles.inputLabel}>Current Password</Text>
            <Input
              placeholder="Enter current password"
              placeholderTextColor=""
              errorText={""}
              keyboardType="default"
              autoCapitalize="sentences"
              returnKeyType="send"
              onInputChange={(value) => null}
              initialValue=""
              initiallyValid={false}
              required
              secureTextEntry={false}
              minLength={2}
              textContentType="none"
            />
            <View style={{ height: 16 }} />
            <Text style={styles.inputLabel}>New Password</Text>
            <Input
              placeholder="Enter new password"
              placeholderTextColor=""
              errorText={""}
              keyboardType="default"
              autoCapitalize="sentences"
              returnKeyType="send"
              onInputChange={(value) => null}
              initialValue=""
              initiallyValid={false}
              required
              secureTextEntry={false}
              minLength={2}
              textContentType="none"
            />
            <View style={{ height: 16 }} />
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <Input
              placeholder="Confirm new password"
              placeholderTextColor=""
              errorText={""}
              keyboardType="default"
              autoCapitalize="sentences"
              returnKeyType="send"
              onInputChange={(value) => null}
              initialValue=""
              initiallyValid={false}
              required
              secureTextEntry={false}
              minLength={2}
              textContentType="none"
            />
            <View style={{ height: 50 }} />
            <CustomButton btnText="Update Password" onClick={() => null} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
  },
  inputLabel: {
    fontSize: wp(12),
    lineHeight: hp(24),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "rgba(0, 0, 0, 0.7)",
    marginBottom: hp(2),
  },
});
