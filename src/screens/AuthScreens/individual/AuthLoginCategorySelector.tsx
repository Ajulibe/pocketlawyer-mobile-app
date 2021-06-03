import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "navigation/MainNavigator";
import { ROUTES } from "navigation/Routes";
import COLORS from "utils/Colors";
import { wp, hp } from "utils/Dimensions";
import { CheckBox as RNECheckBox } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PLButton from "components/PLButton/PLButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PLToast } from "components/PLToast";
import axiosClient from "utils/axiosClient";
import { submitCategories } from "navigation/interfaces";
import FullPageLoader from "components/FullPageLoader";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CategoryDb } from "database/CategoryDb";

type Props = StackScreenProps<RootStackParamList, ROUTES.AUTH_SIGN_UP>;

const AuthGetStarted = ({ navigation }: Props) => {
  const [preincorporation, setPreIncorporation] =
    React.useState<boolean>(false);
  const [companysecretarial, setCompanysecretarial] =
    React.useState<boolean>(false);
  const [postincorporation, setPostincorporation] =
    React.useState<boolean>(false);
  const [reviewofLegal, setReviewofLegal] = React.useState<boolean>(false);
  const [legaladvice, setLegaladvice] = React.useState<boolean>(false);
  const [legaldrafting, setLegaldrafting] = React.useState<boolean>(false);

  //--> loading state
  const [loading, setLoading] = React.useState(false);

  const selectedCategories = [
    {
      name: CategoryDb.categories[0].categoryName,
      code: CategoryDb.categories[0].categoryCode,
      value: preincorporation,
    },
    {
      name: CategoryDb.categories[1].categoryName,
      code: CategoryDb.categories[1].categoryCode,
      value: companysecretarial,
    },
    {
      name: CategoryDb.categories[2].categoryName,
      code: CategoryDb.categories[2].categoryCode,
      value: postincorporation,
    },
    {
      name: CategoryDb.categories[3].categoryName,
      code: CategoryDb.categories[3].categoryCode,
      value: reviewofLegal,
    },
    {
      name: CategoryDb.categories[4].categoryName,
      code: CategoryDb.categories[4].categoryCode,
      value: legaladvice,
    },
    {
      name: CategoryDb.categories[5].categoryName,
      code: CategoryDb.categories[5].categoryCode,
      value: legaldrafting,
    },
  ];

  const filterCategories = async () => {
    const fliteredCategories = selectedCategories.filter((item) => {
      return item.value === true;
    });

    const Categorylist = fliteredCategories.map((item) => {
      return { CategoryCode: item.code, CategoryName: item.name };
    });

    try {
      //--> reading async storage value
      const userType = await AsyncStorage.getItem("userType");
      const userID = await AsyncStorage.getItem("userID");

      const Payload: submitCategories = {
        UserId: userID === null ? "" : JSON.parse(userID),
        UserType: userType === null ? "" : JSON.parse(userType),
        Categorylist: Categorylist,
      };

      submitCategories(Payload);
    } catch (error) {
      //---> return the error
    }
  };

  const submitCategories = async (Payload: submitCategories) => {
    setLoading(true);

    console.log(Payload);
    try {
      const response = await axiosClient.post(
        "Category/AddUSerCategory",
        Payload
      );

      PLToast({ message: "Categories Saved", type: "success" });

      setTimeout(() => {
        //--> reset navigation state after registration
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ROUTES.TABSCREEN_STACK }],
          })
        );
      }, 1000);
    } catch (error) {
      setLoading(false);
      PLToast({ message: "Error Saving Categories", type: "error" });

      return;
    }
  };

  return loading ? (
    <FullPageLoader message="SUBMITTING CATEGORIES" />
  ) : (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.contentWraper}>
        <Text style={styles.heading}>Select your preferred category</Text>
        <RNECheckBox
          title="Pre-Incorporation"
          iconRight
          containerStyle={[
            styles.checkBoxWrapper,
            {
              backgroundColor:
                preincorporation === true
                  ? COLORS.light.primary
                  : COLORS.light.checkpurple,
              marginTop: wp(40),
            },
          ]}
          textStyle={[
            styles.textStyle,
            {
              color:
                preincorporation === true
                  ? COLORS.light.white
                  : COLORS.light.primary,
            },
          ]}
          checkedIcon={
            <AntDesign
              name="checksquare"
              size={18}
              color={COLORS.light.white}
            />
          }
          uncheckedIcon={
            <MaterialIcons
              name="check-box-outline-blank"
              size={20}
              color={COLORS.light.primary}
            />
          }
          checkedColor={COLORS.light.primary}
          checked={preincorporation}
          onPress={() => setPreIncorporation(!preincorporation)}
        />

        <RNECheckBox
          title="Company Secretarial Services"
          iconRight
          containerStyle={[
            styles.checkBoxWrapper,
            {
              backgroundColor:
                companysecretarial === true
                  ? COLORS.light.primary
                  : COLORS.light.checkpurple,
            },
          ]}
          textStyle={[
            styles.textStyle,
            {
              color:
                companysecretarial === true
                  ? COLORS.light.white
                  : COLORS.light.primary,
            },
          ]}
          checkedIcon={
            <AntDesign
              name="checksquare"
              size={18}
              color={COLORS.light.white}
            />
          }
          uncheckedIcon={
            <MaterialIcons
              name="check-box-outline-blank"
              size={20}
              color={COLORS.light.primary}
            />
          }
          checkedColor={COLORS.light.primary}
          checked={companysecretarial}
          onPress={() => setCompanysecretarial(!companysecretarial)}
        />

        <RNECheckBox
          title="Post-Incorporation"
          iconRight
          containerStyle={[
            styles.checkBoxWrapper,
            {
              backgroundColor:
                postincorporation === true
                  ? COLORS.light.primary
                  : COLORS.light.checkpurple,
            },
          ]}
          textStyle={[
            styles.textStyle,
            {
              color:
                postincorporation === true
                  ? COLORS.light.white
                  : COLORS.light.primary,
            },
          ]}
          checkedIcon={
            <AntDesign
              name="checksquare"
              size={18}
              color={COLORS.light.white}
            />
          }
          uncheckedIcon={
            <MaterialIcons
              name="check-box-outline-blank"
              size={20}
              color={COLORS.light.primary}
            />
          }
          checkedColor={COLORS.light.primary}
          checked={postincorporation}
          onPress={() => setPostincorporation(!postincorporation)}
        />

        <RNECheckBox
          title="Review of Legal Documents"
          iconRight
          containerStyle={[
            styles.checkBoxWrapper,
            {
              backgroundColor:
                reviewofLegal === true
                  ? COLORS.light.primary
                  : COLORS.light.checkpurple,
            },
          ]}
          textStyle={[
            styles.textStyle,
            {
              color:
                reviewofLegal === true
                  ? COLORS.light.white
                  : COLORS.light.primary,
            },
          ]}
          checkedIcon={
            <AntDesign
              name="checksquare"
              size={18}
              color={COLORS.light.white}
            />
          }
          uncheckedIcon={
            <MaterialIcons
              name="check-box-outline-blank"
              size={20}
              color={COLORS.light.primary}
            />
          }
          checkedColor={COLORS.light.primary}
          checked={reviewofLegal}
          onPress={() => setReviewofLegal(!reviewofLegal)}
        />

        <RNECheckBox
          title="Legal Advice and Consultancy"
          iconRight
          containerStyle={[
            styles.checkBoxWrapper,
            {
              backgroundColor:
                legaladvice === true
                  ? COLORS.light.primary
                  : COLORS.light.checkpurple,
            },
          ]}
          textStyle={[
            styles.textStyle,
            {
              color:
                legaladvice === true
                  ? COLORS.light.white
                  : COLORS.light.primary,
            },
          ]}
          checkedIcon={
            <AntDesign
              name="checksquare"
              size={18}
              color={COLORS.light.white}
            />
          }
          uncheckedIcon={
            <MaterialIcons
              name="check-box-outline-blank"
              size={20}
              color={COLORS.light.primary}
            />
          }
          checkedColor={COLORS.light.primary}
          checked={legaladvice}
          onPress={() => setLegaladvice(!legaladvice)}
        />

        <RNECheckBox
          title="Legal Drafting"
          iconRight
          containerStyle={[
            styles.checkBoxWrapper,
            {
              backgroundColor:
                legaldrafting === true
                  ? COLORS.light.primary
                  : COLORS.light.checkpurple,
            },
          ]}
          textStyle={[
            styles.textStyle,
            {
              color:
                legaldrafting === true
                  ? COLORS.light.white
                  : COLORS.light.primary,
            },
          ]}
          checkedIcon={
            <AntDesign
              name="checksquare"
              size={18}
              color={COLORS.light.white}
            />
          }
          uncheckedIcon={
            <MaterialIcons
              name="check-box-outline-blank"
              size={20}
              color={COLORS.light.primary}
            />
          }
          checkedColor={COLORS.light.primary}
          checked={legaldrafting}
          onPress={() => setLegaldrafting(!legaldrafting)}
        />

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate(ROUTES.TABSCREEN_STACK)}
          >
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>

          <PLButton
            style={styles.nextButton}
            textColor={COLORS.light.white}
            btnText={"Next"}
            onClick={filterCategories}
          />
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
  heading: {
    fontFamily: "Roboto-Bold",
    fontSize: wp(20),
    fontWeight: "bold",
    color: COLORS.light.black,
    textAlign: "center",
  },

  checkBoxWrapper: {
    width: wp(325),
    justifyContent: "center",
    paddingLeft: wp(20),
    paddingRight: wp(20),
    backgroundColor: COLORS.light.checkpurple,
    height: hp(60),
    borderRadius: 7,
    marginTop: hp(14),
  },
  textStyle: {
    textAlign: "left",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: wp(16),
    marginRight: wp(50),
    width: wp(200),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(38),
  },
  checkBox: {
    alignSelf: "flex-end",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: wp(80),
    width: wpercent("90%"),
  },
  skipButton: {
    width: wp(156),
    backgroundColor: COLORS.light.white,
    borderRadius: wp(7),
    borderWidth: 1,
    borderColor: COLORS.light.primary,
    height: wp(44),
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: COLORS.light.primaryLight,
    shadowOpacity: 0.2,
  },
  skip: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: wp(16),
    color: COLORS.light.primary,
  },
  nextButton: {
    width: wp(156),
    borderRadius: wp(7),
  },
});

export default AuthGetStarted;
