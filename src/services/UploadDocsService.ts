import AsyncStorageUtil from "utils/AsyncStorageUtil";
import axiosClient from "utils/axiosClient";
import { DocUploadResponse } from "utils/FileUploads";

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
  const response = await axiosClient.post(
    "Upload/ConfirmUpload",
    payload
  );

  if (response == null) {
    return null;
  }
  return response?.data?.data?? null;
};
