import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "../../../../navigation/MainNavigator";
import { ROUTES } from "../../../../navigation/Routes";
import COLORS from "../../../../utils/Colors";
import { wp, hp } from "../../../../utils/Dimensions";
import { Input } from "@ui-kitten/components";
import NavBar from "../../../../components/NavBar";
import PLButton from "../../../../components/PLButton/PLButton";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode, Country, CallingCode } from "../../../../types";
import { PLTextInput } from "../../../../components/PLTextInput/PLTextInput";
import { states } from "../../../../utils/nigerianStates";
import { Picker, Form, Icon } from "native-base";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_GET_STARTED_SCREEN
>;

const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const AuthGetStarted = ({ navigation }: Props) => {
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [country, setCountry] = useState<Country>();
  const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(
    false
  );
  const [callingCode, setCallingCode] = useState<CallingCode[]>(["234"]);

  const [withFlag, setWithFlag] = useState<boolean>(true);
  const [withEmoji, setWithEmoji] = useState<boolean>(true);
  const [withFilter, setWithFilter] = useState<boolean>(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(true);
  const [withCallingCode, setWithCallingCode] = useState<boolean>(true);
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setCallingCode(country.callingCode);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavBar
        onPress={() => {
          navigation.navigate(ROUTES.SERVICE_PROVIDER_CATEGORY_SELECTOR);
        }}
        navText="Sign Up"
      />
      <View style={styles.contentWraper}>
        <Text style={styles.welcomeMessage}>
          Welcome to Pocket Lawyer! To create an account, please enter your
          <Text style={styles.CompanyDetails}> personal details.</Text>
        </Text>

        <View>
          <Text style={styles.inputText}>First Name</Text>
          <PLTextInput
            textContentType="name"
            style={styles.input}
            placeholder="Type your first name"
          />
        </View>

        <View>
          <Text style={styles.inputText}>Last Name</Text>
          <PLTextInput
            textContentType="familyName"
            style={styles.input}
            placeholder="Type your last name"
          />
        </View>

        <View>
          <Text style={styles.inputText}>Email Address</Text>
          <PLTextInput
            style={styles.input}
            placeholder="Type your email address"
            textContentType="emailAddress"
          />
        </View>

        <View>
          <Text style={styles.inputText}>Supreme Court Number</Text>
          <PLTextInput
            textContentType="none"
            style={styles.input}
            placeholder="Type your supreme court number"
          />
        </View>

        <View style={styles.stateWrapper}>
          <View>
            <Text style={styles.inputText}>State</Text>
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
                placeholder="Select State"
                placeholderStyle={{
                  color: COLORS.light.darkgrey,
                  fontFamily: "Roboto-Regular",
                  fontSize: 12,
                }}
                placeholderIconColor={COLORS.light.darkgrey}
                style={styles.city}
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
            <Text style={styles.inputText}>City</Text>
            <PLTextInput
              style={[styles.input, styles.city]}
              placeholder="Enter City"
              textContentType="none"
            />
          </View>
        </View>

        <PLButton
          style={styles.plButton}
          textColor={COLORS.light.white}
          btnText={"Next"}
          onClick={() => navigation.navigate(ROUTES.AUTH_PASSWORD_LAWYER)}
        />
        <View style={styles.loginWrapper}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Roboto-Regular",
              fontSize: wp(14),
              color: COLORS.light.black,
            }}
          >
            By signing up, you agree with the
            <Text style={styles.login}> Terms of services </Text>and{" "}
            <Text style={styles.login}>Privacy policy </Text>
          </Text>
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
  stateWrapper: {
    width: wp(334),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  city: {
    width: wp(156),
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0.5,
    borderRadius: 4,
    height: wp(40),
    paddingRight: wp(4),
  },
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(20),
    textAlign: "left",
    color: COLORS.light.black,

    marginBottom: hp(39),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(38),
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  inputPhoneNumber: {
    width: wp(230),
    height: wp(40),
    borderRadius: 0,
    backgroundColor: COLORS.light.white,
    borderLeftWidth: 0,
    borderColor: "#fff",
  },

  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    color: COLORS.light.darkgrey,
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
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
  },
  plButton: {
    marginTop: hp(31),
  },

  phoneNumberWrapper: {
    width: wpercent("90%"),
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-between",
    borderRadius: 4,
    borderColor: COLORS.light.textinputborder,
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
    borderRightColor: COLORS.light.textinputborder,
    paddingLeft: wpercent("2%"),
    width: wpercent("26%"),
  },
  CompanyDetails: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: hp(20),
    color: COLORS.light.primary,
  },
});

export default AuthGetStarted;
