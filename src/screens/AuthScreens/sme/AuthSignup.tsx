import React, {useState} from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {widthPercentageToDP as wpercent} from "react-native-responsive-screen";
import {RootStackParamList} from "navigation/MainNavigator";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton.component";
import {Entypo} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import {CountryCode, Country, CallingCode} from "../../../types";
import {PLTextInput} from "components/PLTextInput/PLTextInput.component";
import {states} from "utils/nigerianStates";
import {PLPasswordInput} from "components/PLPasswordInput/PLPasswordInput.component";
import * as Animatable from "react-native-animatable";
import {ScrollView} from "react-native-gesture-handler";
import {smeSignupSectionOne} from "navigation/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BottomSheet, ListItem} from "react-native-elements";
import globalStyles from "css/GlobalCss";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

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
  const [selectedstate, setSelectedState] = useState<string>("");
  const [selectedBusinessCategory, setSelectedBusinessCategory] =
    useState<string>("");

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setCallingCode(country.callingCode);
  };

  //--> state values
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("Select your location");
  const [statePlaceholder, setStatePlaceholder] = useState(0);
  const [city, setCity] = useState("");
  const [business, setBusiness] = useState("Select your business category");
  const [stateBusinessPlaceholder, setBusinessStatePlaceholder] = useState(0);
  const [password, setPassword] = useState("");

  //--> state  for bottom sheet
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleBusiness, setIsVisibleBusiness] = useState<boolean>(false);

  //-->  data for bottom sheet
  const Statelist = [
    {
      title: "Cancel",
      containerStyle: {
        backgroundColor: COLORS.light.primary,
      },
      titleStyle: {color: "white"},
      onPress: () => setIsVisible(false),
    },
  ];

  const Businesslist = [
    {
      title: "Cancel",
      containerStyle: {
        backgroundColor: COLORS.light.primary,
      },
      titleStyle: {color: "white"},
      onPress: () => setIsVisibleBusiness(false),
    },
  ];
  //--> disabling button
  const [disabled, setDisabled] = useState<boolean>(true);
  //--> check to ensure all values are filled and enable button
  React.useEffect(() => {
    //--> check if the payload has be completely filled
    if (
      email === "" ||
      company === "" ||
      state === "" ||
      business === "" ||
      password === "" ||
      city === ""
    ) {
      setDisabled(true);
      return;
    } else {
      setDisabled(false);
    }
  }, [company, state, email, business, password, city]);

  //--> creating payload and saving to async
  const onClick = () => {
    const Payload = {
      email: email,
      userType: 2,
      password: password,
      address: `${city},${state}`,
      company: {
        name: company,
        CompanyType: 1,
      },
    };
    //-->  saving payload to local staorage
    const storeData = async (Payload: smeSignupSectionOne) => {
      try {
        await AsyncStorage.setItem("@signup_payload", JSON.stringify(Payload));
        await AsyncStorage.setItem("@email", email);
        navigation.navigate(ROUTES.AUTH_SIGN_UP_SECTION_TWO_SME);
      } catch (e) {
        //-->  saving error
      }
    };

    storeData(Payload);
  };

  React.useEffect(() => {
    if (state === "Select your location") {
      return;
    }
    setIsVisible(false);
    setStatePlaceholder(statePlaceholder + 1);
  }, [state]);

  React.useEffect(() => {
    if (business === "Select your business category") {
      return;
    }
    setIsVisibleBusiness(false);
    setBusinessStatePlaceholder(statePlaceholder + 1);
  }, [business]);

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <NavBar
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_SELECT_CATEGORY);
        }}
        navText="Sign Up"
      />

      <KeyboardAwareScrollView
        extraScrollHeight={wp(120)}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        enableOnAndroid={true}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Animatable.View animation="fadeIn" style={styles.contentWraper}>
          <View style={styles.TextWrapper}>
            <Text style={styles.welcomeMessage}>
              Welcome to Pocket Lawyer. To create an account, please enter your
              <Text style={styles.CompanyDetails}> company details.</Text>
            </Text>
          </View>

          <View>
            <PLTextInput
              labelText="Name of Company"
              onChangeText={setCompany}
              labelTextRequired={true}
              textContentType="name"
              style={styles.input}
              placeholder="Type the name of your company"
            />
          </View>

          <View>
            <PLTextInput
              labelText="Email Address"
              labelTextRequired={true}
              onChangeText={setEmail}
              autoCapitalize="none"
              style={styles.input}
              placeholder="Type your company’s email address"
              textContentType="emailAddress"
            />
          </View>

          <View>
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
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <View style={{width: wp(300)}}>
                    <Text
                      style={{
                        marginLeft: wp(16),
                        fontSize: wp(12),
                        fontFamily: "Roboto-Medium",
                        color:
                          statePlaceholder === 0
                            ? COLORS.light.darkgrey
                            : COLORS.light.black,
                      }}>
                      {state}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp(30),
                      alignItems: "flex-end",
                    }}>
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
              {Statelist.map((l, i) => (
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
            <PLTextInput
              labelText="City"
              onChangeText={setCity}
              labelTextRequired={true}
              style={[styles.input, styles.city]}
              placeholder="Enter City"
              textContentType="none"
            />
          </View>

          <View>
            <Text style={styles.inputText}>
              Nature of Business <Text style={styles.required}>*</Text>
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
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleBusiness(true);
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <View style={{width: wp(300)}}>
                    <Text
                      style={{
                        marginLeft: wp(16),
                        fontSize: wp(14),
                        fontFamily: "Roboto-Medium",
                        color:
                          stateBusinessPlaceholder === 0
                            ? COLORS.light.darkgrey
                            : COLORS.light.black,
                      }}>
                      {state}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp(30),
                      alignItems: "flex-end",
                    }}>
                    <Entypo name="chevron-small-down" size={20} color="grey" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <BottomSheet
              modalProps={{
                visible: isVisibleBusiness,
                statusBarTranslucent: true,
              }}
              isVisible={isVisibleBusiness}
              containerStyle={{backgroundColor: COLORS.light.primary}}>
              {states.map((l, i) => (
                <ListItem
                  key={i}
                  onPress={() => {
                    setBusiness(l.state);
                  }}>
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text>{l.state}</Text>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
              {Businesslist.map((l, i) => (
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

          <View>
            <Text style={styles.inputText}>
              Password <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneNumberWrapper}>
              <PLPasswordInput
                placeholder="Create your Password"
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View style={styles.carouselWrapper}>
            <View style={styles.carouselIcon}>
              <FontAwesome
                name="circle"
                size={12}
                color={COLORS.light.primary}
              />
              <Entypo name="circle" size={10} color={COLORS.light.primary} />
            </View>
          </View>

          <PLButton
            disabled={disabled}
            style={styles.plButton}
            textColor={COLORS.light.white}
            btnText={"Next"}
            onClick={onClick}
          />
          <View style={styles.loginWrapper}>
            <Text style={styles.signUpText}>
              By signing up, you agree with the
              <Text style={styles.login}> Terms of services </Text>and{" "}
              <Text style={styles.login}>Privacy policy </Text>
            </Text>
          </View>
        </Animatable.View>
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
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(27),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(8),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: hp(15),
  },
  signUpText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    color: COLORS.light.black,
    lineHeight: hp(14),
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  city: {
    width: wp(334),
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0.5,
    borderRadius: 4,
    height: wp(40),
    paddingRight: wp(4),
  },
  TextWrapper: {
    width: wpercent("90%"),
  },
  business: {
    width: wp(334),
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0.5,
    borderRadius: 4,
    height: wp(40),
    paddingRight: wp(4),
  },
  inputPhoneNumber: {
    width: wp(230),
    height: wp(40),
    borderRadius: 0,
    backgroundColor: COLORS.light.white,
    borderLeftWidth: 0,
    borderColor: "#fff",
  },
  stateWrapper: {
    width: wp(334),
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: hp(12),
  },
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
  },
  plButton: {
    marginTop: hp(10),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(10),
    width: wpercent("90%"),
  },
  carouselIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wpercent("7%"),
  },
  phoneNumberWrapper: {
    width: wpercent("90%"),
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
  },
  loginWrapper: {
    flexDirection: "row",
    width: wpercent("80%"),
    justifyContent: "space-around",
    marginTop: hp(12),
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    lineHeight: hp(14),
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
    // lineHeight: hp(20),
    color: COLORS.light.primary,
  },
  required: {
    color: "red",
  },
});

export default AuthGetStarted;
