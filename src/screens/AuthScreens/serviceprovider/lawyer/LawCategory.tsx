import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  Platform,
  Image,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "../../../../navigation/MainNavigator";
import { ROUTES } from "../../../../navigation/Routes";
import COLORS from "../../../../utils/Colors";
import { wp, hp } from "../../../../utils/Dimensions";
import NavBar from "../../../../components/NavBar";
import PLButton from "../../../../components/PLButton/PLButton";
import { PLPasswordInput } from "../../../../components/PLPasswordInput/PLPasswordInput";
import { PLTextInput } from "../../../../components/PLTextInput/PLTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PLModal } from "../../../../components/PLModal";
import { states } from "../../../../utils/nigerianStates";
import { Picker, Form, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Radio, RadioGroup } from "@ui-kitten/components";
import * as Animatable from "react-native-animatable";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const AuthGetStarted = ({ navigation }: Props) => {
  const [visible, setVisible] = React.useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const selectCategory = () => {
    if (selectedIndex === 0) {
      navigation.navigate(ROUTES.AUTH_SIGN_UP);
    } else if (selectedIndex === 1) {
      navigation.navigate(ROUTES.AUTH_SIGN_UP_SME);
    } else {
      navigation.navigate(ROUTES.SERVICE_PROVIDER_CATEGORY_SELECTOR);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavBar
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_PROFILE_IMAGE_LAWYER);
        }}
        navText="Select your category of law"
      />

      <Animatable.View
        animation="fadeIn"
        easing="ease-in"
        style={styles.radiobtnFirstWrapper}
      >
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={(index) => setSelectedIndex(index)}
        >
          <Radio style={styles.radioBtn}>Pre-Incorporation</Radio>
          <Radio style={styles.radioBtn}>Company Secretarial Services</Radio>
          <Radio style={styles.radioBtn}>Post-Incorporation</Radio>
          <Radio style={styles.radioBtn}>Review of Legal Documents</Radio>
          <Radio style={styles.radioBtn}>Legal Advice and Consultancy</Radio>
          <Radio style={styles.radioBtn}>Legal Drafting</Radio>
        </RadioGroup>
      </Animatable.View>

      <View style={styles.contentWraper}>
        <View style={styles.carouselWrapper}>
          <View style={styles.carouselIcon}>
            <FontAwesome name="circle" size={12} color={COLORS.light.primary} />
            <FontAwesome name="circle" size={12} color={COLORS.light.primary} />
            <FontAwesome name="circle" size={12} color={COLORS.light.primary} />
          </View>
        </View>

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() =>
              navigation.navigate(ROUTES.AUTH_LOGIN_CATEGORY_SELECTOR)
            }
          >
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>

          <PLButton
            style={styles.nextButton}
            textColor={COLORS.light.white}
            btnText={"Submit"}
            onClick={() => navigation.navigate(ROUTES.AUTH_LAW_CATEGORY_LAWYER)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.light.white,
  },
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(20),
    textAlign: "center",
    alignSelf: "flex-start",
    color: COLORS.light.black,
    marginBottom: hp(39),
    width: wpercent("90%"),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(43),
  },
  educationDetails: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: hp(20),
    color: COLORS.light.primary,
  },
  radiobtnFirstWrapper: {
    width: wp(335),
    justifyContent: "center",
    marginTop: hp(43),
  },
  radioBtn: {
    borderRadius: 7,
    height: hp(60),
    paddingLeft: wp(20),
    marginTop: hp(14),
    backgroundColor: COLORS.light.checkpurple,
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    borderColor: COLORS.light.textinputborder,
  },
  inputButton: {
    height: hp(138),
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.light.imageinputborder,
    justifyContent: "center",
    paddingLeft: wp(20),
    paddingRight: wp(20),
    alignItems: "center",
    width: wp(157),
    borderStyle: "dashed",
    backgroundColor: COLORS.light.imageinputbg,
  },
  fileSelectBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(71),
  },
  selectText: {
    color: COLORS.light.primary,
    fontSize: 12,
    marginTop: hp(12),
    fontFamily: "Roboto-Medium",
  },
  resetPasswordInput: {
    width: wp(300),
    height: wp(40),
    marginTop: wp(20),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  verifyEmail: {
    fontFamily: "Roboto-MediumItalic",
  },
  resetPasswordText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    color: COLORS.light.black,
    textAlign: "center",
  },
  resetPasswordBtn: {
    marginTop: wp(40),
    width: wp(300),
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    color: COLORS.light.darkgrey,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(21),
    width: wpercent("90%"),
  },
  skipButton: {
    width: wp(156),
    backgroundColor: COLORS.light.white,
    borderRadius: wp(7),
    borderWidth: 1,
    borderColor: COLORS.light.primary,
    height: hp(44),
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: COLORS.light.primaryLight,
    shadowOpacity: 0.2,
  },
  skip: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: wp(16),
    color: COLORS.light.primary,
  },
  nextButton: {
    width: wp(156),
    borderRadius: wp(7),
  },

  inputText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(12),
    marginTop: hp(12),
  },
  forgotPassword: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.lightpurple,
    textAlign: "right",
    fontSize: wp(12),
    marginTop: wp(8),
  },
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
  },
  plButton: {
    // marginTop: hp(390),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: wpercent("90%"),
  },
  identification: {
    width: wp(334),
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0.5,
    borderRadius: 4,
    height: wp(40),
    paddingRight: wp(4),
  },
  carouselIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wpercent("11%"),
  },
  phoneNumberWrapper: {
    width: wpercent("90%"),
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-between",
    borderRadius: 4,
    borderColor: "#f0f0f0",
  },
  loginWrapper: {
    flexDirection: "row",
    width: wpercent("80%"),
    justifyContent: "space-around",
    marginTop: hp(12),
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: hp(16),
    letterSpacing: 0,
    color: COLORS.light.lightpurple,
  },
  countryPickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
    paddingLeft: wpercent("2%"),
    width: wpercent("26%"),
  },
});

export default AuthGetStarted;
