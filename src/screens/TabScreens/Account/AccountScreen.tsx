import React, {useEffect, useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {StackScreenProps} from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import {AccountStackParamList} from "navigation/AccountStack";
import {ROUTES} from "navigation/Routes";
import {Feather} from "@expo/vector-icons";

import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "utils/Colors";
import {hp, wp} from "utils/Dimensions";
import UserDescListTile from "./Components/UserDescListTile";
import {Avatar} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";
import dayjs from "dayjs";

//--> REDUX
import {useAppSelector} from "redux/hooks";
import {getFirstLetterFromName} from "./UpdateProfile/utilsFn";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = StackScreenProps<AccountStackParamList, ROUTES.ACCOUNT_SCREEN>;

const AccountScreen = ({navigation}: Props) => {
  //--> state from redux store
  const userData = useAppSelector((state) => state?.users?.user);
  const user_ = userData?.user_;
  const metaData = userData?.metaData;
  const [profileImage, setProfileImage] = useState("abc.jpg");

  React.useEffect(() => {
    if (typeof metaData === "undefined") {
      return;
    }
    setAvatar();
  }, [metaData]);

  const setAvatar = () => {
    if (metaData?.length !== 0) {
      setProfileImage(metaData[metaData?.length - 1]?.value);
    } else {
      setProfileImage("abc.jpg");
    }
  };

  const addressArray = user_?.address?.split(",");

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <ScrollView
          contentContainerStyle={[styles.container, {flexGrow: 1}]}
          keyboardShouldPersistTaps="handled"
          bounces={false}>
          <CustomAppbar
            navigation={navigation}
            title="My Account"
            showBorderBottom={false}
            hideBackButton={true}
          />
          <Avatar
            rounded
            titleStyle={{
              fontFamily: "Roboto-Medium",
              fontSize: wp(17),
              color: COLORS.light.white,
            }}
            size="large"
            placeholderStyle={{backgroundColor: COLORS.light.primary}}
            title={`${getFirstLetterFromName(
              user_ && user_?.userType === 1
                ? user_?.firstName
                : user_?.company?.contactFirstName,
            )} ${getFirstLetterFromName(
              user_ && user_?.userType === 1
                ? user_?.lastName
                : user_?.company?.contactLastName,
            )}`}
            source={{
              uri: `https://${profileImage}`,
              cache: "force-cache",
            }}
            onPress={() => navigation.navigate(ROUTES.UPDATE_IMAGE)}
            containerStyle={styles.userPhoto}>
            <Avatar.Accessory size={18} underlayColor={COLORS.light.black} />
          </Avatar>

          <TouchableOpacity
            style={styles.textBtn}
            onPress={() => {
              navigation.navigate(ROUTES.UPDATE_PROFILE);
            }}>
            <AntDesign name="edit" size={15} color={COLORS.light.white} />
          </TouchableOpacity>

          <View style={{height: hp(20)}} />
          <UserDescListTile
            leading="First Name"
            value={
              user_ && user_?.userType === 1
                ? user_?.firstName
                : user_?.company?.contactFirstName
            }
          />
          <UserDescListTile
            leading="Last Name"
            value={
              user_ && user_?.userType === 1
                ? user_?.lastName
                : user_?.company?.contactLastName
            }
          />
          {user_ && user_?.userType === 1 ? (
            <>
              <UserDescListTile leading="State" value={addressArray[1]} />
              <UserDescListTile leading="City" value={addressArray[0]} />
              <UserDescListTile
                leading="Date of Birth"
                value={dayjs(user_?.dob).format("DD/MM/YYYY")}
              />
            </>
          ) : null}
          <View style={{height: hp(18)}} />
          <Text style={styles.subTitle}>Contact Information</Text>
          <View style={{height: hp(18)}} />
          <UserDescListTile leading="Phone Number" value={user_?.phone} />
          <UserDescListTile leading="Email Address" value={user_?.email} />

          <TouchableOpacity
            style={styles.changePasswordBth}
            onPress={() => navigation.navigate(ROUTES.UPDATE_PASSWORD)}>
            <Text
              style={[
                styles.passBtnText,
                {color: "black", fontFamily: "Roboto-Bold"},
              ]}>
              Update Password
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={COLORS.light.black}
            />
          </TouchableOpacity>
          <View style={{height: hp(18)}} />
          <Text
            style={[
              {
                ...styles.changePhotoBtn,
                textAlign: "center",
                color: COLORS.light.black,
                marginTop: hp(10),
              },
            ]}>
            If you have any issues with your information, please send a message
            to&nbsp;
            <Text style={{color: COLORS.light.primary}}>
              info@pocket-lawyers.com
            </Text>
          </Text>
          <View style={{height: hp(18)}} />
          <TouchableOpacity
            style={styles.changePasswordBth}
            onPress={async () => {
              AsyncStorage.clear();
              navigation.navigate(ROUTES.AUTH_LOGIN);
            }}>
            <Text
              style={[
                styles.passBtnText,
                {
                  color: "black",
                  fontFamily: "Roboto-Bold",
                  marginBottom: hp(20),
                },
              ]}>
              Logout
            </Text>
            <Feather name="log-out" size={14} color="black" />
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
    paddingVertical: hp(6),
    alignItems: "center",
  },
  userPhoto: {
    marginBottom: hp(20),
  },
  textBtn: {
    backgroundColor: COLORS.light.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: wp(30),
    borderRadius: wp(30),
    width: wp(30),
    alignSelf: "flex-start",
    marginBottom: hp(10),
  },
  changePhotoBtn: {
    fontWeight: "300",
    fontSize: wp(12),
    lineHeight: Platform.OS === "ios" ? hp(20) : hp(28),
    color: COLORS.light.white,
    fontFamily: "Roboto-Medium",
  },
  subTitle: {
    fontSize: wp(14),
    lineHeight: hp(20),
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
    color: COLORS.light.primary,
    marginBottom: hp(2),
    textAlign: "center",
    width: "100%",
    // marginTop: hp(24),
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
    lineHeight: hp(20),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "rgba(0, 0, 0, 0.7)",
  },
});
