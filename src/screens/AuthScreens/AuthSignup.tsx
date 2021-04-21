import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  Text,
  useColorScheme,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  widthPercentageToDP as wpercent,
  heightPercentageToDP as hpercent,
} from "react-native-responsive-screen";
import { RootStackParamList } from "../../navigation/MainNavigator";
import { ROUTES } from "../../navigation/Routes";
import COLORS from "../../utils/Colors";
import { wp, hp } from "../../utils/Dimensions";
import { Input, Layout } from "@ui-kitten/components";
import NavBar from "../../components/NavBar";
import PLButton from "../../components/Button";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode, Country, CallingCode } from "../../types";

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
          navigation.navigate(ROUTES.AUTH_SELECT_CATEGORY);
        }}
        navText="Sign Up"
      />
      <View style={styles.contentWraper}>
        <Text style={styles.welcomeMessage}>
          Welcome to Pocket Lawyer! Create an account to access top notch legal
          services.
        </Text>
        <View>
          <Text style={styles.inputText}>First Name</Text>
          <Input
            style={styles.input}
            placeholder="Type your first name"
            textContentType="name"
            textStyle={styles.textStyle}
          />
        </View>
        <View>
          <Text style={styles.inputText}>Last Name</Text>
          <Input
            style={styles.input}
            placeholder="Type your last name"
            textContentType="familyName"
            textStyle={styles.textStyle}
          />
        </View>
        <View>
          <Text style={styles.inputText}>Email Address</Text>
          <Input
            style={styles.input}
            placeholder="Type your email address"
            textContentType="emailAddress"
            textStyle={styles.textStyle}
          />
        </View>

        <View>
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
              <Text style={styles.codeText}>+{callingCode}</Text>
            </View>

            <Input
              style={styles.inputPhoneNumber}
              textStyle={styles.textStyle}
              placeholder="906 3782 2828"
              textContentType="telephoneNumber"
            />
          </View>
        </View>

        <View style={styles.carouselWrapper}>
          <View style={styles.carouselIcon}>
            <FontAwesome name="circle" size={12} color={COLORS.light.primary} />
            <Entypo name="circle" size={10} color={COLORS.light.primary} />
          </View>
        </View>

        <PLButton
          style={styles.plButton}
          textColor={COLORS.light.white}
          btnText={"Next"}
          onClick={() => navigation.navigate(ROUTES.AUTH_SIGN_UP)}
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
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(84),
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
    borderColor: "#f0f0f0",
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
    borderRightColor: "#f0f0f0",
    paddingLeft: wpercent("2%"),
    width: wpercent("26%"),
  },
});

export default AuthGetStarted;
