import {Platform} from "react-native";
import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import * as Print from "expo-print";

import axiosClient from "utils/axiosClient";

import {DocUploadUserInfo, confirmLawyerResume} from "navigation/interfaces";
import {PLToast} from "components/PLToast/index.component";

import {Buffer} from "buffer"; // get this via: npm install buffer
import * as FileSystem from "expo-file-system";

interface uploadInterfaace {
  name: string;
  size?: number;
  uri: Buffer;
  type: string;
}

interface IProps {
  documentUse: string;
  section: string;
}

export const useDocUpload = (documentUse: string, section: string) => {
  //--> check for uploaded state
  const [isUploaded, setIsUploaded] = useState<string>("intial");
  //--> state values
  const [errors, setErrors] = useState<boolean>(false);
  const [userID, setUserID] = useState(0);
  // const [resume, setResume] = useState<uploadInterfaace[]>([
  //   {
  //     name: "",
  //     size: 0,
  //     uri: [] ,
  //     type: "",
  //   },
  // ]); //--> uncomment when you figure it out

  const [resume, setResume] = useState<any>([
    {
      name: "",
      size: 0,
      uri: "",
      type: "",
    },
  ]);

  const [uri, setUri] = useState<any>();
  const [docName, setDocName] = useState("Select from files");
  const [pdfUri, setPdfUri] = useState("");

  const handlePdfPrint_Download = async () => {
    try {
      Print.printAsync({
        uri: pdfUri,
        html: `<div>
                  <p style="color: green; font-weight: bold; font-size: 28px">Welcome to the world</p>
                  <p style="color: red">We want to print this</p>
              </div>`,
      });
    } catch (error) {}
  };

  //--> setting  data
  const pickDocument = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      //--> check if successful
      if (response.type == "success") {
        let {name, size, uri} = response;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        // const uploadUri =
        //   Platform.OS === "ios" ? uri.replace("file://", "") : uri;

        //-->converting the file uri to blob
        const bzse64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        });

        setPdfUri(`data:application/pdf;base64,${bzse64}`); // to use when we want to view

        setUri(bzse64); //--> was initially uri

        // const resp = await fetch(`data:application/pdf;base64,${bzse64}`);
        // const imageBody = await resp.blob();

        let blob = new Blob([uri]);

        const blobURL = URL.createObjectURL(blob);

        var fileToUpload = [
          {
            name: name,
            size: size,
            // uri: `data:application/pdf;base64,${bzse64}`,
            uri: bzse64,
            type: "application/" + fileType,
          },
        ];
        if (fileToUpload[0].type !== "application/pdf") {
          setDocName("Invalid file type");
          setErrors(false);
          PLToast({message: "Only PDF is allowed", type: "error"});
          return;
        }

        // if (fileToUpload[0].size >= 1 * 1024 * 1024) {
        //   setDocName("File is too large");
        //   setErrors(true);
        //   PLToast({ message: "File must be less than 1MB", type: "error" });
        //   return;
        // } else {
        setErrors(false);
        setDocName(name);
        setResume(fileToUpload);
        // }
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    const {name, uri, type} = resume[0];
    if (name === "" || uri === "" || type === "") {
      return;
    }
    //--> get the user id from async storage
    AsyncStorage.getItem("userID").then((res) => {
      setUserID(Number(res));
      if (documentUse === "CompanyAgreement") {
        const payload: DocUploadUserInfo = {
          fileName: name,
          fileType: 2,
          isfor: documentUse,
          contentType: "application/pdf",
          userID: Number(res),
          HistoryID: 1,
          Section: section,
        };

        postDocument(payload);
      } else {
        const payload: DocUploadUserInfo = {
          fileName: name,
          fileType: 1,
          isfor: documentUse,
          contentType: type,
          userID: Number(res),
        };

        postDocument(payload);
      }
    });
  }, [resume]);

  //--> posting resume data
  const postDocument = async (payload: DocUploadUserInfo) => {
    setIsUploaded("loading");
    try {
      await axiosClient.post("Upload/Generates3URL", payload).then((res) => {
        const {url, uploadID, fileName} = res.data.data;

        // const fileToUpload = {
        //   ...resume[0],
        //   name: fileName,
        //   uri: pdfUri,
        // };

        // const formData = new FormData();
        // formData.append("myData", fileToUpload as any);

        // formData.append("fileName", fileName);

        //--> post document to the received s3 url
        //--> change the paylod here to the formdata generated and it deosnt work
        //-> thats the error wit the api

        const buffer = Buffer.from(uri, "base64");

        axios
          .put(url, buffer, {
            headers: {
              "Content-Type": "application/pdf",
            },
          })
          .then((res) => {
            //--> confirm upload
            const confirmPayload = {
              fileName: fileName,
              fileType: 1,
              userID: payload.userID,
              uploadID: uploadID,
            };

            confirmUpload<confirmLawyerResume>(confirmPayload);
          })

          .catch(function (error) {
            const {message} = error?.response.data;
            PLToast({message: message, type: "error"});
          });
      });
    } catch (error) {}
  };

  const confirmUpload = async <T>(confirmPayload: T) => {
    try {
      //--> confirm the upload
      const {data} = await axiosClient.post(
        "Upload/ConfirmUpload",
        confirmPayload,
      );

      PLToast({message: data.message, type: "success"});

      setIsUploaded("success");
    } catch (error: any) {
      const {message} = error?.response.data;
      PLToast({message: message, type: "success"});
      setIsUploaded("intial");
    }
  };

  //--> disabling button
  const [disabled, setDisabled] = useState<boolean>(true);

  //--> check to ensure all values are filled and enable button
  React.useEffect(() => {
    //--> check if the payload has be completely filled
    if (resume[0].name === "" || isUploaded !== "success") {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [resume, isUploaded]);

  return {
    //--> DOCUMENT UPLOAD SPECIFIC RETURNS
    pickDocument,
    isUploaded, //--> tracking uploading an cconfimation. Returns "false" , "success" , "loading"
    disabled, //--> use for the button state to track upload
    errors, //--> tracking errors in upload...use PLToast to see the messages
    userID, //--> userID gotten from local storage
    uri, //--> file uri
    docName, //--> document name ... ignore the resume term : |
    pdfUri,
    handlePdfPrint_Download,
  };
};
