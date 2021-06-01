import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import { HomeStackParamList } from "navigation/HomeStack";
import { ROUTES } from "navigation/Routes";
import PaystackWebView from "components/PaystackSDK/index";

// @ts-ignore
import {
  Image,
  KeyboardAvoidingView,
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
import { hp, wp } from "utils/Dimensions";
import UserDescListTile from "screens/TabScreens/Account/Components/UserDescListTile";
import CustomButton from "components/CustomButton";
import moment from "moment";
import axiosClient from "utils/axiosClient";
import { PLToast } from "components/PLToast";

type Props = StackScreenProps<HomeStackParamList, ROUTES.CHECKOUT_SCREEN>;

const Checkout = ({ navigation, route }: Props) => {
  const [showModal, setshowModal] = useState(false);
  const [amount, setAmount] = useState("");

  const lawyer = route.params?.lawyer;
  const service = route.params?.service;

  //--> lawyer details
  const { name, address } = lawyer;

  const showPaymentModal = () => {
    setshowModal(true);
  };

  const d = new Date();
  console.log(moment(d).format("Do MMMM, YYYY"));

  React.useEffect(() => {
    getPrice();
  }, []);

  const getPrice = async () => {
    try {
      const response = await axiosClient.get(
        `Service/GetServiceAmount?ServiceCode=${service?.serviceCode}`
      );
      // console.log(response.data.data.amount);
      const { amount } = response.data.data;
      setAmount(amount);
    } catch (error) {}
  };

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar
          navigation={navigation}
          title="Service History"
          showBorderBottom={false}
        />
        <ScrollView
          contentContainerStyle={[styles.container, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <Text style={styles.subTitle}>
            Hello Tola, confirm the details you have entered before you proceed
            to make payment.
          </Text>
          <View style={{ height: hp(16) }} />
          <Text style={styles.subTitle}>
            Please note that in a situation where service is not offered your
            consultation fee would be fully refunded.
          </Text>
          <View style={{ height: hp(60) }} />
          <UserDescListTile leading="Service" value={service?.serviceName} />
          <UserDescListTile leading="Lawyer" value={name!} />
          <UserDescListTile leading="Location" value={address!} />
          <UserDescListTile leading="Price" value={`\u20A6 ${amount}`} />
          <UserDescListTile
            leading="Date"
            value={moment(d).format("Do MMMM, YYYY").toString()}
          />
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
            value={`\u20A6 ${amount}`}
          />

          <Text style={[{ ...styles.subTitle, textAlign: "center" }]}>
            You will receive notification on the progress of your request on
            your service history.
          </Text>
          <View style={{ flex: 1 }} />

          <CustomButton btnText="Proceed to Pay" onClick={showPaymentModal} />
        </ScrollView>

        <View style={{ flex: 1 }}>
          <PaystackWebView
            setshowModal={setshowModal}
            showModal={showModal}
            refNumber={"" + Math.floor(Math.random() * 1000000000 + 1)}
            buttonText="Pay Now"
            showPayButton={false}
            paystackKey="pk_test_1f4d08ee4ca98bceccd324a474105e184faf4407"
            amount={amount}
            billingEmail="a.ajulibe@gmail.com" //change this email to the inidividuals email
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
              backgoundColor: COLORS.light.primary,
            }}
            SafeAreaViewContainerModal={{ marginTop: 5 }}
            handleWebViewMessage={(e: any) => {}}
            onCancel={(resp: any) => {
              // console.log(resp);
              // PLToast({ message: resp.data.message, type: "error" });
            }}
            onSuccess={(resp: any) => {
              // navigation.navigate(ROUTES.SERVICE_SCREEN)
              // console.log(resp.data.message);
              // PLToast({ message: resp.data.message, type: "success" });
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
    fontSize: wp(12),
    lineHeight: hp(14),
    marginTop: hp(6),
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto",
  },
});
