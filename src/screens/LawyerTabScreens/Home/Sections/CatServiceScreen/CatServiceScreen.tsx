import {StackScreenProps} from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import {ServiceDb} from "database/ServiceDb";
import {HomeStackParamList} from "navigation/HomeStack";
import {ROUTES} from "navigation/Routes";
import React from "react";
import COLORS from "utils/Colors";
import {MaterialIcons} from "@expo/vector-icons";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
  View,
  Linking,
  Button,
} from "react-native";
import {hp, wp} from "utils/Dimensions";
import * as WebBrowser from "expo-web-browser";
import ServiceCardTile from "../../../Services/Components/ServiceCardTile";

import UserDescListTile from "./Components/UserDescListTile";
import {Avatar} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";
import dayjs from "dayjs";
import {useAppSelector} from "redux/hooks";
import {widthPercentageToDP} from "react-native-responsive-screen";
import * as Animatable from "react-native-animatable";
import {Entypo} from "@expo/vector-icons";

type Props = StackScreenProps<HomeStackParamList, ROUTES.CAT_SERVICE_SCREEN>;

const CatServiceScreen = ({navigation, route}: Props) => {
  const category = route.params?.category;

  //--> state from redux store
  const userData = useAppSelector((state) => state?.users?.user);
  const {metaData} = userData;
  const [profileImage, setProfileImage] = React.useState("abc.jpg");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAttachmentOpen, setAttachmentIsOpen] = React.useState(false);

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

  const handleOpenWithLinking = () => {
    Linking.openURL("https://expo.io");
  };

  const handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync("https://expo.io");
  };

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar
          navigation={navigation}
          title="Request details"
          showBorderBottom={false}
          profileImage={profileImage}
          avatar={true}
        />

        <ScrollView
          contentContainerStyle={[styles.container, {flexGrow: 1}]}
          keyboardShouldPersistTaps="handled"
          bounces={false}>
          <View style={{height: hp(20)}} />
          <UserDescListTile
            leading="Service"
            value="Business Registration"
            makeBold
          />

          <TouchableOpacity
            style={[styles.changePasswordBth]}
            onPress={() => {
              setIsOpen(!isOpen);
            }}>
            <Text style={styles.formWrapper}>Business Registration Form</Text>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={COLORS.light.primary}
            />
          </TouchableOpacity>

          {isOpen && (
            <Animatable.View
              style={styles.dataWrapper}
              animation="fadeIn"
              duration={500}
              easing="ease-in">
              <Text style={styles.subTitle}>Proposed Business Name 1 </Text>
              <UserDescListTile
                leading="Dedayo Nig Ltd"
                value=""
                makeBold={false}
              />

              <Text style={styles.subTitle}>Proposed Business Name 2 </Text>
              <UserDescListTile
                leading="Dedayo Nig Ltd"
                value=""
                makeBold={false}
              />

              <Text style={styles.subTitle}>Nature of Business </Text>
              <UserDescListTile leading="Oil and Gas" value="" />

              <Text style={styles.subTitle}>Means of Identification</Text>
              <UserDescListTile leading="International Passport" value="" />

              <Text style={styles.subTitle}>ID Number</Text>
              <UserDescListTile leading="I23679871AE678" value="" />
            </Animatable.View>
          )}

          <TouchableOpacity
            style={[styles.changePasswordBth]}
            onPress={() => {
              setAttachmentIsOpen(!isAttachmentOpen);
            }}>
            <Text style={styles.formWrapper}>Required Documents</Text>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={COLORS.light.primary}
            />
          </TouchableOpacity>

          {isAttachmentOpen && (
            <Animatable.View
              animation="fadeIn"
              duration={500}
              easing="ease-in"
              style={styles.dataWrapper}>
              <TouchableOpacity
                onPress={handleOpenWithWebBrowser}
                style={styles.links}>
                <Entypo
                  name="attachment"
                  size={14}
                  color={COLORS.light.primary}
                />
                <Text style={styles.linkText}>Signature</Text>
              </TouchableOpacity>
            </Animatable.View>
          )}
        </ScrollView>

        {/* <FlatList
          data={ServiceDb.findByCategoryCode({
            catCode: category.categoryCode,
          })}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => (
            <Text style={[globalStyles.H2Style, { marginBottom: 12 }]}>
              Services
            </Text>
          )}
          contentContainerStyle={[styles.container]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ServiceCardTile
              service={item}
              onClick={() =>
                navigation.navigate(ROUTES.PICK_LAWYER_SCREEN, {
                  // category: category,
                  service: item,
                })
              }
            />
          )}
        /> */}
      </SafeAreaView>
    </>
  );
};

export default CatServiceScreen;

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
  formWrapper: {
    color: COLORS.light.primary,
    fontSize: wp(15),
    lineHeight: hp(25),
    textDecorationLine: "underline",
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
  },
  formWrapperTitle: {
    textAlign: "left",
  },
  links: {
    marginVertical: 10,
    flexDirection: "row",
  },
  linkText: {
    color: COLORS.light.primary,
    textDecorationLine: "underline",
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    marginLeft: wp(10),
  },
  dataWrapper: {
    width: widthPercentageToDP("90"),
    backgroundColor: COLORS.light.splashscreenbg,
    padding: wp(10),
    paddingLeft: wp(12),
    borderRadius: 8,
    marginTop: hp(10),
    borderColor: COLORS.light.lightpurple,
    borderWidth: 0.2,
    marginBottom: hp(10),
  },
});
