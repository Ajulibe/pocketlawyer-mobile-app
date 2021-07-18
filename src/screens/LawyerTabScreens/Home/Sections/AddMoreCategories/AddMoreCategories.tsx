import React from "react";
import {View, StyleSheet, SafeAreaView, Text, FlatList} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {
  heightPercentageToDP,
  widthPercentageToDP as wpercent,
} from "react-native-responsive-screen";
import {HomeStackParamList} from "navigation/LawyerStackScreens/HomeStack";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";
import {CheckBox as RNECheckBox} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";
import _ from "lodash";
import {MaterialIcons} from "@expo/vector-icons";
import PLButton from "components/PLButton/PLButton.component";
import {PLToast} from "components/PLToast/index.component";
import axiosClient from "utils/axiosClient";
import {submitCategories} from "navigation/interfaces";
import FullPageLoader from "components/FullPageLoader/index.component";
import {CommonActions} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CategoryDb} from "database/CategoryDb";
import globalStyles from "css/GlobalCss";
import CustomAppbar from "components/CustomAppbar";

type Props = StackScreenProps<HomeStackParamList>;

const AddMoreCategories: React.FC<Props> = ({navigation, route}) => {
  const [preincorporation, setPreIncorporation] =
    React.useState<boolean>(false);
  const [companysecretarial, setCompanysecretarial] =
    React.useState<boolean>(false);
  const [postincorporation, setPostincorporation] =
    React.useState<boolean>(false);
  const [reviewofLegal, setReviewofLegal] = React.useState<boolean>(false);
  const [legaladvice, setLegaladvice] = React.useState<boolean>(false);
  const [legaldrafting, setLegaldrafting] = React.useState<boolean>(false);
  const [catadata, setCatData] = React.useState<any>([]);
  const [unselectedcat, setUnSelectedCat] = React.useState<any>([]);
  const data = route?.params;

  React.useEffect(() => {
    if (typeof data === "undefined") {
      return;
    }
    setCatData(data);
  }, [data]);

  React.useEffect(() => {
    if (catadata.length < 0) {
      return;
    }

    getUnselectedCategories();
  }, [catadata]);

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

  const getUnselectedCategories = () => {
    const arrayDb: string[] = [];
    const catDb: string[] = [];

    selectedCategories.map((item) => {
      arrayDb.push(item.name);
    });

    catadata.map((item: any) => {
      catDb.push(item.categoryName);
    });

    const difference = _.difference(arrayDb, catDb);

    setTimeout(() => {
      setUnSelectedCat(difference);
    }, 1000);
  };

  const filterCategories = async () => {
    const fliteredCategories = selectedCategories.filter((item) => {
      return item.value === true;
    });

    const Categorylist = fliteredCategories.map((item) => {
      return {CategoryCode: item.code, CategoryName: item.name};
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

      submitCategoriesFn(Payload);
    } catch (error) {
      //---> return the error
    }
  };

  const submitCategoriesFn = async (Payload: submitCategories) => {
    setLoading(true);

    try {
      await axiosClient.post("Category/AddUSerCategory", Payload);

      PLToast({message: "Categories Saved", type: "success"});

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: ROUTES.TABSCREEN_STACK}],
        }),
      );
    } catch (error) {
      setLoading(false);
      PLToast({message: "Error Saving Categories", type: "error"});

      return;
    }
  };

  const setAccepted = (name: string) => {
    switch (name) {
      case "Pre-Incorporation":
        return setPreIncorporation(!preincorporation);
      case "Company Secretarial Services":
        return setCompanysecretarial(!companysecretarial);
      case "Post-Incorporation":
        return setPostincorporation(!postincorporation);
      case "Review of Legal Documents":
        return setReviewofLegal(!reviewofLegal);
      case "Legal Advice and Consultancy":
        return setLegaladvice(!legaladvice);
      case "Legal Drafting":
        return setLegaldrafting(!legaldrafting);
      default:
        break;
    }
  };

  const getSelected = (name: string) => {
    switch (name) {
      case "Pre-Incorporation":
        return preincorporation;
      case "Company Secretarial Services":
        return companysecretarial;
      case "Post-Incorporation":
        return postincorporation;
      case "Review of Legal Documents":
        return reviewofLegal;
      case "Legal Advice and Consultancy":
        return legaladvice;
      case "Legal Drafting":
        return legaldrafting;
      default:
        break;
    }
  };

  return loading ? (
    <FullPageLoader message="SUBMITTING CATEGORIES" />
  ) : (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <CustomAppbar
        navigation={navigation}
        title="Add Category"
        showBorderBottom={false}
        avatar={true}
      />
      <View style={styles.contentWraper}>
        {unselectedcat.length > 0 ? (
          <FlatList
            horizontal={true}
            data={unselectedcat}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <RNECheckBox
                title={item}
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
                checked={getSelected(item)}
                onPress={() => setAccepted(item)}
              />
            )}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="hourglass-empty"
              size={24}
              color={COLORS.light.primary}
            />
            <Text style={styles.emptyText}>
              You are subscribed to all Categories
            </Text>
          </View>
        )}

        {unselectedcat.length > 0 && (
          <View style={styles.btnWrapper}>
            <PLButton
              style={styles.nextButton}
              textColor={COLORS.light.white}
              btnText={"Add"}
              onClick={filterCategories}
            />
          </View>
        )}
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

    // marginTop: hp(38),
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
    width: "100%",
    borderRadius: wp(7),
  },
  emptyState: {
    height: heightPercentageToDP("30"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginTop: hp(60),
  },
  emptyText: {
    textAlign: "left",
    color: COLORS.light.primary,
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: wp(16),
    marginTop: hp(30),
  },
});

export default AddMoreCategories;
