import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorageUtil from "../utils/AsyncStorageUtil";
import axiosClient from "../utils/axiosClient";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

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
  fileType: number;
  userID: number;
  uploadID: number;
}
export interface FileInterface {
  type: "success";
  name: string;
  size: number;
  uri: string;
  lastModified?: number | undefined;
  file?: File | undefined;
  output?: FileList | null | undefined;
}

const getBlob = async (fileUri: any) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

export const pickFile = async (): Promise<FileInterface | null> => {
  //--> Pick file(PDF/IMG/OTHER)
  const pickFile = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: true,
  });

  if (pickFile.type !== "success") {
    //--> Toast error
    return null;
  } else {
    return pickFile;
  }
};

export const uploadFileToS3 = async (
  payload: DocUploadInterface,
  pickFile: FileInterface
): Promise<DocUploadResponse | null> => {
  //--> Pick file(PDF/IMG/OTHER)
  if (pickFile.type !== "success") {
    //--> Toast error
    return null;
  } else {
    let { name, size, uri } = pickFile;
    const fileBody = await getBlob(uri);
    const fileType = fileBody["type"];
    if (fileBody == null) {
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

        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const buffer = Buffer.from(base64, "base64");

        const uploadFile = await axios({
          method: "PUT",
          url: url,
          // data: `data:image/jpeg;base64,${base64uu}`,
          data: buffer,
          headers: { "Content-Type": fileType ?? "image/jpeg" },
        });
        if (uploadFile.status === 200) {
          // console.log(uploadFile);

          //--> Uploaded file details
          const response: DocUploadResponse = {
            fileName: fileName,
            userID: payload.userID,
            fileType: payload.fileType,
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
