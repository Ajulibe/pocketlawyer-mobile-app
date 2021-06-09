import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  Platform,
  Image,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "navigation/MainNavigator";
import { ROUTES } from "navigation/Routes";
import COLORS from "utils/Colors";
import { wp, hp } from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton";
import { PLPasswordInput } from "components/PLPasswordInput/PLPasswordInput";
import { PLTextInput } from "components/PLTextInput/PLTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PLModal } from "components/PLModal";
import { states } from "utils/nigerianStates";
import { Picker, Form, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import axiosClient from "utils/axiosClient";
import { DocUploadUserInfo, confirmLawyerResume } from "navigation/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
import globalStyles from "css/GlobalCss";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const AuthGetStarted = ({ navigation }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [image, setImage] = useState<string>("");
  const [disabled, setDisabled] = useState(true);
  const [userID, setUserID] = useState(0);
  const imageSelected = React.useRef<any>({});
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState
  );

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  React.useEffect(() => {
    if (image.length === 0) {
      setDisabled(true);
      return;
    } else {
      setDisabled(false);
    }
  }, [image]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      imageSelected.current = result;

      if (!result.cancelled) {
        setImage(result.uri);
        let { type, uri } = result;
        let nameParts = uri.split(".");
        let fileType = nameParts[nameParts.length - 1];
        const contentType = `${type}/${fileType}`;

        try {
          //--> get the user id from async storage
          const res = await AsyncStorage.getItem("userID");

          setUserID(Number(res));
          const payload: DocUploadUserInfo = {
            fileName: "bb.jpg",
            fileType: 1,
            isfor: "Avatar",
            contentType: "image/jpeg",
            userID: Number(res),
          };

          //-> upload to a signed url
          try {
            axiosClient.post("Upload/Generates3URL", payload).then((res) => {
              const { url, uploadID, fileName } = res.data.data;

              const { uri } = imageSelected.current;

              var fileToUpload = [
                {
                  name: fileName,
                  uri: uri,
                  type: "image/jpeg",
                },
              ];

              const formData = new FormData();
              formData.append("resume", fileToUpload[0] as any);

              //--> post document to the received s3 url
              axios
                .put(url, formData, {
                  headers: {
                    "Content-Type": "application/octet-stream",
                  },
                })
                .then((res) => {
                  console.log(res.data);
                  //--> confirm upload
                  // const confirmPayload = {
                  //   fileName: fileName,
                  //   fileType: 1,
                  //   userID: payload.userID,
                  //   uploadID: uploadID,
                  // };

                  // confirmUpload<confirmLawyerResume>(confirmPayload);
                })

                .catch(function (error) {
                  // const { message } = error?.response.data;
                  // PLToast({ message: message, type: "error" });
                });
            });
          } catch (error) {}
        } catch (error) {}
      }
    } catch (error) {
      Alert.alert("error setting image");
    }
  };

  const uploadFile = async (field: string) => {
    const payload: DocUploadInterface = {
      fileName: "bb.jpg",
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
            setImage(uri);
            handleTextChange({ field: field, value: confirm?.url });
          }
        }
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, globalStyles.AndroidSafeArea]}>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <NavBar
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_EDUCATION_LAWYER);
        }}
        navText="Profile Image"
      />
      <View style={styles.contentWraper}>
        <Text style={styles.welcomeMessage}>
          Please Upload an Image to complete your Profile
        </Text>

        <View style={styles.fileSelectBox}>
          <TouchableOpacity
            onPress={() => {
              uploadFile("Avatar");
            }}
            style={styles.inputButton}
          >
            <Ionicons name="camera" size={24} color={COLORS.light.primary} />
            <Text style={styles.selectText}>
              {image ? "Change Photo" : "Select a Photo"}
            </Text>
          </TouchableOpacity>
        </View>

        <Animatable.View animation="fadeIn" style={styles.fileSelectBox_2}>
          {image ? (
            <Animatable.Image
              animation="fadeIn"
              easing="ease-in"
              source={{ uri: image }}
              style={{ width: wp(120), height: hp(100), borderRadius: wp(7) }}
            />
          ) : null}
        </Animatable.View>

        <View style={styles.carouselWrapper}>
          <View style={styles.carouselIcon}>
            <FontAwesome name="circle" size={12} color={COLORS.light.primary} />
            <FontAwesome name="circle" size={12} color={COLORS.light.primary} />
            <Entypo name="circle" size={10} color={COLORS.light.primary} />
          </View>
        </View>

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() =>
              navigation.navigate(ROUTES.AUTH_LOGIN_CATEGORY_SELECTOR)
            }
          >
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>

          <PLButton
            style={styles.nextButton}
            textColor={COLORS.light.white}
            btnText={"Next"}
            disabled={disabled}
            onClick={() => navigation.navigate(ROUTES.AUTH_LAW_CATEGORY_LAWYER)}
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
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(20),
    textAlign: "center",
    alignSelf: "flex-start",
    color: COLORS.light.black,
    marginBottom: hp(39),
    width: "100%",
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(38),
  },
  educationDetails: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: hp(20),
    color: COLORS.light.primary,
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    borderColor: COLORS.light.textinputborder,
  },
  inputButton: {
    height: hp(138),
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.light.imageinputborder,
    justifyContent: "center",
    paddingLeft: wp(20),
    paddingRight: wp(20),
    alignItems: "center",
    width: wp(157),
    borderStyle: "dashed",
    backgroundColor: COLORS.light.imageinputbg,
  },
  fileSelectBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(71),
  },
  fileSelectBox_2: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(20),
    height: hp(120),
  },
  selectText: {
    color: COLORS.light.primary,
    fontSize: 12,
    marginTop: hp(12),
    fontFamily: "Roboto-Medium",
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
    marginBottom: hp(12),
    marginTop: hp(12),
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
    marginTop: hp(150),
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
});

export default AuthGetStarted;
function loadingDispatch(arg0: { type: LoadingActionType }) {
  throw new Error("Function not implemented.");
}

function handleTextChange(arg0: { field: string; value: any }) {
  throw new Error("Function not implemented.");
}
