import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "navigation/MainNavigator";
import { ROUTES } from "navigation/Routes";
import COLORS from "utils/Colors";
import { wp, hp } from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton";
import { PLTextInput } from "components/PLTextInput/PLTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheet, ListItem } from "react-native-elements";
import { states } from "utils/nigerianStates";
import { ScrollView } from "react-native-gesture-handler";
import axiosClient from "utils/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DocUploadUserInfo, confirmLawyerResume } from "navigation/interfaces";
import axios from "axios";
import { PLToast } from "components/PLToast";
import globalStyles from "css/GlobalCss";
import {
  DocUploadInterface,
  uploadFileToS3,
  pickFile,
} from "services/S3FileUploadHelper";
import {
  loadingReducer,
  loadingInitialState,
  LoadingActionType,
} from "screens/TabScreens/Home/Sections/BottomSheet/BottomSheetUtils/LoadingReducer";
import { showError } from "screens/TabScreens/Home/Sections/BottomSheet/BottomSheetUtils/FormHelpers";
import LoadingSpinner from "components/LoadingSpinner";
import { confirmUpload } from "services/UploadDocsService";
import { AntDesign } from "@expo/vector-icons";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const AuthGetStarted = ({ navigation }: Props) => {
  const [visible, setVisible] = React.useState(false);

  //--> state  for bottom sheet
  const [isVisible, setIsVisible] = useState<boolean>(false);

  //--> check for uploaded state
  const [isUploaded, setIsUploaded] = useState<boolean | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState
  );

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

  //--> state values
  const [school, setSchool] = useState("");
  const [CGPA, setCGPA] = useState("");
  const [Identification, setIdentification] = useState(
    "Select your means of Identification"
  );
  const [identificationPlaceholder, setIdentificationPlaceholder] = useState(0);
  const [errors, setErrors] = useState<boolean>(false);

  const [userID, setUserID] = useState(0);
  interface uploadInterfaace {
    name: string;
    size: number;
    uri: string;
    type: string;
  }
  const [idNumber, setIdNumber] = useState("");
  const [resume, setResume] = useState<uploadInterfaace[]>([
    {
      name: "",
      size: 0,
      uri: "",
      type: "",
    },
  ]);
  const [uri, setUri] = useState("");
  const [resumeName, setResumeName] = useState("Select from files");

  React.useEffect(() => {
    const { name, uri, type } = resume[0];
    if (name === "" || uri === "" || type === "") {
      return;
    }
    //--> get the user id from async storage
    AsyncStorage.getItem("userID").then((res) => {
      setUserID(Number(res));
      const payload: DocUploadUserInfo = {
        fileName: name,
        fileType: 1,
        isfor: "Certificate",
        contentType: type,
        userID: Number(res),
      };

      // postDocument(payload);
    });
  }, [resume]);

  const uploadFile = async (field: string) => {
    const payload: DocUploadInterface = {
      fileType: 1,
      isfor: field,
    };

    try {
      const pickedFile = await pickFile();
      if (pickedFile != null) {
        //--> extra formatting on the picked file
        let { name, size, uri } = pickedFile;

        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        setUri(uri);

        loadingDispatch({
          type: LoadingActionType.SHOW_WITH_CONTENT,
          payload: { content: "Uploading file..." },
        });
        const upload = await uploadFileToS3(payload, pickedFile);

        if (upload == null) {
          showError("Error occured while uploading, try again...");
        } else {
          const confirm = await confirmUpload(upload);

          loadingDispatch({ type: LoadingActionType.HIDE });
          if (confirm == null || confirm?.url == null) {
            showError("Error occured while uploading, try again...");
          } else {
            setIsUploaded(true);
            setResumeName(name);
            handleTextChange({ field: field, value: confirm?.url });
          }
        }
      }
    } catch (error) {
      return error;
    }
  };

  //--> disabling button
  const [disabled, setDisabled] = useState<boolean>(true);

  //--> to change placeholder color when indentification is set
  React.useEffect(() => {
    if (Identification === "Select your means of Identification") {
      return;
    }
    setIsVisible(false);
    setIdentificationPlaceholder(identificationPlaceholder + 1);
  }, [Identification]);

  //--> check to ensure all values are filled and enable button
  React.useEffect(() => {
    //--> check if the payload has be completely filled
    if (
      school === "" ||
      CGPA === "" ||
      Identification === "" ||
      idNumber === "" ||
      !isUploaded
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [CGPA, Identification, school, idNumber, isUploaded]);

  //--> submit all lawyers metadata
  const submitMetadata = async () => {
    setIsLoading(true);

    try {
      const payload = [
        {
          key: "SchoolName",
          value: school,
          userID: userID,
        },
        {
          key: "CGPA",
          value: CGPA,
          userID: userID,
        },
        {
          key: "Identification",
          value: Identification,
          userID: 1,
        },
        {
          key: "idNumber",
          value: idNumber,
          userID: userID,
        },
      ];

      const { data } = await axiosClient.post("User/AddMetadataUser", payload);
      setIsLoading(false);
      PLToast({ message: data.message, type: "success" });
      setTimeout(() => {
        navigation.navigate(ROUTES.AUTH_PROFILE_IMAGE_LAWYER);
      }, 1000);
    } catch (error: any) {
      setIsLoading(false);
      const { message } = error?.response.data;
      PLToast({ message: message, type: "error" });
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <NavBar
          onPress={() => {
            navigation.goBack();
          }}
          navText="Education Details"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentWraper}>
            <Text style={styles.welcomeMessage}>
              <Text style={styles.verifyEmail}>
                An email has been sent to you to verify your email address.
              </Text>
              &nbsp; Kindly fill in your &nbsp;
              <Text style={styles.educationDetails}>education details </Text> to
              complete your profile as a lawyer.
            </Text>

            <View>
              <PLTextInput
                onChangeText={setSchool}
                labelText="School"
                error={false}
                name="School"
                textContentType="none"
                style={styles.input}
                placeholder="Type the name of institution attended"
              />
            </View>

            <View>
              <PLTextInput
                onChangeText={setCGPA}
                labelText="CGPA"
                error={false}
                name="CGPA"
                textContentType="none"
                keyboardType="numeric"
                style={styles.input}
                placeholder="Type your grade"
              />
            </View>

            <View style={{ marginTop: wp(4) }}>
              <Text style={styles.inputText}>Means of Identification</Text>
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
                            identificationPlaceholder === 0
                              ? COLORS.light.darkgrey
                              : COLORS.light.black,
                        }}
                      >
                        {Identification}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: wp(30),
                        alignItems: "flex-end",
                      }}
                    >
                      <Entypo
                        name="chevron-small-down"
                        size={20}
                        color="grey"
                      />
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
                    onPress={() => {
                      setIdentification(l.state);
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
                onChangeText={setIdNumber}
                labelText="ID Number"
                error={false}
                name="ID Number"
                textContentType="none"
                style={styles.input}
                placeholder="Type identification number"
              />
            </View>

            <View style={styles.fileSelectBox}>
              <Text style={styles.inputText}>
                Resume
                <Text style={styles.required}>
                  &nbsp; * must be less than 1MB
                </Text>
              </Text>
              <TouchableOpacity
                onPress={() => {
                  uploadFile("resume");
                }}
                style={styles.inputButton}
              >
                <Text style={styles.selectText}>{resumeName}</Text>
                <AntDesign
                  name="clouduploado"
                  size={14}
                  color={COLORS.light.primary}
                />
              </TouchableOpacity>
              {errors ? (
                <View style={styles.errorView}>
                  <Text style={[styles.inputText, styles.errorText]}>
                    File must be less than 1MB
                  </Text>
                </View>
              ) : null}
              <View style={styles.errorView}>
                {isUploaded === false ? (
                  <View style={styles.progressView}>
                    <Text style={[styles.inputText, styles.progressText]}>
                      Uploading File..Please wait
                    </Text>
                    <Text>&nbsp;</Text>
                    <Text>&nbsp;</Text>
                    <ActivityIndicator />
                  </View>
                ) : null}
              </View>
            </View>

            <View style={styles.carouselWrapper}>
              <View style={styles.carouselIcon}>
                <FontAwesome
                  name="circle"
                  size={12}
                  color={COLORS.light.primary}
                />
                <Entypo name="circle" size={10} color={COLORS.light.primary} />
                <Entypo name="circle" size={10} color={COLORS.light.primary} />
              </View>
            </View>

            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() =>
                  navigation.navigate(ROUTES.AUTH_PROFILE_IMAGE_LAWYER)
                }
              >
                <Text style={styles.skip}>Skip</Text>
              </TouchableOpacity>

              <PLButton
                disabled={disabled}
                isLoading={isLoading}
                loadingText="Submitting..."
                style={styles.nextButton}
                textColor={COLORS.light.white}
                btnText={"Next"}
                onClick={submitMetadata}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
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
    alignSelf: "flex-start",
    color: COLORS.light.black,
    marginBottom: hp(4),
    marginTop: hp(20),
    width: "100%",
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(5),
  },
  educationDetails: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    // lineHeight: hp(20),
    color: COLORS.light.primary,
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    // borderColor: COLORS.light.textinputborder,
  },
  inputButton: {
    flexDirection: "row",
    height: wp(40),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.light.textinputborder,
    justifyContent: "space-between",
    paddingLeft: wp(20),
    paddingRight: wp(20),
    alignItems: "center",
  },
  fileSelectBox: {
    width: "100%",
    justifyContent: "center",
  },
  errorView: {
    height: wp(40),
  },
  progressView: {
    height: wp(40),
    flexDirection: "row",
    alignItems: "baseline",
  },
  selectText: {
    color: COLORS.light.darkgrey,
    fontSize: 12,
  },
  resetPasswordInput: {
    width: wp(300),
    height: wp(40),
    marginTop: wp(20),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  verifyEmail: {
    fontFamily: "Roboto-MediumItalic",
  },
  resetPasswordText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    color: COLORS.light.black,
    textAlign: "center",
  },
  resetPasswordBtn: {
    marginTop: wp(40),
    width: wp(300),
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    color: COLORS.light.darkgrey,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(21),
    width: wpercent("90%"),
  },
  skipButton: {
    width: wp(156),
    backgroundColor: COLORS.light.white,
    borderRadius: wp(7),
    borderWidth: 1,
    borderColor: COLORS.light.primary,
    height: wp(45),
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

  inputText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(4),
    marginTop: hp(10),
  },
  forgotPassword: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.lightpurple,
    textAlign: "right",
    fontSize: wp(12),
    marginTop: wp(8),
  },
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
  },
  plButton: {
    // marginTop: hp(390),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(18),
    width: wpercent("90%"),
  },
  identification: {
    width: wp(334),
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0.5,
    borderRadius: 4,
    height: wp(40),
    paddingRight: wp(4),
  },
  carouselIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wpercent("11%"),
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
  errorText: {
    color: "red",
    fontFamily: "Roboto-Regular",
    fontSize: wp(10),
  },
  progressText: {
    color: COLORS.light.primary,
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
  },
  required: {
    color: "red",
    fontSize: wp(10),
  },
});

export default AuthGetStarted;
function loadingDispatch(arg0: { type: any; payload: { content: string } }) {
  throw new Error("Function not implemented.");
}

function handleTextChange(arg0: { field: string; value: any }) {
  throw new Error("Function not implemented.");
}
