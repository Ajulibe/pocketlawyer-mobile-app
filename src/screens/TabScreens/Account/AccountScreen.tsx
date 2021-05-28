import { MaterialIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import { AccountStackParamList } from "navigation/AccountStack";
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
import UserDescListTile from "./Components/UserDescListTile";

type Props = StackScreenProps<AccountStackParamList, ROUTES.ACCOUNT_SCREEN>;

const AccountScreen = ({ navigation }: Props) => {
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
          <Image
            source={{
              uri: CONSTANTS.user,
            }}
            style={styles.userPhoto}
          />
          <Text style={styles.changePhotoBtn}>Tap to change your photo</Text>
          <View style={{ height: hp(32) }} />
          <UserDescListTile leading="First Name" value="Bode" />
          <UserDescListTile leading="Last Name" value="Akachukwu" />
          <UserDescListTile leading="State" value="Benin" />
          <UserDescListTile leading="City" value="Onipanu" />
          <UserDescListTile leading="Date of Birth" value="03/05/1997" />
          <Text style={[{ ...styles.changePhotoBtn, textAlign: "center" }]}>
            If you have any issues with your information, please send a message
            to info@pocket-lawyers.com
          </Text>
          <Text style={styles.subTitle}>Contact Information</Text>
          <View style={{ height: hp(18) }} />
          <UserDescListTile leading="Phone Number" value="+2348134888880" />
          <UserDescListTile leading="Email Address" value="Bode@gmail.com" />

          <TouchableOpacity
            style={styles.changePasswordBth}
            onPress={() => navigation.navigate(ROUTES.UPDATE_PASSWORD)}
          >
            <Text style={styles.passBtnText}>Update Password</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={COLORS.light.black}
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
    alignItems: "center",
  },
  userPhoto: {
    resizeMode: "contain",
    width: wp(117),
    height: wp(117),
    borderRadius: 150,
  },
  changePhotoBtn: {
    fontWeight: "300",
    fontSize: wp(12),
    lineHeight: hp(14),
    marginTop: hp(6),
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto",
  },
  subTitle: {
    fontSize: wp(14),
    lineHeight: hp(16),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "rgba(0, 0, 0, 0.7)",
    marginBottom: hp(2),
    width: "100%",
    marginTop: hp(24),
  },
  changePasswordBth: {
    width: "100%",
    marginBottom: hp(2),
    marginTop: hp(16),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passBtnText: {
    fontSize: wp(14),
    lineHeight: hp(16),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "rgba(0, 0, 0, 0.7)",
  },
});
