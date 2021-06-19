import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
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
import { FontAwesome } from "@expo/vector-icons";
import { PLPasswordInput } from "components/PLPasswordInput/PLPasswordInput";
import { PLTextInput } from "components/PLTextInput/PLTextInput";
import { PLDatePicker } from "components/PLDatePicker";
import * as Animatable from "react-native-animatable";
import { states } from "utils/nigerianStates";
import { Entypo } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "utils/axiosClient";
import { RegisterInterface } from "navigation/interfaces";
import { PLToast } from "components/PLToast";
import { BottomSheet, ListItem } from "react-native-elements";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import globalStyles from "css/GlobalCss";
import dayjs from "dayjs";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const AuthGetStarted = ({ navigation }: Props) => {
  //--> state values for the section
  const [state, setState] = useState("Select your location");
  const [statePlaceholder, setStatePlaceholder] = useState(0);
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  //--> state  for bottom sheet
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (state === "Select your location") {
      return;
    }
    setIsVisible(false);
    setStatePlaceholder(statePlaceholder + 1);
  }, [state]);

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
  const [initialload, setInitialLoad] = useState(0);

  //--> loading state of the page
  const [isLoading, setIsLoading] = useState(false);

  //--> Next button disabled state
  const [isDisabled, setIsDisabled] = useState(true);

  const [date, setDate] = React.useState<any>(null);

  const useDatepickerState = (intial = null) => {
    return { date, onSelect: setDate };
  };

  const minMaxPickerState = useDatepickerState();

  //--> check the state of the input forms and enable the button when all fields are complete
  React.useEffect(() => {
    if (
      date === null ||
      state.length === 0 ||
      city.length === 0 ||
      password.length === 0
    ) {
      setIsDisabled(true);
      return;
    } else {
      setIsDisabled(false);
    }
  }, [date, state, city, password]);

  //--> make api call for registration
  React.useEffect(() => {
    if (initialload === 0) {
      return;
    } else {
      //---> payload to be sent to the backend
      const individualPayload = {
        firstName: initialState.firstName,
        lastName: initialState.lastName,
        email: initialState.email,
        userType: 1,
        dob: dayjs(date).format("DD/MM/YYYY"),
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
      const { data } = await axiosClient.post("User", individualPayload);
      setIsLoading(false);
      PLToast({ message: "Successfully Registered", type: "success" });

      //--> setting async stoarage data for usage later
      const { token } = data.data;
      const { userType } = data.data;
      const { userID } = data.data;
      const { firstName } = data.data;

      //--> setting the received token in local storage

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userType", JSON.stringify(userType));
      await AsyncStorage.setItem("userID", JSON.stringify(userID));
      await AsyncStorageUtil.setUser(JSON.stringify(data));
      await AsyncStorage.setItem("firstName", firstName);

      setTimeout(() => {
        navigation.navigate(ROUTES.AUTH_VALIDATE_EMAIL);
      }, 1000);
    } catch (error: any) {
      const { message } = error?.response.data;
      setIsDisabled(true);
      PLToast({ message: message, type: "error" });
      setIsLoading(false);
      return;
    }
  };

  const now = new Date();
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <NavBar
        onPress={() => {
          navigation.goBack();
        }}
        navText="Complete Account Setup"
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
        <Animatable.View animation="fadeIn" style={styles.contentWraper}>
          <Text style={styles.welcomeMessage}>
            Complete your account setup to access top notch legal services.
          </Text>

          <View>
            <Text style={styles.inputText}>
              Date of Birth<Text style={styles.required}> *</Text>
            </Text>

            <PLDatePicker
              placeholder="Select your Date of Birth"
              useDatepickerState={minMaxPickerState}
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
                        fontSize: wp(12),
                        fontFamily: "Roboto-Medium",
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
                  // containerStyle={l.containerStyle}
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
    lineHeight: Platform.OS === "ios" ? hp(20) : hp(28),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    justifyContent: "flex-start",
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
    // borderWidth: 1,
    justifyContent: "space-between",
    borderRadius: 4,
    // borderColor: COLORS.light.textinputborder,
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
