/* eslint-disable no-alert */
import React, {useState} from "react";
import {View, StyleSheet, SafeAreaView, Text, Platform} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {widthPercentageToDP as wpercent} from "react-native-responsive-screen";
import {RootStackParamList} from "navigation/MainNavigator";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton.component";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Entypo} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {Ionicons} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

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
import globalStyles from "css/GlobalCss";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const AuthGetStarted = ({navigation}: Props) => {
  const [image, setImage] = useState<string>("");
  const [disabled, setDisabled] = useState(true);

  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState,
  );

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {status} =
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
        const {uri} = pickedFile;

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
            setImage(uri);
            // handleTextChange({field: field, value: confirm?.url});
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
          navigation.goBack();
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
            style={styles.inputButton}>
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
              source={{uri: image}}
              style={{width: wp(120), height: hp(100), borderRadius: wp(7)}}
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
              navigation.navigate(ROUTES.AUTH_LAW_CATEGORY_LAWYER)
            }>
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
    fontSize: wp(16),
    lineHeight: hp(27),
    textAlign: "left",
    alignSelf: "flex-start",
    color: COLORS.light.black,
    marginBottom: hp(39),
    width: "100%",
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(10),
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
    fontSize: wp(12),
    marginTop: hp(12),
    fontFamily: "Roboto-Medium",
  },

  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(30),
    width: wpercent("90%"),
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
    borderRadius: wp(7),
  },

  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(90),
    width: wpercent("90%"),
  },

  carouselIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wpercent("11%"),
  },
});

export default AuthGetStarted;
