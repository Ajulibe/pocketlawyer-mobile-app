/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {useState} from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {widthPercentageToDP as wpercent} from "react-native-responsive-screen";
import {RootStackParamList} from "navigation/MainNavigator";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton.component";
import {PLTextInput} from "components/PLTextInput/PLTextInput.component";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Entypo} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import {BottomSheet, ListItem} from "react-native-elements";
import {states} from "utils/nigerianStates";
import {MOI} from "utils/meansOfIdentification";
import {ScrollView} from "react-native-gesture-handler";
import axiosClient from "utils/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {PLToast} from "components/PLToast/index.component";
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
import {showError} from "screens/TabScreens/Home/Sections/BottomSheet/BottomSheetUtils/FormHelpers";
import LoadingSpinner from "components/LoadingSpinner/index.component";
import {confirmUpload} from "services/UploadDocsService";
import {AntDesign} from "@expo/vector-icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const AuthGetStarted = ({navigation}: Props) => {
  //--> state  for bottom sheet
  const [isVisible, setIsVisible] = useState<boolean>(false);

  //--> check for uploaded state
  const [isUploaded, setIsUploaded] = useState<boolean | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState,
  );

  //-->  data for bottom sheet
  const list = [
    {
      title: "Cancel",
      containerStyle: {
        backgroundColor: COLORS.light.primary,
      },
      titleStyle: {color: "white"},
      onPress: () => setIsVisible(false),
    },
  ];

  //--> state values
  const [school, setSchool] = useState("");
  const [CGPA, setCGPA] = useState("");
  const [Identification, setIdentification] = useState(
    "Select your means of Identification",
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
    const {name, uri, type} = resume[0];
    if (name === "" || uri === "" || type === "") {
      return;
    }
    //--> get the user id from async storage
    AsyncStorage.getItem("userID").then((res) => {
      setUserID(Number(res));
      // const payload: DocUploadUserInfo = {
      //   fileName: name,
      //   fileType: 1,
      //   isfor: "Certificate",
      //   contentType: type,
      //   userID: Number(res),
      // };

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
        const {name, uri} = pickedFile;

        setUri(uri);

        loadingDispatch({
          type: LoadingActionType.SHOW_WITH_CONTENT,
          payload: {content: "Uploading file..."},
        });
        const upload = await uploadFileToS3(payload, pickedFile);

        if (upload == null) {
          showError("Error occured while uploading, try again...");
        } else {
          const confirm = await confirmUpload(upload);

          loadingDispatch({type: LoadingActionType.HIDE});
          if (confirm == null || confirm?.url == null) {
            showError("Error occured while uploading, try again...");
          } else {
            setIsUploaded(true);
            setResumeName(name);
            // handleTextChange({field: field, value: confirm?.url});
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

      const {data} = await axiosClient.post("User/AddMetadataUser", payload);
      setIsLoading(false);
      PLToast({message: data.message, type: "success"});

      navigation.navigate(ROUTES.AUTH_PROFILE_IMAGE_LAWYER);
    } catch (error: any) {
      setIsLoading(false);
      const {message} = error?.response.data;
      PLToast({message: message, type: "error"});
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <KeyboardAwareScrollView
        extraScrollHeight={wp(100)}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.container}>
        <NavBar
          onPress={() => {
            navigation.goBack();
          }}
          navText="Education Details"
        />
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

          <View style={{marginTop: wp(4)}}>
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
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <View style={{width: wp(300)}}>
                    <Text
                      style={{
                        marginLeft: wp(16),
                        fontSize: wp(14),
                        fontFamily: "Roboto-Regular",
                        color:
                          identificationPlaceholder === 0
                            ? COLORS.light.darkgrey
                            : COLORS.light.black,
                      }}>
                      {Identification}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp(30),
                      alignItems: "flex-end",
                    }}>
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
              containerStyle={{backgroundColor: "rgba(0,0,0,0.7)"}}>
              {MOI.map((l, i) => (
                <ListItem
                  key={i}
                  onPress={() => {
                    setIdentification(l);
                  }}>
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text>{l}</Text>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
              {list.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={l.containerStyle}
                  onPress={l.onPress}>
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
              {/* <Text style={styles.required}>
                &nbsp; * must be less than 1MB
              </Text> */}
            </Text>
            <TouchableOpacity
              onPress={() => {
                uploadFile("resume");
              }}
              style={styles.inputButton}>
              <Text style={styles.selectText}>{resumeName}</Text>
              <AntDesign
                name="clouduploado"
                size={14}
                color={COLORS.light.primary}
              />
            </TouchableOpacity>
            {/* {errors ? (
                <View style={styles.errorView}>
                  <Text style={[styles.inputText, styles.errorText]}>
                    File must be less than 1MB
                  </Text>
                </View>
              ) : null} */}
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
              }>
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
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
  carouselWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(20),
    width: wpercent("90%"),
  },
  carouselIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wpercent("10%"),
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
    fontSize: wp(14),
    fontFamily: "Roboto-Regular",
  },

  verifyEmail: {
    fontFamily: "Roboto-MediumItalic",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(21),
    width: wpercent("90%"),
    marginBottom: hp(20),
  },
  skipButton: {
    width: wp(156),
    backgroundColor: COLORS.light.white,
    borderRadius: wp(7),
    borderWidth: 1,
    borderColor: COLORS.light.primary,
    height: wp(50),
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
    alignSelf: "flex-end",
    // borderRadius: wp(7),
  },

  inputText: {
    fontFamily: "HK-SemiBold",
    fontSize: wp(16),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(4),
    marginTop: hp(10),
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
