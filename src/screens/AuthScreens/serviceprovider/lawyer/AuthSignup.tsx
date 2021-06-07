import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "navigation/MainNavigator";
import { ROUTES } from "navigation/Routes";
import COLORS from "utils/Colors";
import { wp, hp } from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton";
import { Entypo } from "@expo/vector-icons";
import { CountryCode, Country, CallingCode } from "../../../../types";
import { PLTextInput } from "components/PLTextInput/PLTextInput";
import { states } from "utils/nigerianStates";
import { BottomSheet, ListItem } from "react-native-elements";
import { lawyerPayload } from "navigation/interfaces";
import axiosClient from "utils/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import globalStyles from "css/GlobalCss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  const [withCountryNameButton, setWithCountryNameButton] =
    useState<boolean>(false);
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

  //--> state values
  const [firstName, setFirstName] = useState("");
  const [statePlaceholder, setStatePlaceholder] = useState(0);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Select State");
  const [suppremecourtnumber, setSupremeCourtNumber] = useState("");

  //--> state  for bottom sheet
  const [isVisible, setIsVisible] = useState<boolean>(false);

  React.useEffect(() => {
    if (state === "Select State") {
      return;
    }
    setIsVisible(false);
    setStatePlaceholder(statePlaceholder + 1);
  }, [state]);

  //--> check to ensure all values are filled and enable button
  React.useEffect(() => {
    //--> check if the payload has be completely filled
    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      suppremecourtnumber === "" ||
      city === "" ||
      state === ""
    ) {
      setDisabled(true);
      return;
    } else {
      setDisabled(false);
    }
  }, [firstName, lastName, email, suppremecourtnumber, city, state]);

  //--> disabling button
  const [disabled, setDisabled] = useState<boolean>(true);

  //-->  data for bottom sheet
  const list = [
    {
      title: "Cancel",
      containerStyle: {
        backgroundColor: COLORS.light.primary,
      },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  const register = async (lawyerPayload: lawyerPayload) => {
    try {
      //--> setting async stoarage data for usage later
      await AsyncStorage.setItem(
        "lawyerPayload",
        JSON.stringify(lawyerPayload)
      );

      await AsyncStorage.setItem("previousPath", "lawyer");

      setTimeout(() => {
        navigation.navigate(ROUTES.AUTH_SIGN_UP_SECTION_TWO_LAWYER);
      }, 1000);
    } catch (error) {
      //-->return the error
      return;
    }
  };

  //->> trying out generics with typescript --- ignore ---
  const f = <T,>(arg: T): T => {
    return arg;
  };
  //--- ******* ---

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <NavBar
        onPress={() => {
          navigation.navigate(ROUTES.SERVICE_PROVIDER_CATEGORY_SELECTOR);
        }}
        navText="Sign Up"
      />

      <KeyboardAwareScrollView
        extraScrollHeight={wp(100)}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        enableOnAndroid={true}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.contentWraper}>
          <Text style={styles.welcomeMessage}>
            Welcome to Pocket Lawyer. To create an account, please enter your
            <Text style={styles.CompanyDetails}> personal details.</Text>
          </Text>

          <View>
            <PLTextInput
              onChangeText={setFirstName}
              labelText="First Name"
              labelTextRequired={true}
              error={false}
              name="FirstName"
              textContentType="name"
              style={styles.input}
              placeholder="Type your first name"
            />
          </View>

          <View>
            <PLTextInput
              onChangeText={setLastName}
              labelText="Last Name"
              labelTextRequired={true}
              error={false}
              name="LastName"
              textContentType="familyName"
              style={styles.input}
              placeholder="Type your last name"
            />
          </View>

          <View>
            <PLTextInput
              onChangeText={setEmail}
              labelText="Email Address"
              labelTextRequired={true}
              error={false}
              name="EmailAddress"
              style={styles.input}
              placeholder="Type your email address"
              textContentType="emailAddress"
            />
          </View>

          <View>
            <PLTextInput
              onChangeText={setSupremeCourtNumber}
              labelText="Supreme Court Number"
              labelTextRequired={true}
              error={false}
              name="SupremeCourtNumber"
              textContentType="none"
              style={styles.input}
              placeholder="Type your supreme court number"
            />
          </View>

          <View style={{ marginTop: wp(4) }}>
            <Text style={styles.inputText}>
              State <Text style={styles.required}>*</Text>
            </Text>
            <View
              style={{
                borderWidth: 1,
                width: wp(334),
                height: wp(40),
                borderRadius: 4,
                borderColor: COLORS.light.textinputborder,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ width: wp(300) }}>
                    <Text
                      style={{
                        marginLeft: wp(16),
                        fontSize: 12,
                        fontFamily: "Roboto-Regular",
                        color:
                          statePlaceholder === 0
                            ? COLORS.light.darkgrey
                            : COLORS.light.black,
                      }}
                    >
                      {state}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp(30),
                      alignItems: "flex-end",
                    }}
                  >
                    <Entypo name="chevron-small-down" size={20} color="grey" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <BottomSheet
              modalProps={{
                visible: isVisible,
                statusBarTranslucent: true,
              }}
              isVisible={isVisible}
              containerStyle={{ backgroundColor: COLORS.light.primary }}
            >
              {states.map((l, i) => (
                <ListItem
                  key={i}
                  onPress={() => {
                    setState(l.state);
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text>{l.state}</Text>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
              {list.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={l.containerStyle}
                  onPress={l.onPress}
                >
                  <ListItem.Content>
                    <ListItem.Title style={l.titleStyle}>
                      <Text>{l.title}</Text>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </BottomSheet>
          </View>

          <View style={styles.stateWrapper}>
            <View>
              <PLTextInput
                onChangeText={setCity}
                labelText="City"
                labelTextRequired={true}
                error={false}
                name="City"
                style={[styles.input, styles.city]}
                placeholder="Enter City"
                textContentType="none"
              />
            </View>
          </View>

          <PLButton
            disabled={disabled}
            style={styles.plButton}
            textColor={COLORS.light.white}
            btnText={"Next"}
            onClick={() => {
              const payload = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                userType: 3,
                address: `${city},${state}`,
                SuppremeCourtNumber: suppremecourtnumber,
              };
              register(payload);
            }}
          />
          <View style={styles.loginWrapper}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Roboto-Regular",
                fontSize: wp(11),
                color: COLORS.light.black,
              }}
            >
              By signing up, you agree with the
              <Text style={styles.login}> Terms of services </Text>and{" "}
              <Text style={styles.login}>Privacy policy </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
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
    width: wp(334),
    height: wp(40),
    paddingRight: wp(4),
  },
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(27),
    textAlign: "left",
    color: COLORS.light.black,
    width: "100%",
    marginBottom: hp(4),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(10),
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
    marginBottom: hp(4),
    marginTop: hp(4),
  },
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
  },
  plButton: {
    marginTop: hp(30),
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
    fontSize: wp(11),
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
    color: COLORS.light.primary,
  },
  required: {
    color: "red",
  },
});

export default AuthGetStarted;
