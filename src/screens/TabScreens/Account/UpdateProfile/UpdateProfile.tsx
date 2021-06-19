import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import COLORS from "utils/Colors";
import { wp } from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton";
import { PLTextInput } from "components/PLTextInput/PLTextInput";
import { PLDatePicker } from "components/PLDatePicker";
import * as Animatable from "react-native-animatable";
import { states } from "utils/nigerianStates";
import { Entypo } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";
import dayjs from "dayjs";

import axiosClient from "utils/axiosClient";
import { PLToast } from "components/PLToast";
import { BottomSheet, ListItem } from "react-native-elements";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import globalStyles from "css/GlobalCss";
import { styles } from "./style";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode, Country, CallingCode } from "types";
import { AccountStackParamList } from "navigation/AccountStack";
import LoadingSpinner from "components/LoadingSpinner";

//--> REDUX
import { useAppDispatch } from "redux/hooks";
import { getUser } from "redux/actions";

type Props = StackScreenProps<AccountStackParamList>;

const UpdateProfile = ({ navigation }: Props) => {
  //--> state values for the section
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("Change your location");
  const [statePlaceholder, setStatePlaceholder] = useState(0);
  const [city, setCity] = useState("");
  const [date, setDate] = React.useState<any>(null);
  const [phonenumber, setPhonenumber] = useState("");

  const dispatch = useAppDispatch();

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

  //--> state  for bottom sheet
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (state === "Change your location") {
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

  //--> loading state of the page
  const [isLoading, setIsLoading] = useState(false);

  //--> Next button disabled state
  const [isDisabled, setIsDisabled] = useState(true);

  const useDatepickerState = (intial = null) => {
    return { date, onSelect: setDate };
  };

  const minMaxPickerState = useDatepickerState();

  //--> check the state of the input forms and enable the button when
  //--> any of the fields are complete
  React.useEffect(() => {
    if (
      firstName !== "" ||
      lastName !== "" ||
      state !== "Change your location" ||
      city !== "" ||
      date !== null ||
      phonenumber !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [firstName, lastName, state, city, date, phonenumber]);

  const updateDetails = async () => {
    const dob = dayjs(date).format("DD/MM/YYYY");
    setIsLoading(true);

    try {
      const userID = await AsyncStorageUtil.getUserId();
      const updatePayload = {
        userid: Number(userID),
        firstName: firstName === "" ? null : firstName,
        lastName: lastName === "" ? null : lastName,
        address: state === "Change your location" ? null : `${city},${state}`,
        phone: phonenumber === "" ? null : phonenumber,
        dob: dob === "" ? null : dob,
      };

      await axiosClient.post("User/UpdateProfile", updatePayload);
      dispatch(getUser({ userID: Number(userID) }));
      setIsLoading(false);
      PLToast({ message: "Profile Updated", type: "success" });
      // setTimeout(() => {
      //   navigation.goBack();
      // }, 300);
    } catch (error: any) {
      console.log(error);
      const { message } = error?.response.data;
      setIsDisabled(true);
      PLToast({ message: message, type: "error" });
      setIsLoading(false);
      return;
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <NavBar
        onPress={() => {
          navigation.goBack();
        }}
        navText="Update Profile Details"
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
        <LoadingSpinner
          modalVisible={isLoading}
          content="Updating Profile..."
        />
        <Animatable.View animation="fadeIn" style={styles.contentWraper}>
          <View>
            <PLTextInput
              labelText="First Name"
              labelTextRequired={false}
              onChangeText={setFirstName}
              textContentType="name"
              style={styles.input}
              placeholder="Change First Name"
            />
          </View>

          <View>
            <PLTextInput
              labelText="last Name"
              labelTextRequired={false}
              onChangeText={setLastName}
              textContentType="familyName"
              style={styles.input}
              placeholder="Change last Name"
            />
          </View>

          <View>
            <Text style={styles.inputText}>State</Text>
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
                        fontSize: wp(13),
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
              labelTextRequired={false}
              onChangeText={setCity}
              textContentType="addressCity"
              style={styles.input}
              placeholder="Change the city you are based"
            />
          </View>

          <View>
            <Text style={styles.inputText}>Date of Birth</Text>

            <PLDatePicker
              placeholder="Change your Date of Birth"
              useDatepickerState={minMaxPickerState}
            />
          </View>

          <View style={{}}>
            <Text style={styles.inputText}>Phone Number</Text>

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

          <PLButton
            disabled={isDisabled}
            isLoading={isLoading}
            loadingText="Updating..."
            style={styles.plButton}
            textColor={COLORS.light.white}
            btnText={"Update details"}
            onClick={updateDetails}
          />
        </Animatable.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default UpdateProfile;
