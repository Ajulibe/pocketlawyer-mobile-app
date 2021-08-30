import React, {useRef} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import _ from "lodash";
import {HomeStackParamList} from "navigation/LawyerStackScreens/HomeStack";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import {MaterialIcons} from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {hp} from "utils/Dimensions";
import * as WebBrowser from "expo-web-browser";
import UserDescListTile from "./Components/UserDescListTile";
import {useAppSelector} from "redux/hooks";
import * as Animatable from "react-native-animatable";
import {Entypo} from "@expo/vector-icons";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import axiosClient from "utils/axiosClient";
import {showError} from "../BottomSheet/BottomSheetUtils/FormHelpers";
import PLButton from "components/PLButton/PLButton.component";
import {styles} from "./styles";

type Props = StackScreenProps<
  HomeStackParamList,
  ROUTES.CAT_SERVICE_SCREEN_LAWYER
>;

interface ServiceDetails {
  historyID: Number;
  key: string;
  section: string;
  tempServiceHistoryID: Number;
  userID: Number;
  value: string;
}
interface Links {
  name: string;
  link: string;
}

const CatServiceScreen = ({navigation, route}: Props) => {
  const userDetails = route.params;

  //--> state from redux store
  const userData = useAppSelector((state) => state?.users?.user);
  const {metaData} = userData;
  const [profileImage, setProfileImage] = React.useState("abc.jpg");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAttachmentOpen, setAttachmentIsOpen] = React.useState(false);
  const [documents, setDocuments] = React.useState<Links[]>([]);
  const [history, setHistory] = React.useState<Links[]>();
  const [accepted, setAccepted] = React.useState<string>("null");
  const historyIDRef = useRef<string>();

  React.useEffect(() => {
    getHistory();
  }, []);

  const handleOpenWithWebBrowser = (linkUrl: string) => {
    WebBrowser.openBrowserAsync(`https://${linkUrl}`);
  };

  const getHistory = async () => {
    try {
      const userID = await AsyncStorageUtil.getUserId();

      const response = await axiosClient.get(
        `Service/GetServiceHistory?UserID=${userID}`,
      );

      const data = response?.data?.data;

      if (response != null && response?.data?.data?.length != 0) {
        const serviceDetails = data.find((item: any) => {
          return item.serviceHistory.serviceName === userDetails;
        });

        const {
          metaDataHistories,
          serviceHistory: {status, serviceProviderImage},
        } = serviceDetails;
        const detailsArray: Links[] = [];
        const infoArray: Links[] = [];
        const {historyID} = metaDataHistories[0];
        historyIDRef.current = historyID;

        if (status === 4) {
          setAccepted("true");
        } else {
          setAccepted("false");
        }

        setProfileImage(serviceProviderImage);

        metaDataHistories.map((item: any) => {
          if (
            item.value.includes(".pdf") ||
            item.value.includes(".png") ||
            item.value.includes(".svg") ||
            item.value.includes(".jpg")
          ) {
            const data = {name: _.startCase(item.key), link: item.value};
            detailsArray.push(data);
          } else {
            const data = {name: _.startCase(item.key), link: item.value};
            infoArray.push(data);
          }
        });
        setDocuments(detailsArray);
        setHistory(infoArray);
      } else {
        showError("Error encountered while loading Service Details");
      }
    } catch (error) {
      return error;
    }
  };

  const acceptOrDecline = async (decision: number) => {
    if (
      historyIDRef.current === null ||
      typeof historyIDRef.current === "undefined"
    ) {
      return;
    }

    const payload = {
      Decision: decision,
      HistoryID: historyIDRef.current,
    };
    const {data} = await axiosClient.post("Service/Decision", payload);

    if (decision === 6 && data.status === 200) {
      navigation.navigate(ROUTES.HOME_SCREEN_LAWYER);
    } else {
      setAccepted("true");
    }
  };
  console.log(documents, "documents");

  return (
    <>
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar
          navigation={navigation}
          title="Request details"
          showBorderBottom={false}
          profileImage={profileImage}
          avatar={true}
        />

        <ScrollView
          contentContainerStyle={[styles.container, {flexGrow: 1}]}
          keyboardShouldPersistTaps="handled"
          bounces={false}>
          <View style={{height: hp(20)}} />
          <UserDescListTile
            leading="Service"
            value={userDetails ?? ""}
            makeBold
          />

          <TouchableOpacity
            style={[styles.changePasswordBth]}
            onPress={() => {
              setIsOpen(!isOpen);
            }}>
            <Text style={styles.formWrapper}>Business Registration Form</Text>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={COLORS.light.primary}
            />
          </TouchableOpacity>

          {isOpen && (
            <Animatable.View
              style={styles.dataWrapper}
              animation="fadeIn"
              duration={500}
              easing="ease-in">
              {history?.map((item: any, i: any) => {
                return (
                  <View key={i}>
                    <Text style={styles.subTitle}>
                      {_.startCase(item?.name)}
                    </Text>
                    <UserDescListTile
                      leading={item.link}
                      value=""
                      makeBold={false}
                    />
                  </View>
                );
              })}
            </Animatable.View>
          )}

          <TouchableOpacity
            style={[styles.changePasswordBth]}
            onPress={() => {
              setAttachmentIsOpen(!isAttachmentOpen);
            }}>
            <Text style={styles.formWrapper}>Required Documents</Text>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={COLORS.light.primary}
            />
          </TouchableOpacity>

          {isAttachmentOpen && (
            <Animatable.View
              animation="fadeIn"
              duration={500}
              easing="ease-in"
              style={styles.dataWrapper}>
              {documents?.length > 0 ? (
                documents?.map((item: any, i: any) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => handleOpenWithWebBrowser(item?.link)}
                      style={styles.links}>
                      <Entypo
                        name="attachment"
                        size={14}
                        color={COLORS.light.primary}
                      />

                      <Text style={styles.linkText}>{item?.name}</Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <TouchableOpacity onPress={() => true} style={styles.links}>
                  <MaterialIcons
                    name="hourglass-empty"
                    size={14}
                    color={COLORS.light.primary}
                  />
                  <Text style={styles.linkText}>No Attachments</Text>
                </TouchableOpacity>
              )}
            </Animatable.View>
          )}

          {accepted === "false" && (
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => acceptOrDecline(6)}>
                <Text style={styles.skip}>Decline</Text>
              </TouchableOpacity>

              <PLButton
                style={styles.acceptButton}
                textColor={COLORS.light.white}
                btnText={"Accept"}
                onClick={() => acceptOrDecline(4)}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CatServiceScreen;
