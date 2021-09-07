import React, {useState} from "react";
import {Alert, Platform} from "react-native";

import * as ImagePicker from "expo-image-picker";

import axiosClient from "utils/axiosClient";
import {DocUploadUserInfo} from "navigation/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const useImageUpload = (documentUse: string, section: string) => {
  const [image, setImage] = useState<string>("");
  const [userID, setUserID] = useState(0);
  const imageSelected = React.useRef<any>({});

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
        let {type, uri} = result;
        let nameParts = uri.split(".");
        let fileType = nameParts[nameParts.length - 1];
        const contentType = `${type}/${fileType}`;

        try {
          //--> get the user id from async storage
          const res = await AsyncStorage.getItem("userID");
          setUserID(Number(res));
          const payloadSkeleton: DocUploadUserInfo = {
            fileName: "bb.jpg",
            fileType: 1,
            isfor: documentUse,
            contentType: "image/jpeg",
            userID: Number(res),
          };
          if (documentUse === "CompanyLogo") {
            const payload: DocUploadUserInfo = {
              ...payloadSkeleton,
              fileType: 2,
              HistoryID: 1,
              Section: section,
            };

            uploadImageToSignedUrl(payload);
          } else {
            const payload: DocUploadUserInfo = {
              ...payloadSkeleton,
            };
            uploadImageToSignedUrl(payload);
          }
        } catch (error) {}
      }
    } catch (error) {
      Alert.alert("error setting image");
    }
  };

  const uploadImageToSignedUrl = async (payload: DocUploadUserInfo) => {
    //-> generate a signed URL
    try {
      axiosClient.post("Upload/Generates3URL", payload).then((res) => {
        const {url, uploadID, fileName} = res.data.data;

        const {uri} = imageSelected.current;

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
  };

  return {
    pickImage,
    userID,
  };
};
