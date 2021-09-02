/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {
  widthPercentageToDP,
  widthPercentageToDP as wpercent,
} from "react-native-responsive-screen";
import {RootStackParamList} from "navigation/MainNavigator";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton.component";
import {Entypo} from "@expo/vector-icons";
import {CountryCode, Country, CallingCode} from "../../../../types";
import {PLTextInput} from "components/PLTextInput/PLTextInput.component";
import {states} from "utils/nigerianStates";
import {BottomSheet, ListItem} from "react-native-elements";
import {lawyerPayload} from "navigation/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import globalStyles from "css/GlobalCss";
import InputValidation from "utils/InputValidation";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_GET_STARTED_SCREEN
>;

const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return {value, onChangeText: setValue};
};

const AuthGetStarted = ({navigation}: Props) => {
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

  const [previous, setPrevious] = useState<any>("");

  useEffect(() => {
    if (previous === "") {
      AsyncStorage.getItem("previousPath").then((res) => {
        setPrevious(res);
      });
    } else {
      return;
    }
  }, [previous]);

  //--> state values
  const [firstName, setFirstName] = useState("");
  const [statePlaceholder, setStatePlaceholder] = useState(0);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Select State");
  const {hasWhiteSpace} = InputValidation;

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
      hasWhiteSpace(lastName.trim()) ||
      hasWhiteSpace(firstName.trim()) ||
      firstName === "" ||
      lastName === "" ||
      city === "" ||
      state === ""
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [firstName, lastName, email, city, state]);

  //--> disabling button
  const [disabled, setDisabled] = useState<boolean>(true);

  //-->  data for bottom sheet
  const list = [
    {
      title: "Cancel",
      containerStyle: {
        backgroundColor: COLORS.light.primary,
      },
      titleStyle: {color: "white"},
      onPress: () => setIsVisible(false),
    },
  ];

  const register = async (lawyerPayload: lawyerPayload) => {
    try {
      //--> setting async stoarage data for usage later
      await AsyncStorage.setItem(
        "lawyerPayload",
        JSON.stringify(lawyerPayload),
      );
      const previousPath = await AsyncStorage.getItem("previousPath");

      //--> making sure we dont set a new previous path when navigating as a
      //--> law firm
      if (previousPath !== "lawfirm") {
        await AsyncStorage.setItem("previousPath", "solicitor");
        await AsyncStorage.setItem("@email", email);
      }

      setTimeout(() => {
        navigation.navigate(ROUTES.AUTH_SIGN_UP_SECTION_TWO_LAWYER);
      }, 1000);
    } catch (error) {
      //-->return the error
      return;
    }
  };

  //->> trying out generics with typescript --- ignore ---
  // const f = <T,>(arg: T): T => {
  //   return arg;
  // };
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
        enableOnAndroid={true}>
        <View style={styles.contentWraper}>
          <Text style={styles.welcomeMessage}>
            {previous === "lawfirm" ? (
              <>
                Please add details of a
                <Text style={styles.CompanyDetails}> contact person </Text>
                for your company.
              </>
            ) : (
              <>
                Welcome to Pocket Lawyer. To create an account, please enter
                your
                <Text style={styles.CompanyDetails}>
                  &nbsp; personal details.
                </Text>
              </>
            )}
          </Text>

          <View>
            <PLTextInput
              onChangeText={setFirstName}
              labelText="First Name"
              labelTextRequired={true}
              error={false}
              name="FirstName"
              textContentType="givenName"
              style={styles.input}
              placeholder="Type your first name"
            />
            {hasWhiteSpace(firstName.trim()) ? (
              <Text
                style={{
                  color: "red",
                  fontSize: wp(10),
                  fontFamily: "HK-SemiBold",
                }}>
                *Invalid First Name
              </Text>
            ) : null}
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
            {hasWhiteSpace(lastName.trim()) ? (
              <Text
                style={{
                  color: "red",
                  fontSize: wp(10),
                  fontFamily: "HK-SemiBold",
                }}>
                *Invalid Last Name
              </Text>
            ) : null}
          </View>

          <View>
            <PLTextInput
              onChangeText={setEmail}
              labelText="Email Address"
              labelTextRequired={true}
              error={false}
              autoCapitalize="none"
              name="EmailAddress"
              style={styles.input}
              placeholder="Type your email address"
              textContentType="emailAddress"
            />
          </View>

          <View style={{marginTop: wp(4)}}>
            <Text style={styles.inputText}>
              State <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.stateView}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                }}>
                <View style={styles.rowCenter}>
                  <View style={{width: wp(300)}}>
                    <Text
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        marginLeft: wp(16),
                        fontSize: wp(14),
                        fontFamily: "Roboto-Medium",
                        color:
                          statePlaceholder === 0
                            ? COLORS.light.darkgrey
                            : COLORS.light.black,
                      }}>
                      {state}
                    </Text>
                  </View>
                  <View style={styles.arrowContainer}>
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
              containerStyle={{backgroundColor: COLORS.light.primary}}>
              {states.map((l, i) => (
                <ListItem
                  key={i}
                  onPress={() => {
                    setState(l.state);
                  }}>
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
                  onPress={l.onPress}>
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
                userType: 3, //ignore this value
                address: `${city},${state}`,
              };
              register(payload);
            }}
          />
          <View style={styles.loginWrapper}>
            <Text style={styles.signUpText}>
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

  inputText: {
    fontFamily: "HK-SemiBold",
    fontSize: wp(16),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(4),
    marginTop: hp(4),
  },

  plButton: {
    marginTop: hp(80),
    width: widthPercentageToDP("90%"),
  },

  loginWrapper: {
    flexDirection: "row",
    width: wpercent("80%"),
    justifyContent: "space-around",
    marginTop: hp(6),
    marginBottom: hp(14),
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    letterSpacing: 0,
    color: COLORS.light.lightpurple,
  },
  arrowContainer: {
    width: wp(30),
    alignItems: "flex-end",
  },
  stateView: {
    borderWidth: 1,
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    borderColor: COLORS.light.textinputborder,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  CompanyDetails: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    color: COLORS.light.primary,
  },
  signUpText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    lineHeight: wp(20),
    color: COLORS.light.black,
  },
  required: {
    color: "red",
  },
});

export default AuthGetStarted;
