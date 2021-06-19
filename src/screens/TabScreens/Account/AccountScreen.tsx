import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import { AccountStackParamList } from "navigation/AccountStack";
import { ROUTES } from "navigation/Routes";

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
import CONSTANTS from "utils/Constants";
import { hp, wp } from "utils/Dimensions";
import UserDescListTile from "./Components/UserDescListTile";
import { Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";

//--> REDUX
import { useAppSelector } from "redux/hooks";
import { getFirstLetterFromName } from "./UpdateProfile/utilsFn";

type Props = StackScreenProps<AccountStackParamList, ROUTES.ACCOUNT_SCREEN>;

const AccountScreen = ({ navigation }: Props) => {
  //--> state from redux store
  const userData = useAppSelector((state) => state?.users?.user);
  const { user_, metaData } = userData;
  const [profileImage, setProfileImage] = useState("abc.jpg");

  // console.log(userData);

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
        <CustomAppbar
          navigation={navigation}
          title="My Account"
          showBorderBottom={false}
          hideBackButton={true}
        />
        <ScrollView
          contentContainerStyle={[styles.container, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <Avatar
            rounded
            titleStyle={{
              fontFamily: "Roboto-Medium",
              fontSize: wp(17),
              color: COLORS.light.white,
            }}
            size="large"
            placeholderStyle={{ backgroundColor: COLORS.light.primary }}
            title={`${getFirstLetterFromName(
              user_ ? user_?.firstName : ""
            )} ${getFirstLetterFromName(user_ ? user_?.lastName : "")}`}
            source={{
              uri: `https://${profileImage}`,
            }}
            onPress={() => navigation.navigate(ROUTES.UPDATE_IMAGE)}
            containerStyle={styles.userPhoto}
          >
            <Avatar.Accessory size={18} underlayColor={COLORS.light.black} />
          </Avatar>

          <TouchableOpacity
            style={styles.textBtn}
            onPress={() => {
              navigation.navigate(ROUTES.UPDATE_PROFILE);
            }}
          >
            <AntDesign name="edit" size={15} color={COLORS.light.white} />
          </TouchableOpacity>

          <View style={{ height: hp(20) }} />
          <UserDescListTile leading="First Name" value={user_?.firstName} />
          <UserDescListTile leading="Last Name" value={user_?.lastName} />
          <UserDescListTile leading="State" value={addressArray[1]} />
          <UserDescListTile leading="City" value={addressArray[0]} />
          <UserDescListTile
            leading="Date of Birth"
            value={dayjs(user_?.dob).format("DD/MM/YYYY")}
          />
          <Text
            style={[
              {
                ...styles.changePhotoBtn,
                textAlign: "center",
                color: COLORS.light.black,
                marginTop: hp(10),
              },
            ]}
          >
            If you have any issues with your information, please send a message
            to info@pocket-lawyers.com
          </Text>
          <Text style={styles.subTitle}>Contact Information</Text>
          <View style={{ height: hp(18) }} />
          <UserDescListTile leading="Phone Number" value={user_?.phone} />
          <UserDescListTile leading="Email Address" value={user_?.email} />

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
    lineHeight: hp(20),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "rgba(0, 0, 0, 0.7)",
  },
});
