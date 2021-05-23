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
    { name: "Pre-Incorporation", value: preincorporation },
    { name: "Company Secretarial Services", value: companysecretarial },
    { name: "Post-Incorporation", value: postincorporation },
    { name: "reviewofLegal", value: reviewofLegal },
    { name: "Legal Advice and Consultancy", value: legaladvice },
    { name: "Review of Legal Documents", value: legaldrafting },
  ];

  const filterCategories = () => {
    const fliteredCategories = selectedCategories.filter((item) => {
      return item.value === true;
    });
    console.log(fliteredCategories);

    const Categorylist = fliteredCategories.map((item) => {
      return { CategoryCode: item.name, CategoryName: item.name };
    });

    const Payload: submitCategories = {
      UserId: 1,
      UserType: 1,
      Categorylist: Categorylist,
    };

    submitCategories(Payload);
  };

  const submitCategories = async (Payload: submitCategories) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        "api/Category/AddUSerCategory",
        Payload
      );
      console.log(response, "result");
      PLToast({ message: "Categories Saved", type: "success" });
      // setTimeout(() => {
      //   navigation.navigate(ROUTES.TABSCREEN_STACK);
      // }, 1000);
    } catch (error) {
      setLoading(false);
      PLToast({ message: "Error Saving Categories", type: "success" });

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
    height: hp(44),
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
