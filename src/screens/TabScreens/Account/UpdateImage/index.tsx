import React, { useState } from "react";
import { View, SafeAreaView, Text, Platform } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList } from "navigation/MainNavigator";
import { ROUTES } from "navigation/Routes";
import COLORS from "utils/Colors";
import { wp, hp } from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
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
import { showError } from "screens/TabScreens/Home/Sections/BottomSheet/BottomSheetUtils/FormHelpers";
import LoadingSpinner from "components/LoadingSpinner";
import { confirmUpload } from "services/UploadDocsService";
import globalStyles from "css/GlobalCss";
import { styles } from "./style";

//--> REDUX
import { useAppDispatch } from "redux/hooks";
import { getUser } from "redux/actions";
import AsyncStorageUtil from "utils/AsyncStorageUtil";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const UpdateImage = ({ navigation }: Props) => {
  const [image, setImage] = useState<string>("");
  const [disabled, setDisabled] = useState(true);
  const imageSelected = React.useRef<any>({});
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState
  );

  const dispatch = useAppDispatch();

  function handleTextChange(arg0: { field: string; value: any }) {
    throw new Error("Function not implemented.");
  }

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
            const userID = await AsyncStorageUtil.getUserId();
            dispatch(getUser({ userID: Number(userID) }));
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
          navigation.goBack();
        }}
        navText="Upload Profile Image"
      />
      <View style={styles.contentWraper}>
        <Text style={styles.welcomeMessage}>
          Upload an Image for your Profile
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

        <View style={styles.btnWrapper}>
          <PLButton
            style={styles.nextButton}
            textColor={COLORS.light.white}
            btnText={"Save"}
            disabled={disabled}
            onClick={() =>
              setTimeout(() => {
                navigation.goBack();
              }, 1000)
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateImage;
