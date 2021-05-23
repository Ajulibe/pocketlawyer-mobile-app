import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "../../../navigation/MainNavigator";
import { ROUTES } from "../../../navigation/Routes";
import COLORS from "../../../utils/Colors";
import { wp, hp } from "../../../utils/Dimensions";
import NavBar from "../../../components/NavBar";
import PLButton from "../../../components/PLButton/PLButton";
import { FontAwesome } from "@expo/vector-icons";
import { PLPasswordInput } from "../../../components/PLPasswordInput/PLPasswordInput";
import { PLTextInput } from "../../../components/PLTextInput/PLTextInput";
import { PLDatePicker } from "../../../components/PLDatePicker";
import * as Animatable from "react-native-animatable";
import { states } from "utils/nigerianStates";
import { Picker, Form } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../../utils/axiosClient";
import { RegisterInterface } from "../.././../navigation/interfaces";
import { PLToast } from "components/PLToast";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const AuthGetStarted = ({ navigation }: Props) => {
  //--> state values for the section
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  //--> state from the other screen
  const [initialState, setInitialState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: 1,
    dob: "",
    password: "",
    address: "",
    phone: "",
  });
  const [initialload, setInitialLoad] = useState(true);

  //--> loading state of the page
  const [isLoading, setIsLoading] = useState(false);

  //--> Next button disabled state
  const [isDisabled, setIsDisabled] = useState(true);

  //--> Custom hook for date picker
  const useDatepickerState = (initialDate = new Date()) => {
    const [date, setDate] = React.useState(initialDate);
    return { date, onSelect: setDate };
  };

  const { onSelect, date } = useDatepickerState();

  //--> composing the date
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const initial = date.toString();
  const selectedDate = `${month}/${day}/${year}`;

  //--> check the state of the input forms and enable the button when all fields are complete
  React.useEffect(() => {
    //--> checking the date
    const date = new Date();

    //--> composing the date
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const todaysDate = `${month}/${day}/${year}`;

    if (
      selectedDate === todaysDate ||
      state.length === 0 ||
      city.length === 0 ||
      password.length === 0
    ) {
      setIsDisabled(true);
      return;
    } else {
      setIsDisabled(false);
    }
  }, [selectedDate, state, city, password]);

  //--> make api call for registration
  React.useEffect(() => {
    if (initialload) {
      return;
    } else {
      //---> payload to be sent to the backend
      const individualPayload = {
        firstName: initialState.firstName,
        lastName: initialState.lastName,
        email: initialState.email,
        userType: 1,
        dob: selectedDate,
        password: password,
        address: `${city},${state}`,
        phone: initialState.phone,
      };

      register(individualPayload);
    }
  }, [initialload]);

  const register = async (individualPayload: RegisterInterface) => {
    setIsLoading(true);
    console.log(individualPayload);

    try {
      const response = await axiosClient.post("api/User", individualPayload);
      setIsLoading(false);
      PLToast({ message: "Successfully Registered", type: "success" });

      // const { token } = data.token;
      console.log(response);

      //--> setting the received token in local storage
      // await AsyncStorage.setItem("token", JSON.stringify(token));

      // setTimeout(() => {
      //   navigation.navigate(ROUTES.AUTH_LOGIN_CATEGORY_SELECTOR);
      // }, 1000);
    } catch (error) {
      PLToast({ message: "An error has Occured", type: "error" });
      setIsLoading(false);
      return;
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={wp(0)}
      >
        <NavBar
          onPress={() => {
            navigation.goBack();
          }}
          navText="Complete Account Setup"
        />
        <ScrollView>
          <Animatable.View animation="fadeIn" style={styles.contentWraper}>
            <Text style={styles.welcomeMessage}>
              Complete your account setup to access top notch legal services.
            </Text>

            <View>
              <Text style={styles.inputText}>
                Date of Birth<Text style={styles.required}>*</Text>
              </Text>
              <PLDatePicker
                onSelect={onSelect}
                selectedDate={selectedDate}
                initial={initial}
              />
            </View>

            <View>
              <Text style={styles.inputText}>
                State <Text style={styles.required}>*</Text>
              </Text>
              <Form>
                <Picker
                  mode="dropdown"
                  selectedValue={state}
                  onValueChange={setState}
                  iosIcon={
                    <Entypo
                      name="chevron-small-down"
                      size={24}
                      color={COLORS.light.black}
                    />
                  }
                  textStyle={{
                    fontFamily: "Roboto-Regular",
                    fontSize: wp(12),
                    color: COLORS.light.black,
                  }}
                  placeholder="Select your location"
                  placeholderStyle={{
                    color: COLORS.light.darkgrey,
                    fontFamily: "Roboto-Regular",
                    fontSize: wp(12),
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
              <PLTextInput
                labelText="City"
                labelTextRequired={true}
                onChangeText={setCity}
                textContentType="addressCity"
                style={styles.input}
                placeholder="Type the city you are based"
              />
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

                    setInitialLoad(false);
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
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: hp(39),
    width: wpercent("90%"),
  },
  city: {
    width: wp(334),
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0.5,
    borderRadius: 4,
    height: wp(40),
    paddingRight: wp(4),
  },
  signUpText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: wp(11),
    color: COLORS.light.black,
    lineHeight: hp(14),
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
    marginTop: hp(31),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(64),
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
    lineHeight: hp(14),
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
  required: {
    color: "red",
  },
});

export default AuthGetStarted;
