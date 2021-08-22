import {useState, useEffect} from "react";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import axiosClient from "utils/axiosClient";
import * as FileSystem from "expo-file-system";
import {Buffer} from "buffer";

interface FileInterface {
  type: "success";
  name: string;
  size: number;
  uri: string;
  lastModified?: number | undefined;
  file?: File | undefined;
  output?: FileList | null | undefined;
}

interface DummySignedURLPayloadInterface {
  [key: string]: string;
}

const signedURLpayload: DummySignedURLPayloadInterface = {
  name: "mazi_juls",
  id: "@ajulibe",
};

export const useUploadToS3 = () => {
  const [file, setFile] = useState<FileInterface>();
  const [res, setRes] = useState("👀");

  useEffect(() => {
    if (typeof file === "undefined") {
      return;
    } else {
      uploadFileToS3(signedURLpayload, file);
    }
  }, [file]);

  async function getBlob(fileUri: string) {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  }

  //--> called when the file is picked
  const pickFile = async () => {
    //--> Pick file(PDF/IMG/OTHER)
    const pickFile = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (pickFile.type !== "success") {
      //--> Toast error
      return null;
    } else {
      setFile(pickFile);
      //this is stored as a state value whic is then added to the useEffect dependency array
      //to trigger the uploadFileToS3 function
    }
  };

  const uploadFileToS3 = async (
    signedURLpayload: DummySignedURLPayloadInterface,
    file: FileInterface,
  ) => {
    try {
      //--> Pick file(PDF/IMG/OTHER)
      if (file.type !== "success") {
        //--> Toast error
        return null;
      } else {
        let {uri} = file;
        const fileBody = await getBlob(uri);
        const fileType = fileBody["type"];
        if (fileBody == null) {
          //--> Toast error
          return null;
        } else {
          //--> Get signed URL
          const signedUrl = await axiosClient.post(
            "Upload/Generates3URL",
            signedURLpayload,
          );
          if (signedUrl == null) {
            throw new Error("🥳🥳");
          } else {
            //--> destructuring out the signed URL from the response
            const {url} = signedUrl.data.data;
            const base64 = await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            const buffer = Buffer.from(base64, "base64");
            const uploadFile = await axios({
              method: "PUT",
              url: url,
              data: buffer,
              headers: {"Content-Type": fileType ?? "image/jpeg"},
            });
            if (uploadFile.status === 200) {
              console.log("🥳🥳");
              setRes("🥳🥳");
            } else {
              console.log("😩😩");
              throw new Error("🥳🥳");
            }
          }
        }
      }
    } catch (error) {
      console.log("😩😩");
      //--> toast error
    }
  };

  return {
    res,
    pickFile,
  };
};

//--> This can be used in your component like a hook
import React from "react";
import {useUploadToS3} from "./yourHooksFolder";

const MazisFuncCmp: React.FC = () => {
  const {res, pickFile} = useUploadHookToS3();

  return (
    <div>
      <h1>Hi There...</h1>
      <p>{res}</p>
      <button type="button" onClick={pickFile}>
        Click me to test 👨🏽‍🏫
      </button>
    </div>
  );
};

export default MazisFuncCmp;
