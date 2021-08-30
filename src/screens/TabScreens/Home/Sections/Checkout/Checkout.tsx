import React, {useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {StackScreenProps} from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import {HomeStackParamList} from "navigation/HomeStack";
import {ROUTES} from "navigation/Routes";
import PaystackWebView from "components/PaystackSDK/index";

// @ts-ignore
import {
  Image,
  KeyboardAvoidingView,
  LogBox,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "utils/Colors";
import CONSTANTS from "utils/Constants";
import {hp, wp} from "utils/Dimensions";
import UserDescListTile from "screens/TabScreens/Account/Components/UserDescListTile";
import CustomButton from "components/CustomButton";
import axiosClient from "utils/axiosClient";
import {PLToast} from "components/PLToast/index.component";
import Utilities from "utils/Utilities";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import {
  showError,
  showSuccess,
} from "../BottomSheet/BottomSheetUtils/FormHelpers";
import {
  LoadingActionType,
  loadingInitialState,
  loadingReducer,
} from "../BottomSheet/BottomSheetUtils/LoadingReducer";
import LoadingSpinner from "components/LoadingSpinner/index.component";
import {CommonActions} from "@react-navigation/routers";
import {RootStackParamList} from "navigation/MainNavigator";

type Props = StackScreenProps<RootStackParamList, ROUTES.CHECKOUT_SCREEN>;

const Checkout = ({navigation, route}: Props) => {
  const [showModal, setshowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("pluser@gmail.com");
  const [firstName, setFirstName] = useState("");
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState,
  );

  const lawyer = route.params?.lawyer;
  const service = route.params?.service;
  const amount = route.params?.amount;
  const serviceHistoryID = route.params?.serviceHistoryID;

  //--> lawyer details
  const {name, address} = lawyer;
  // console.log(lawyer);

  React.useEffect(() => {
    getUser();
  }, []);

  //--> User Details
  const getUser = async () => {
    let user: any = await AsyncStorageUtil.getUser();
    const userObject = JSON.parse(user);
    const email = userObject?.email;
    const firstname = userObject?.firstName;
    if (user != null || typeof user !== "undefined") {
      user = JSON.parse(user);
      setUserEmail(email);
      setFirstName(firstname);
    }
  };

  // navigation.goBack();

  // console.log(amount, userEmail, showModal);

  const showPaymentModal = () => {
    setshowModal(true);
    // if (validateEmail(userEmail)) {
    //   setshowModal(true);
    // } else {
    //   showError("User Email is Invalid");
    // }
  };

  const submitPayment = async (transactionRef: string | number) => {
    const userId = await AsyncStorageUtil.getUserId();
    const payload = {
      userID: Number(userId),
      HistoryID: serviceHistoryID,
      transactionRef: transactionRef,
    };
    setTimeout(function () {
      loadingDispatch({
        type: LoadingActionType.SHOW_WITH_CONTENT,
        payload: {content: "Verifying payment..."},
      });
    }, 500);

    try {
      const response = await axiosClient.post("Service/UpdatePayment", payload);
      if (response?.data?.status === 200) {
        showSuccess("Payment successful");

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ROUTES.TABSCREEN_STACK}],
          }),
        );
      } else {
        showError("An error occured");
      }
    } catch (error) {
      showError(`Error occured: ${error}`);
    }
    loadingDispatch({type: LoadingActionType.HIDE});
  };
  LogBox.ignoreAllLogs();

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <CustomAppbar
        navigation={navigation}
        title="Checkout"
        showBorderBottom={false}
      />
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <ScrollView
          contentContainerStyle={[styles.container, {flexGrow: 1}]}
          keyboardShouldPersistTaps="handled"
          bounces={false}>
          <Text style={styles.subTitle}>
            Hello&nbsp;
            <Text
              style={{
                color: COLORS.light.primary,
                fontFamily: "Roboto-Bold",
                fontSize: wp(16),
              }}>
              {firstName}
            </Text>
            , confirm the details you have entered before you proceed to make
            payment.
          </Text>
          <View style={{height: hp(12)}} />
          <Text style={styles.subTitle}>
            Please note that in a situation where a service is not offered your
            consultation fee would be fully refunded.
          </Text>
          <View style={{height: hp(36)}} />
          <UserDescListTile leading="Service" value={service?.serviceName!} />
          <UserDescListTile leading="Lawyer" value={name!} />
          <UserDescListTile leading="Location" value={address!} />
          <UserDescListTile
            leading="Price"
            value={`\u20A6 ${Utilities.formateToMoney(amount)}`}
          />
          <UserDescListTile leading="Date" value={Utilities.currentDate()} />
          <View
            style={{
              marginTop: hp(56),
              paddingTop: hp(12),
              borderTopColor: "rgba(0, 0, 0, 0.05)",
              borderTopWidth: 1,
            }}
          />
          <UserDescListTile
            makeBold={true}
            leading="Total"
            value={`\u20A6 ${Utilities.formateToMoney(amount)}`}
          />

          <Text
            style={[
              {
                ...styles.subTitle,
                textAlign: "center",
                fontSize: wp(14),
                marginBottom: 20,
              },
            ]}>
            You will receive a notification on the progress of your request on
            your service history.
          </Text>
          <View style={{flex: 1}} />

          <CustomButton btnText="Proceed to Pay" onClick={showPaymentModal} />
        </ScrollView>

        <View style={{flex: 1}}>
          <PaystackWebView
            setshowModal={setshowModal}
            showModal={showModal}
            refNumber={"" + Math.floor(Math.random() * 1000000000 + 1)}
            buttonText="Pay Now"
            showPayButton={false}
            paystackKey="pk_test_1f4d08ee4ca98bceccd324a474105e184faf4407"
            amount={amount}
            // billingEmail={userEmail} //change this email to the inidividuals email
            billingEmail="a.ajulibe@yahoo.com"
            billingMobile="0531714677" //change
            billingName="Akachukwu Ajulibe"
            channels={JSON.stringify([
              "card",
              "bank",
              "ussd",
              "qr",
              "mobile_money",
            ])}
            ActivityIndicatorColor="green"
            SafeAreaViewContainer={{
              marginTop: 5,
            }}
            SafeAreaViewContainerModal={{marginTop: 5}}
            handleWebViewMessage={(e: any) => {}}
            onCancel={(resp: any) => {
              if (resp?.status === "cancelled") {
                showError("Transaction cancelled");
              } else {
                showError(resp?.status ?? JSON.stringify(resp));
              }
            }}
            onSuccess={(resp: any) => {
              if (resp.status === "success") {
                const trxref = resp?.data?.transactionRef?.reference;
                submitPayment(trxref);
              }
            }}
            autoStart={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
  },
  userPhoto: {
    resizeMode: "contain",
    width: wp(117),
    height: wp(117),
    borderRadius: 150,
  },
  subTitle: {
    fontWeight: "300",
    fontSize: wp(15),
    lineHeight: hp(24),
    marginTop: hp(6),
    color: "rgba(0, 0, 0, 0.9)",
    fontFamily: "Roboto-Regular",
  },
});
