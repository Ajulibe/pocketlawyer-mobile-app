import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "navigation/HomeStack";
import {ROUTES} from "navigation/Routes";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
} from "react-native";
import {hp, wp} from "utils/Dimensions";
import CONSTANTS from "utils/Constants";
import COLORS from "utils/Colors";
import CustomButton from "components/CustomButton";
import BottomSheetModal from "../BottomSheet/BottomSheetModal";
import {getHistoryId} from "services/UploadDocsService";
import {PLToast} from "components/PLToast/index.component";
import LoadingSpinner from "components/LoadingSpinner/index.component";
import axiosClient from "utils/axiosClient";
import {showError} from "../BottomSheet/BottomSheetUtils/FormHelpers";
import Utilities from "utils/Utilities";
import {Category} from "database/DBData";
import {FontAwesome5} from "@expo/vector-icons";
import FullPageLoader from "components/FullPageLoader/index.component";

type Props = StackScreenProps<HomeStackParamList, ROUTES.LAWYER_DETAIL_SCREEN>;

export default function LawyerDetail({navigation, route}: Props) {
  const category = route.params.category;
  const lawyer = route.params.lawyer;
  const service = route.params.service;

  const refRBSheet = React.useRef<any>("");

  const [lawyerCats, setLawyerCats] = React.useState<Category[]>([]);
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [historyId, setHistoryId] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [spinnerText, setSpinnerText] = React.useState("Please wait...");

  React.useEffect(() => {
    getLawyerInfo();
    getPrice();
  }, []);

  const getLawyerInfo = async () => {
    setIsLoading(true);
    setSpinnerText("Fetching Info...");
    try {
      const response = await axiosClient.get(
        `Category/GetUserCategories/${lawyer.serviceProviderID}`,
      );
      const cats: Category[] = response?.data?.data;
      setLawyerCats(cats);
    } catch (error) {
      showError("Network error!");
      navigation.goBack();
    }
    setIsLoading(false);
  };
  const getPrice = async () => {
    try {
      const response = await axiosClient.get(
        `Service/GetServiceAmount?ServiceCode=${service?.serviceCode}`,
      );
      const {amount} = response.data?.data;
      setAmount(amount);
    } catch (error) {
      showError("Network error!");
      navigation.goBack();
    }
  };

  //--> Get history ID before you proceed
  async function getHistory() {
    if (historyId != 0) {
      setModalVisibility(true);
    } else {
      setSpinnerText("Initializing form...");
      setIsLoading(true);
      const hID = await getHistoryId(service.serviceCode);
      setIsLoading(false);

      if (hID == null) {
        PLToast({message: "An Error occured, try again", type: "error"});
      } else {
        setHistoryId(hID);
        setTimeout(function () {
          setModalVisibility(true);
        }, 500);
      }
    }
  }

  const DescTile = ({
    leading,
    value,
    faintTrailing,
  }: {
    leading: String | string;
    value: String | string;
    faintTrailing?: boolean;
  }) => (
    <View style={styles.tileWrapper}>
      <Text style={styles.tileLeading}>{leading}</Text>
      <Text
        style={[
          styles.tileTrailing,
          {
            fontWeight: faintTrailing ? "400" : "700",
            fontSize: faintTrailing ? wp(10) : wp(12),
            color: faintTrailing ? "#6E58B3" : COLORS.light.primary,
          },
        ]}>
        {value}
      </Text>
    </View>
  );
  return (
    <>
      {/* <LoadingSpinner modalVisible={isLoading} content={spinnerText} /> */}

      <BottomSheetModal
        closeModal={() => setModalVisibility(false)}
        navigation={navigation}
        modalVisible={modalVisibility}
        service={service}
        lawyer={lawyer}
        historyId={historyId}
        amount={amount}
      />

      {isLoading ? (
        <FullPageLoader message="FETCHING LAWYERS INFO..." />
      ) : (
        <SafeAreaView style={globalStyles.AndroidSafeArea}>
          <CustomAppbar navigation={navigation} title="" />
          <ScrollView
            contentContainerStyle={[styles.container, {flexGrow: 1}]}
            keyboardShouldPersistTaps="handled"
            bounces={false}>
            <Image
              source={{
                uri: CONSTANTS.user,
              }}
              style={styles.userPhoto}
            />
            <Text style={styles.name}>{lawyer?.name}</Text>
            <View style={styles.userDetails}>
              <Text style={styles.descTitle}>Brief Description</Text>
              <DescTile leading="Location:" value={lawyer?.address!} />
              <DescTile
                leading="Price:"
                value={`\u20A6 ${Utilities.formateToMoney(amount)}`}
              />
              <DescTile leading="Years of Experience:" value="2yrs" />
              <Text style={styles.aboutUser}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                dolor nam vestibulum parturient augue etiam bibendum egestas
                nibh. Proin nulla interdum amet est ridiculus in leo. Nunc,
                ultricies blandit nisl, eget nec. Tincidunt elementum senectus
                mauris sapien.
              </Text>
              {lawyerCats.map((cat, index) => (
                // <DescTile
                //   leading={cat.categoryName}
                //   value="12/03/21"
                //   faintTrailing={true}
                //   key={`${index}.${cat.categoryName}`}
                // />
                <View
                  style={styles.catWrapper}
                  key={`${index}.${cat.categoryName}`}>
                  <FontAwesome5
                    name="check-circle"
                    size={18}
                    color="rgba(0, 0, 0, 0.7)"
                  />
                  <Text style={styles.categoryHeading}>{cat.categoryName}</Text>
                </View>
              ))}
              <View style={{flex: 1}} />
              <CustomButton btnText="Confirm" onClick={getHistory} />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    // paddingVertical: hp(18),
    ...globalStyles.centerHorizontal,
  },
  userPhoto: {
    resizeMode: "contain",
    width: wp(117),
    height: wp(117),
    borderRadius: 150,
  },
  name: {
    lineHeight: hp(20),
    fontWeight: "500",
    fontSize: wp(14),
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    marginTop: hp(17),
    marginBottom: hp(17),
    textAlign: "center",
  },
  userDetails: {
    flex: 1,
    backgroundColor: "rgba(243, 242, 253, 0.51)",
    margin: 1,
    width: "100%",
    borderTopRightRadius: wp(24),
    borderTopLeftRadius: wp(24),
    paddingVertical: hp(17),
    paddingHorizontal: wp(28),
    borderWidth: Platform.OS === "ios" ? 0.3 : 0.4,
    borderColor: COLORS.light.carouselBtn2,
  },
  descTitle: {
    lineHeight: hp(24),
    fontWeight: "500",
    fontSize: wp(14),
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto-Medium",
    marginBottom: hp(18),
  },
  tileWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(12),
  },
  tileLeading: {
    fontWeight: "400",
    fontSize: wp(12),
    lineHeight: hp(20),
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto",
  },
  tileTrailing: {
    fontWeight: "700",
    fontSize: wp(12),
    lineHeight: hp(20),
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
  },
  aboutUser: {
    fontWeight: "400",
    fontSize: wp(12),
    lineHeight: hp(20),
    color: "rgba(0, 0, 0, 0.7)",
    textAlign: "justify",
    fontFamily: "Roboto",
    marginTop: hp(6),
    marginBottom: hp(32),
  },
  catWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
    marginBottom: hp(12),
  },
  categoryHeading: {
    fontSize: wp(16),
    textTransform: "capitalize",
    fontFamily: "Roboto-Medium",
    marginLeft: 8,
    color: "rgba(0, 0, 0, 0.7)",
  },
});
