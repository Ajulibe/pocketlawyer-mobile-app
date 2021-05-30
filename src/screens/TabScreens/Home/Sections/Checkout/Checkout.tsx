import { MaterialIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import { HomeStackParamList } from "navigation/HomeStack";
import { ROUTES } from "navigation/Routes";
import React, { useState } from "react";
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

type Props = StackScreenProps<HomeStackParamList, ROUTES.CHECKOUT_SCREEN>;

const Checkout = ({ navigation }: Props) => {
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
          <UserDescListTile leading="Service" value="Business Registration" />
          <UserDescListTile leading="Lawyer" value="Omoye Afosa" />
          <UserDescListTile leading="Location" value="Benin" />
          <UserDescListTile leading="Price" value="12,080" />
          <UserDescListTile leading="Date" value="03/05/1997" />
          <View
            style={{
              marginTop: hp(56),
              paddingTop: hp(12),
              borderTopColor: "rgba(0, 0, 0, 0.05)",
              borderTopWidth: 1,
            }}
          />
          <UserDescListTile makeBold={true} leading="Total" value="123,323" />

          <Text style={[{ ...styles.subTitle, textAlign: "center" }]}>
            You will receive notification on the progress of your request on
            your service history.
          </Text>
          <View style={{ flex: 1 }} />

          <CustomButton btnText="Proceed to Pay" onClick={() => null} />
        </ScrollView>
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
