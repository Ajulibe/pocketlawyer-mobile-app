/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from "react";
import {ROUTES} from "navigation/Routes";
import axiosClient from "utils/axiosClient";
import {PLToast} from "components/PLToast/index.component";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CommonActions} from "@react-navigation/native";

export const useLogin = (navigation: any) => {
  const [visible, setVisible] = React.useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //--> for reset password
  const [resetemail, setResetEmail] = useState("");
  const [isResetDisabled, setResetIsDisabled] = useState(false);
  const [isresetLoading, setResetIsLoading] = useState(false);

  React.useEffect(() => {
    if (password.length === 0 || email.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [password, email]);
  //------------------------------------------------------

  React.useEffect(() => {
    if (resetemail.length === 0) {
      setResetIsDisabled(true);
    } else {
      setResetIsDisabled(false);
    }
  }, [resetemail]);
  //----------------------------------------------------------

  const Login = async () => {
    setIsLoading(true);
    const payload = {
      email: email,
      password: password,
    };

    try {
      const {data} = await axiosClient.post("User/Login", payload);

      setIsLoading(false);
      PLToast({message: "Successful", type: "success"});

      const dataObject = data.data.user_;

      //--> setting async stoarage data for usage later
      const {token} = dataObject;
      const {userType} = dataObject;
      const {userID} = dataObject;
      const {firstName} = dataObject;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userType", JSON.stringify(userType));
      await AsyncStorage.setItem("userID", JSON.stringify(userID));
      await AsyncStorage.setItem("firstName", firstName);
      await AsyncStorageUtil.setUser(JSON.stringify(data));

      //--> Checking th etype of user loggin in
      if (userType === 1 || userType === 2) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ROUTES.TABSCREEN_STACK}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ROUTES.TABSCREEN_STACK_LAWYER}],
          }),
        );
      }
      // await AsyncStorageUtil.setUser(JSON.stringify(data?.data?.user_));
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: ROUTES.TABSCREEN_STACK }],
      //   })
      // );
    } catch (error: any) {
      setIsLoading(false);
      const {message} = error?.response.data;
      PLToast({message: message, type: "error"});
    }
  };

  const resetPassword = async () => {
    setResetIsLoading(true);
    const payload = {
      email: resetemail,
    };

    try {
      await axiosClient.post("user/ForgetPassword", payload);
      PLToast({
        message: "A Temporary password has been sent to your mail",
        type: "success",
      });
      setResetIsLoading(false);
    } catch (error: any) {
      setResetIsLoading(false);
      setVisible(false);

      if (error.response.status === 401) {
        PLToast({message: "Authentication Error", type: "error"});
        return;
      } else {
      }
      const {message} = error?.response.data;
      PLToast({message: message, type: "error"});
    }
  };

  return {
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
  };
};
