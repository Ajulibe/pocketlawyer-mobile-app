import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorageUtil from "./AsyncStorageUtil";
import axiosClient from "./axiosClient";

export interface DocUploadInterface {
  fileName?: string;
  fileType: number;
  isfor: string;
  contentType?: string;
  userID?: number;
  Section?: string;
  HistoryID?: Number;
}
export interface DocUploadResponse {
  fileName: string;
  filetType: number;
  userID: number;
  uploadID: number;
}

const getBlob = async (fileUri: any) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

export const pickAndUploadFile = async (
  payload: DocUploadInterface
): Promise<DocUploadResponse | null> => {
  //--> Pick file(PDF/IMG/OTHER)
  const pickFile = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: true,
  });

  if (pickFile.type !== "success") {
    //--> Toast error
    return null;
  } else {
    let { name, size, uri } = pickFile;
    const imageBody = await getBlob(uri);
    const fileType = imageBody["type"];
    if (imageBody == null) {
      //--> Toast error
      return null;
    } else {
      const userId = await AsyncStorageUtil.getUserId();
      payload.contentType = fileType;
      payload.userID = Number(userId);
      payload.fileName = name;
      //--> Get signed URL
      const signedUrl = await axiosClient.post("Upload/Generates3URL", payload);

      if (signedUrl == null) {
        //--> Toast error
        return null;
      } else {
        const { url, uploadID, fileName } = signedUrl.data.data;
        console.log(url, uploadID, fileName, fileType, size);

        const uploadFile = await axios({
          method: "PUT",
          url: url,
          data: imageBody,
          headers: { "Content-Type": fileType ?? "image/jpeg" },
        });
        if (uploadFile.status === 200) {
          console.log(uploadFile);

          //--> Uploaded file details
          const response: DocUploadResponse = {
            fileName: fileName,
            userID: payload.userID,
            filetType: payload.fileType,
            uploadID: uploadID,
          };
          return response;
        } else {
          //--> Toast error
          return null;
        }
      }
    }
  }
};
