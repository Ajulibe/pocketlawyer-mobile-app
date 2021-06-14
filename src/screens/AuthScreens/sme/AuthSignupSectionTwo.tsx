import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "navigation/MainNavigator";
import { ROUTES } from "navigation/Routes";
import COLORS from "utils/Colors";
import { wp, hp } from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton";
import { FontAwesome } from "@expo/vector-icons";
import { PLTextInput } from "components/PLTextInput/PLTextInput";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode, Country, CallingCode } from "../../../types";
import { Input } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLToast } from "components/PLToast";
import { smeSignupSectionTwo } from "navigation/interfaces";
import axiosClient from "utils/axiosClient";
import globalStyles from "css/GlobalCss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorageUtil from "utils/AsyncStorageUtil";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

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
  const [lastName, setLastName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [designation, setDesignation] = useState("");

  //--> state from the other screen
  const [initialState, setInitialState] = useState({
    email: "",
    userType: 2,
    password: "",
    address: "",
    phone: "",
    company: {
      name: "",
      CompanyType: 1,
      ContactFirstName: "",
      ContactLastName: "",
      ContactEmail: "",
      ContactPhone: "",
    },
  });

  const [initialload, setInitialLoad] = useState(0);

  //--> loading state of the page
  const [isLoading, setIsLoading] = useState(false);

  //--> Next button disabled state
  const [isDisabled, setIsDisabled] = useState(true);

  //--> check the state of the input forms and enable the button when all fields are complete
  React.useEffect(() => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      phonenumber.length === 0 ||
      designation.length === 0
    ) {
      setIsDisabled(true);
      return;
    } else {
      setIsDisabled(false);
    }
  }, [firstName, lastName, phonenumber, designation]);

  //--> make api call for registration
  React.useEffect(() => {
    if (initialload === 0) {
      return;
    } else {
      //---> payload to be sent to the backend
      const smePayload = {
        email: initialState.email,
        userType: 2,
        password: initialState.password,
        address: initialState.password,
        phone: phonenumber,
        company: {
          name: initialState.company.name,
          CompanyType: 1,
          ContactFirstName: firstName,
          ContactLastName: lastName,
          ContactEmail: initialState.email,
          ContactPhone: phonenumber,
        },
      };

      register(smePayload);
    }
  }, [initialload]);

  const register = async (smePayload: smeSignupSectionTwo) => {
    setIsLoading(true);

    try {
      const { data } = await axiosClient.post("User", smePayload);
      setIsLoading(false);
      PLToast({ message: "Successfully Registered", type: "success" });

      //--> setting async stoarage data for usage later
      const { token } = data.data;
      const { userType } = data.data;
      const { userID } = data.data;

      //--> setting the received token in local storage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userType", JSON.stringify(userType));
      await AsyncStorageUtil.setUser(JSON.stringify(data));
      await AsyncStorage.setItem("userID", JSON.stringify(userID));
      await AsyncStorage.setItem("firstName", firstName);

      setTimeout(() => {
        navigation.navigate(ROUTES.AUTH_VALIDATE_EMAIL_SME);
      }, 1000);
    } catch (error: any) {
      const { message } = error?.response.data;
      // if (error.message === "Request failed with status code 400") {
      //   PLToast({ message: "Email already taken", type: "error" });
      // } else {
      setIsDisabled(true);
      setIsLoading(false);
      PLToast({ message: message, type: "error" });
    }

    return;
  };

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <NavBar
        onPress={() => {
          navigation.goBack();
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
          <View style={styles.TextWrapper}>
            <Text style={styles.welcomeMessage}>
              Please add details of a
              <Text style={styles.ContactPerson}> contact person</Text> for your
              company.
            </Text>
          </View>

          <View>
            <PLTextInput
              labelText="First Name"
              labelTextRequired={true}
              onChangeText={setFirstName}
              error={false}
              textContentType="name"
              style={styles.input}
              placeholder="Type your first name"
            />
          </View>

          <View>
            <PLTextInput
              labelText="Last Name"
              labelTextRequired={true}
              error={false}
              onChangeText={setLastName}
              textContentType="familyName"
              style={styles.input}
              placeholder="Type your last name"
            />
          </View>

          <View>
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
                style={styles.inputPhoneNumber}
                onChangeText={setPhonenumber}
                value={phonenumber}
                keyboardType="numeric"
                textStyle={styles.textStyle}
                placeholder="906 3782 2828"
                textContentType="telephoneNumber"
                placeholderTextColor={COLORS.light.darkgrey}
              />
            </View>
          </View>

          <View>
            <PLTextInput
              labelText="Designation"
              labelTextRequired={true}
              error={false}
              name="Email"
              onChangeText={setDesignation}
              style={styles.input}
              placeholder="Type the job designation"
              textContentType="none"
            />
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
                  const jsonValue = await AsyncStorage.getItem(
                    "@signup_payload"
                  );

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
  signUpText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(11),
    color: COLORS.light.black,
    lineHeight: hp(20),
  },
  TextWrapper: {
    width: wpercent("90%"),
  },
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(27),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(10),
    width: wpercent("90%"),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(25),
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
    fontFamily: "Roboto-Medium",
    fontSize: wp(13),
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
    marginTop: hp(20),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(110),
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
    borderColor: "red",
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
  ContactPerson: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    color: COLORS.light.primary,
  },
  inputPhoneNumber: {
    width: "82%",
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    color: COLORS.light.black,
    borderWidth: 1,
    height: wp(30),
  },
  required: {
    color: "red",
  },
});

export default AuthGetStarted;
