import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Alert } from "react-native";
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

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const AuthGetStarted = ({ navigation }: Props) => {
  const [visible, setVisible] = React.useState(false);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    console.log(result);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavBar
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_PASSWORD_LAWYER);
        }}
        navText="Create Password"
      />
      <View style={styles.contentWraper}>
        <Text style={styles.welcomeMessage}>
          <Text style={styles.verifyEmail}>
            An email has been sent to you to verify your email address.
          </Text>
          &nbsp; Kindly fill in your &nbsp;
          <Text style={styles.educationDetails}>education details </Text> to
          complete your profile as a lawyer.
        </Text>

        <View>
          <Text style={styles.inputText}>School</Text>
          <PLTextInput
            textContentType="none"
            style={styles.input}
            placeholder="Type the name of institution attended"
          />
        </View>

        <View>
          <Text style={styles.inputText}>CGPA</Text>
          <PLTextInput
            textContentType="none"
            style={styles.input}
            placeholder="Type your grade"
          />
        </View>

        <View>
          <Text style={styles.inputText}>Means of Identification</Text>
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={
                <Entypo
                  name="chevron-small-down"
                  size={24}
                  color={COLORS.light.black}
                />
              }
              placeholder="Select your means of identification"
              placeholderStyle={{
                color: COLORS.light.darkgrey,
                fontFamily: "Roboto-Regular",
                fontSize: 12,
              }}
              placeholderIconColor={COLORS.light.darkgrey}
              style={styles.identification}
            >
              {states.map(function (item) {
                return (
                  <Picker.Item
                    key={item.state}
                    label={item.state}
                    value={item.state}
                  />
                );
              })}
            </Picker>
          </Form>
        </View>

        <View>
          <Text style={styles.inputText}>ID Number</Text>
          <PLTextInput
            textContentType="none"
            style={styles.input}
            placeholder="Type identification number"
          />
        </View>

        <View style={styles.fileSelectBox}>
          <Text style={styles.inputText}>Resume</Text>
          <TouchableOpacity onPress={pickDocument} style={styles.inputButton}>
            <Text style={styles.selectText}>Select from files</Text>
            <FontAwesome
              name="file-pdf-o"
              size={14}
              color={COLORS.light.black}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.carouselWrapper}>
          <View style={styles.carouselIcon}>
            <FontAwesome name="circle" size={12} color={COLORS.light.primary} />
            <Entypo name="circle" size={10} color={COLORS.light.primary} />
            <Entypo name="circle" size={10} color={COLORS.light.primary} />
          </View>
        </View>

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.skipButton}
            // onPress={() =>
            // //   navigation.navigate(ROUTES.AUTH_LOGIN_CATEGORY_SELECTOR)
            // }
          >
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>

          <PLButton
            style={styles.nextButton}
            textColor={COLORS.light.white}
            btnText={"Next"}
            onClick={() =>
              navigation.navigate(ROUTES.AUTH_PROFILE_IMAGE_LAWYER)
            }
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
    lineHeight: hp(27),
    textAlign: "left",
    alignSelf: "flex-start",
    color: COLORS.light.black,
    marginBottom: hp(20),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(28),
  },
  educationDetails: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: hp(20),
    color: COLORS.light.primary,
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    borderColor: COLORS.light.textinputborder,
  },
  inputButton: {
    flexDirection: "row",
    height: wp(40),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.light.textinputborder,
    justifyContent: "space-between",
    paddingLeft: wp(20),
    paddingRight: wp(20),
    alignItems: "center",
  },
  fileSelectBox: {
    width: "100%",
    justifyContent: "center",
  },
  selectText: {
    color: COLORS.light.darkgrey,
    fontSize: 12,
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
    height: wp(45),
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
    marginTop: hp(10),
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
    marginTop: hp(22),
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
