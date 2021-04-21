import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "../../navigation/MainNavigator";
import { ROUTES } from "../../navigation/Routes";
import COLORS from "../../utils/Colors";
import IMAGES from "../../utils/Images";
import { wp, hp } from "../../utils/Dimensions";
import PLButton from "../../components/PLButton/PLButton";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_GET_STARTED_SCREEN
>;

const AuthGetStarted = ({ navigation }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={IMAGES.getstarted}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.textHeader}>Access Highly Skilled Laywers</Text>
      <View style={styles.textWrapper}>
        <Text style={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit amet,
          consectetur
        </Text>
      </View>

      <PLButton
        style={styles.plButton}
        textColor={COLORS.light.white}
        btnText={"Get Started"}
        onClick={() => navigation.navigate(ROUTES.AUTH_SELECT_CATEGORY)}
      />
      <View style={styles.loginWrapper}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.AUTH_LOGIN);
          }}
        >
          <Text style={styles.login}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: hp(78),
  },
  plButton: {
    marginTop: hp(149.67),
  },
  textWrapper: {
    width: wpercent("80%"),
    alignItems: "center",
    marginTop: hp(38),
  },
  textHeader: {
    width: wp(264),
    height: wp(24),
    fontFamily: "Roboto-Bold",
    fontSize: wp(20),
    color: COLORS.light.primary,
    marginTop: hp(72),
  },
  loginWrapper: {
    flexDirection: "row",
    width: wpercent("60%"),
    justifyContent: "space-around",
    marginTop: hp(21),
  },
  login: {
    fontFamily: "Roboto-Bold",
    fontSize: wp(14),
    lineHeight: hp(16),
    letterSpacing: 0,
    color: COLORS.light.lightpurple,
  },
});

export default AuthGetStarted;
