import React, {useState} from "react";
import {View, SafeAreaView, Text, Platform} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";

import {RootStackParamList} from "navigation/MainNavigator";
import {ROUTES} from "navigation/Routes";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton.component";
import {TouchableOpacity} from "react-native-gesture-handler";

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
import {styles} from "./style";

//--> REDUX
import {useAppDispatch, useAppSelector} from "redux/hooks";
import {getUser} from "redux/actions";
import AsyncStorageUtil from "utils/AsyncStorageUtil";
import {PLToast} from "components/PLToast/index.component";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const UpdateImage = ({navigation}: Props) => {
  const [image, setImage] = useState<string>("");
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const imageChanged = React.useRef<boolean>(false);
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState,
  );
  const [activeProfile, setActiveProfile] = React.useState(false);
  const dispatch = useAppDispatch();
  const metaData = useAppSelector((state) => state?.users?.user.metaData);

  function handleTextChange(arg0: {field: string; value: any}) {
    throw new Error("Function not implemented.");
  }

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
    if (!imageChanged.current) {
      setDisabled(true);
      return;
    } else {
      setDisabled(false);
    }
  }, [image]);

  React.useEffect(() => {
    let latestAvatar = metaData
      .slice()
      .reverse()
      .find((item: any) => {
        return item.key === "Avatar";
      });
    if (metaData?.length !== 0) {
      setActiveProfile(true);
      setImage(latestAvatar?.value);
    } else {
      setActiveProfile(false);
    }
  }, []);

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
        let {name, size, uri} = pickedFile;

        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];

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
            const userID = await AsyncStorageUtil.getUserId();
            dispatch(getUser({userID: Number(userID)}));
            setActiveProfile(false);
            imageChanged.current = true;
            setImage(uri);
            setIsLoading(true);
            PLToast({message: "Image Uploaded", type: "success"});
            handleTextChange({field: field, value: confirm?.url});
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
        navText="Update Profile Image"
      />
      <View style={styles.contentWraper}>
        <Text style={styles.welcomeMessage}>
          {image ? "Update Profile Image" : "Upload an Image for your Profile"}
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
              source={{uri: activeProfile ? `https://${image}` : image}}
              style={{width: wp(120), height: hp(100), borderRadius: wp(7)}}
            />
          ) : null}
        </Animatable.View>

        {/* <View style={styles.btnWrapper}>
          <PLButton
            isLoading={isLoading}
            style={styles.nextButton}
            textColor={COLORS.light.white}
            btnText={"Save"}
            disabled={disabled}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                navigation.goBack();
              }, 3000);
            }}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default UpdateImage;
