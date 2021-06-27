import AsyncStorageUtil from "utils/AsyncStorageUtil";
import axiosClient from "utils/axiosClient";
import { DocUploadResponse } from "services/S3FileUploadHelper";
import { ModalProps } from "screens/TabScreens/Home/Sections/BottomSheet/BottomSheetModal";
import { BottomSheetProps } from "screens/TabScreens/Home/Sections/BottomSheet/BottomSheetUtils/BottomSheetProps";

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
  console.log(response?.data?.data);
  
  return response?.data?.data ?? null;
};

//--> uploading metadata
export const submitHistory = async (props:BottomSheetProps) => {
  const { service, lawyer, historyId, amount } = props;
  const userId = await AsyncStorageUtil.getUserId();
  const userType = await AsyncStorageUtil.getUserType();
  const payload = {
    userID: Number(userId),
    serviceProvider: lawyer.name,
    tempServiceHistoryID: historyId,
    serviceProviderID: lawyer.serviceProviderID,
    serviceName: service.serviceName,
    serviceCode: service.serviceCode,
    categoryCode: service.categoryCode,
    amount: amount,
    userType: Number(userType),
    status: 1,
  };
  try {
    const { data } = await axiosClient.post(
      "Service/SubmitServiceHistory",
      payload
    );
    
    return data;
  } catch (error) {
    return error;
  }
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
  historyID: any,
  serviceCode:string
) => {
  const userId = await AsyncStorageUtil.getUserId();
  
  const arraypayload = [];

  for (const property in formData) {
    const data = formData[property];

    //--> For optional fields(keys)
    if (data==null) continue;

    data.userID = Number(userId);
    data.tempServiceHistoryID = historyID;
    data.section = serviceCode;

    arraypayload.push(data);
  }
  return arraypayload;
};
