/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from "react";
import {View, StyleSheet, SafeAreaView, Text} from "react-native";
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
import {FontAwesome} from "@expo/vector-icons";
import {PLPasswordInput} from "components/PLPasswordInput/PLPasswordInput.component";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "utils/axiosClient";
import {RegisterInterface} from "navigation/interfaces";
import {PLToast} from "components/PLToast/index.component";
import {CountryCode, Country, CallingCode} from "types";
import CountryPicker from "react-native-country-picker-modal";
import {Input} from "@ui-kitten/components";
import {PLTextInput} from "components/PLTextInput/PLTextInput.component";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import globalStyles from "css/GlobalCss";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const AuthGetStarted = ({navigation, route}: Props) => {
  //--> state values for the section
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [destination, setDestination] = useState("");

  //--> country component info
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

  //--> state from the other screen
  const [initialState, setInitialState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: 1,
    password: "",
    address: "",
    phone: "",
    dob: "",
    SuppremeCourtNumber: "",
  });

  const [lawfirmState, setLawFirmState] = useState({
    firstpayload: {
      address: "",
      email: "",
      firstName: "",
      lastName: "",
      userType: 0,
    },
    secondpayload: {
      address: "",
      companyName: "",
      email: "",
      officeaddress: "",
      userType: 3,
    },
  });
  const [initialload, setInitialLoad] = useState(0);

  //--> loading state of the page
  const [isLoading, setIsLoading] = useState(false);

  //--> Next button disabled state
  const [isDisabled, setIsDisabled] = useState(true);

  //--> setting the previous path
  const [previous, setPrevious] = useState<any>("");

  //--> check the state of the input forms and enable the button when all fields are complete
  React.useEffect(() => {
    if (previous === "") {
      AsyncStorage.getItem("previousPath").then((res) => {
        setPrevious(res);
      });
    } else if (previous === "lawfirm") {
      if (
        phonenumber.length === 0 ||
        password.length === 0 ||
        destination.length === 0 ||
        password.length < 8
      ) {
        setIsDisabled(true);
        return;
      } else {
        setIsDisabled(false);
      }
    } else {
      if (
        phonenumber.length === 0 ||
        password.length === 0 ||
        password.length < 8
      ) {
        setIsDisabled(true);
        return;
      } else {
        setIsDisabled(false);
      }
    }
  }, [phonenumber, password, previous, destination]);

  //--> make api call for registration
  React.useEffect(() => {
    if (initialload === 0) {
      return;
    } else {
      //---> payload to be sent to the backend
      //--> solicitors payload
      const solicitorPayload = {
        firstName: initialState.firstName,
        lastName: initialState.lastName,
        email: initialState.email,
        userType: 4,
        password: password,
        address: initialState.address,
        phone: phonenumber,
        dob: "2/1/20",
      };

      //--> lawyers payload
      const individualPayload = {
        ...solicitorPayload,
        SuppremeCourtNumber: initialState.SuppremeCourtNumber,
        userType: 3,
      };

      //--> contact person information
      const {email, firstName, lastName} = lawfirmState.firstpayload;

      //--> company information
      const {
        companyName,
        email: companyEmail,
        officeaddress,
      } = lawfirmState.secondpayload;

      const lawfirmPayload = {
        email: email,
        userType: 5,
        password: password,
        address: officeaddress,
        phone: phonenumber,
        company: {
          name: companyName,
          CompanyType: 1,
          ContactFirstName: firstName,
          ContactLastName: lastName,
          ContactEmail: companyEmail,
          ContactPhone: phonenumber,
        },
      };

      callRegister(individualPayload, solicitorPayload, lawfirmPayload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialState.SuppremeCourtNumber,
    initialState.address,
    initialState.email,
    initialState.firstName,
    initialState.lastName,
    initialload,
    lawfirmState,
    password,
    phonenumber,
  ]);

  //--> explicit interfaces to be configured later
  const callRegister = async (
    individualPayload: any,
    solicitorPayload: any,
    lawfirmPayload: any,
  ) => {
    try {
      const previousPath = await AsyncStorage.getItem("previousPath");

      if (previousPath === "solicitor") {
        register(solicitorPayload);
      } else if (previousPath === "lawfirm") {
        register(lawfirmPayload);
      } else {
        register(individualPayload);
      }
    } catch (error) {
      return error;
    }
  };

  const register = async (Payload: RegisterInterface) => {
    setIsLoading(true);

    try {
      const {data} = await axiosClient.post("User", Payload);

      setIsLoading(false);
      PLToast({message: "Successfully Registered", type: "success"});

      //--> setting async stoarage data for usage later
      const {token} = data.data;
      const {userType} = data.data;
      const {userID} = data.data;
      const {firstName} = data.data;

      if (userType === 5) {
        const {contactFirstName} = data.data.company;
        await AsyncStorage.setItem("firstName", contactFirstName);
      } else {
        await AsyncStorage.setItem("firstName", firstName);
      }
      navigation.navigate(ROUTES.AUTH_VALIDATE_EMAIL);
      //--> setting the received token in local storage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userType", JSON.stringify(userType));
      await AsyncStorage.setItem("userID", JSON.stringify(userID));
      await AsyncStorage.setItem("@email", Payload.email);

      //--> setting lawyer as the prvios path
      // await AsyncStorage.setItem("previousPath", "barrister");
    } catch (error: any) {
      const {message} = error?.response.data;
      PLToast({message: message, type: "error"});
      setIsLoading(false);
      setIsDisabled(true);
      return;
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <KeyboardAwareScrollView
        extraScrollHeight={wp(100)}
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        contentContainerStyle={styles.container}>
        <NavBar
          onPress={() => {
            navigation.goBack();
          }}
          navText="Complete Account Setup"
        />
        <Animatable.View animation="fadeIn" style={styles.contentWraper}>
          <Text style={styles.welcomeMessage}>
            Complete your account setup.
          </Text>

          <View style={styles.inputBMargins}>
            <Text style={styles.inputText}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneNumberWrapper}>
              <View style={styles.countryPickerWrapper}>
                <CountryPicker
                  {...{
                    countryCode,
                    withFilter,
                    withFlag,
                    withCountryNameButton,
                    withAlphaFilter,
                    withCallingCode,
                    withEmoji,
                    onSelect,
                  }}
                />
                {/* <Text style={styles.codeText}>+{callingCode}</Text> */}
              </View>

              <Input
                maxLength={11}
                style={styles.inputPhoneNumber}
                onChangeText={setPhonenumber}
                value={phonenumber}
                textStyle={styles.textStyle}
                placeholder="906 3782 2828"
                textContentType="telephoneNumber"
                keyboardType="numeric"
                returnKeyType="next"
                placeholderTextColor={COLORS.light.darkgrey}
              />
            </View>
          </View>

          {previous === "lawfirm" && (
            <View style={styles.inputBMargins}>
              <PLTextInput
                onChangeText={setDestination}
                labelText="Designation of Contact Person"
                labelTextRequired={true}
                error={false}
                name="Designation"
                textContentType="jobTitle"
                style={styles.input}
                placeholder="Type the job designation"
              />
            </View>
          )}

          <View style={styles.inputBMargins}>
            <Text style={styles.inputText}>
              Password <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneNumberWrapper}>
              <PLPasswordInput
                placeholder="Create your Password"
                onChangeText={setPassword}
              />
            </View>
            {password.length < 8 && password.length > 0 ? (
              <Text
                style={{
                  color: "red",
                  fontSize: wp(10),
                  fontFamily: "HK-SemiBold",
                }}>
                *At least 8 Characters
              </Text>
            ) : null}
          </View>

          <View style={styles.carouselWrapper}>
            <View style={styles.carouselIcon}>
              <FontAwesome
                name="circle"
                size={12}
                color={COLORS.light.primary}
              />
              <FontAwesome
                name="circle"
                size={12}
                color={COLORS.light.primary}
              />
            </View>
          </View>

          <PLButton
            disabled={isDisabled}
            isLoading={isLoading}
            loadingText="Submitting..."
            style={styles.plButton}
            textColor={COLORS.light.white}
            btnText={"Next"}
            onClick={() => {
              //--> reading async storage value
              const getData = async () => {
                try {
                  const jsonValue = await AsyncStorage.getItem("lawyerPayload");
                  const lawfirmPayload = await AsyncStorage.getItem(
                    "lawfirmPayload",
                  );

                  const previousPath = await AsyncStorage.getItem(
                    "previousPath",
                  );

                  if (previousPath === "lawfirm") {
                    jsonValue && lawfirmPayload != null
                      ? setLawFirmState({
                          firstpayload: JSON.parse(jsonValue),
                          secondpayload: JSON.parse(lawfirmPayload),
                        })
                      : null;
                  }

                  jsonValue != null
                    ? setInitialState(JSON.parse(jsonValue))
                    : null;

                  setInitialLoad(initialload + 1);
                } catch (e) {
                  //--> error reading value
                }
              };

              getData();
            }}
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
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.light.white,
  },
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(16),
    lineHeight: hp(27),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(19),
    width: wpercent("90%"),
  },

  signUpText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    color: COLORS.light.black,
    lineHeight: hp(20),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(18),
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  textStyle: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(13),
    color: COLORS.light.black,
  },

  inputText: {
    fontFamily: "HK-SemiBold",
    fontSize: wp(16),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(4),
    marginTop: hp(12),
  },

  plButton: {
    marginTop: hp(31),
    width: widthPercentageToDP("90%"),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(140),
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
    height: wp(42),
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
    letterSpacing: 0,
    color: COLORS.light.lightpurple,
  },
  countryPickerWrapper: {
    maxHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.light.textinputborder,
    paddingLeft: wpercent("1%"),
    width: "16%",
    borderWidth: 1,
    borderRadius: 4,
  },
  required: {
    color: "red",
  },
  inputPhoneNumber: {
    width: "82%",
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    color: COLORS.light.black,
    borderWidth: 1,
    height: wp(30),
  },
  inputBMargins: {
    marginBottom: wp(10),
  },
});

export default AuthGetStarted;
