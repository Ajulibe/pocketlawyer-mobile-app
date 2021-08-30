import React, {useState} from "react";
import {View, SafeAreaView, Text} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "navigation/MainNavigator";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";
import {Input} from "@ui-kitten/components";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton.component";
import {Entypo} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import CountryPicker from "react-native-country-picker-modal";
import {CountryCode, Country} from "types";
import {PLTextInput} from "components/PLTextInput/PLTextInput.component";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IndividualSignUpInterface} from "navigation/interfaces";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import globalStyles from "css/GlobalCss";
import {styles} from "./style";
import InputValidation from "utils/InputValidation";
import {StatusBar} from "react-native";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_GET_STARTED_SCREEN
>;

const AuthGetStarted = ({navigation}: Props) => {
  //--> country component info
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
  };

  //--> state values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const {hasWhiteSpace} = InputValidation;

  //--> check to ensure all values are filled and enable button
  React.useEffect(() => {
    //--> check if the payload has be completely filled
    if (
      email === "" ||
      hasWhiteSpace(lastName.trim()) ||
      hasWhiteSpace(firstName.trim()) ||
      firstName === "" ||
      lastName === "" ||
      phonenumber === ""
    ) {
      setDisabled(true);
      return;
    } else {
      setDisabled(false);
    }
  }, [firstName, lastName, email, phonenumber]);

  //--> disabling button
  const [disabled, setDisabled] = useState<boolean>(true);

  //--> creating payload and saving to async
  const onClick = () => {
    const Payload: IndividualSignUpInterface = {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phonenumber.trim(),
    };

    //-->  saving payload to local staorage
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("@signup_payload", JSON.stringify(Payload));
        await AsyncStorage.setItem("@email", email);
        navigation.navigate(ROUTES.AUTH_SIGN_UP_SECTION_TWO);
      } catch (e) {
        //-->  saving error
      }
    };

    storeData();
  };

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.5)" />

      <KeyboardAwareScrollView
        extraScrollHeight={wp(100)}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.contentContainerStyle}>
        <NavBar
          onPress={() => {
            navigation.navigate(ROUTES.AUTH_SELECT_CATEGORY);
          }}
          navText="Sign Up"
          style={{
            marginBottom: hp(20),
          }}
        />

        <Animatable.View animation="fadeIn" style={styles.contentWraper}>
          <View style={styles.TextWrapper}>
            <Animatable.Text animation="fadeIn" style={styles.welcomeMessage}>
              Welcome to Pocket Lawyer. Create an account to access top notch
              legal services.
            </Animatable.Text>
          </View>

          <View>
            <PLTextInput
              labelText="First Name"
              labelTextRequired={true}
              error={false}
              name="FirstName"
              onChangeText={setFirstName}
              value={firstName}
              textContentType="givenName"
              style={styles.input}
              placeholder="Type your first name"
            />
            {hasWhiteSpace(firstName.trim()) ? (
              <Text
                style={{
                  color: "red",
                  fontSize: wp(10),
                  fontFamily: "Roboto-Bold",
                }}>
                *Invalid First Name
              </Text>
            ) : null}
          </View>

          <View>
            <PLTextInput
              labelText="Last Name"
              labelTextRequired={true}
              error={false}
              name="LastName"
              onChangeText={setLastName}
              value={lastName}
              textContentType="familyName"
              style={styles.input}
              placeholder="Type your last name"
            />
            {hasWhiteSpace(lastName.trim()) ? (
              <Text
                style={{
                  color: "red",
                  fontSize: wp(10),
                  fontFamily: "Roboto-Bold",
                }}>
                *Invalid Last Name
              </Text>
            ) : null}
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
                    withFilter: true,
                    withFlag: true,
                    withCountryNameButton: false,
                    withAlphaFilter: true,
                    withCallingCode: true,
                    withEmoji: true,
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

          <View>
            <PLTextInput
              labelText="Email Address"
              labelTextRequired={true}
              error={false}
              name="Email"
              onChangeText={setEmail}
              autoCapitalize="none"
              value={email}
              style={styles.input}
              placeholder="Type your email address"
              textContentType="emailAddress"
            />
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
            style={styles.plButton}
            disabled={disabled}
            textColor={COLORS.light.white}
            btnText={"Next"}
            onClick={onClick}
          />
          {/* <View style={styles.loginWrapper}>
            <Text style={styles.signUpText}>
              By signing up, you agree with the
              <Text style={styles.login}> Terms of services </Text>and{" "}
              <Text style={styles.login}>Privacy policy </Text>
            </Text>
          </View> */}
        </Animatable.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AuthGetStarted;
