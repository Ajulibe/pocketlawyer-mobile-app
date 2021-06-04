import AsyncStorageUtil from "utils/AsyncStorageUtil";
import axiosClient from "utils/axiosClient";
import { DocUploadResponse } from "services/S3FileUploadHelper";

export const getHistoryId = async (
  serviceCode: string
): Promise<number | null> => {
  const userId = await AsyncStorageUtil.getUserId();
  const data = {
    ServiceCode: serviceCode,
    userID: Number(userId),
  };
  const getHistory = await axiosClient.post(
    "Service/InitiateServiceHistory",
    data
  );
  if (getHistory == null) {
    return null;
  }
  return getHistory?.data?.data?.tempServiceHistoryID ?? null;
};

export const confirmUpload = async (
  payload: DocUploadResponse
): Promise<any> => {
  const response = await axiosClient.post("Upload/ConfirmUpload", payload);

  if (response == null) {
    return null;
  }
  return response?.data?.data ?? null;
};

//--> uploading metadata
export const addMetadata = async (payload: any) => {
  try {
    const { data } = await axiosClient.post(
      "Service/AddMetadataHistory",
      payload
    );
    return data.status;
  } catch (error) {
    return error;
  }
};

//--> transform metaPayload
export const transformMeta = async (
  formData: any,
  tempServiceHistoryID: any
) => {
  const userId = await AsyncStorageUtil.getUserId();
  const arraypayload = [];

  for (const property in formData) {
    const data = formData[property];

    data.userID = Number(userId);
    data.tempServiceHistoryID = tempServiceHistoryID;
    data.section = "BusinessNameAndRegistration";

    arraypayload.push(data);
  }
  return arraypayload;
};
