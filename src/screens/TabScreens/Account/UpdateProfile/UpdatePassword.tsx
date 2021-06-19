import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import COLORS from "utils/Colors";
import { wp } from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton";
import * as Animatable from "react-native-animatable";

import axiosClient from "utils/axiosClient";
import { PLToast } from "components/PLToast";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import globalStyles from "css/GlobalCss";
import { styles } from "./style";
import { AccountStackParamList } from "navigation/AccountStack";

//--> REDUX
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getUser } from "redux/actions";
import LoadingSpinner from "components/LoadingSpinner";
import { PLPasswordInput } from "components/PLPasswordInput/PLPasswordInput";

type Props = StackScreenProps<AccountStackParamList>;

const UpdateProfile = ({ navigation }: Props) => {
  //--> state values for the section
  const [previousPasword, setPreviousPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [error, setError] = useState("initial");
  const [mismatch, setMismatch] = useState("initial");

  //--> get previous password from redux store
  const usersCurrentPassword = useAppSelector(
    (state) => state.users.user.password
  );

  const dispatch = useAppDispatch();

  //--> loading state of the page
  const [isLoading, setIsLoading] = useState(false);

  //--> Next button disabled state
  const [isDisabled, setIsDisabled] = useState(true);

  //--> confirm all fields are validated before or disable the button
  useEffect(() => {
    if (
      previousPasword === "" ||
      confirmPassword === "" ||
      newpassword === "" ||
      usersCurrentPassword !== previousPasword ||
      confirmPassword !== newpassword
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [previousPasword, confirmPassword, newpassword]);

  const validateNewPassword = () => {
    if (confirmPassword !== newpassword) {
      setMismatch("true");
    } else {
      setMismatch("false");
    }
  };

  const validateCurrentPassword = () => {
    if (usersCurrentPassword !== previousPasword) {
      setError("true");
    } else {
      setError("false");
    }
  };

  const register = async () => {
    setIsLoading(true);

    try {
      const userID = await AsyncStorageUtil.getUserId();
      const updatePayload = {
        password: newpassword,
      };

      await axiosClient.post("User/UpdateProfile", updatePayload);
      dispatch(getUser({ userID: Number(userID) }));
      setIsLoading(false);
      PLToast({ message: "Profile Updated", type: "success" });
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    } catch (error: any) {
      console.log(error);
      const { message } = error?.response.data;
      setIsDisabled(true);
      PLToast({ message: message, type: "error" });
      setIsLoading(false);
      return;
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <NavBar
        onPress={() => {
          navigation.goBack();
        }}
        navText="Update Profile Details"
      />
      <KeyboardAwareScrollView
        extraScrollHeight={wp(100)}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        enableOnAndroid={true}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSpinner
          modalVisible={isLoading}
          content="Updating Profile..."
        />
        <Animatable.View animation="fadeIn" style={styles.contentWraper}>
          <View>
            <Text style={styles.inputText}>
              Current Password <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneNumberWrapper}>
              <PLPasswordInput
                onBlur={validateCurrentPassword}
                placeholder="Enter your Current Password"
                onChangeText={(text: string) => {
                  setError("initial");
                  setPreviousPassword(text);
                }}
              />
            </View>
            {error === "true" && (
              <Text style={styles.errorText}>
                Wrong Current password &nbsp; &#x274C;
              </Text>
            )}

            {error === "false" && (
              <Text style={styles.errorText}>
                Correct Current password &nbsp; &#10003;
              </Text>
            )}
          </View>

          <View style={styles.spacer}>
            <Text style={styles.inputText}>
              New Password <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneNumberWrapper}>
              <PLPasswordInput
                placeholder="Enter your New Password"
                onChangeText={setNewPassword}
              />
            </View>
          </View>

          <View style={styles.spacer}>
            <Text style={styles.inputText}>
              Confirm New Password <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneNumberWrapper}>
              <PLPasswordInput
                onBlur={validateNewPassword}
                placeholder="Confirm your New Password"
                onChangeText={(text: string) => {
                  setMismatch("initial");
                  setConfirmPassword(text);
                }}
              />
            </View>
            {mismatch === "true" && (
              <Text style={styles.errorText}>
                Password Mismatch &nbsp; &#10060;
              </Text>
            )}
            {mismatch === "false" && (
              <Text style={styles.validText}>
                Password is a match &nbsp; &#10003;
              </Text>
            )}
          </View>

          <PLButton
            disabled={isDisabled}
            isLoading={isLoading}
            loadingText="Updating..."
            style={styles.plButton}
            textColor={COLORS.light.white}
            btnText={"Update password"}
            onClick={register}
          />
        </Animatable.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default UpdateProfile;
