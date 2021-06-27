import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import { ROUTES } from "navigation/Routes";
import React from "react";
import { Text, View, ScrollView } from "react-native";
import modalFormstyles from "../ModalFormStyles";
import {
  DocUploadInterface,
  uploadFileToS3,
  pickFile,
} from "services/S3FileUploadHelper";
import {
  confirmUpload,
  transformMeta,
  addMetadata,
  submitHistory,
} from "services/UploadDocsService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { wp } from "utils/Dimensions";
import LoadingSpinner from "components/LoadingSpinner";
import { BottomSheetProps } from "../../BottomSheetUtils/BottomSheetProps";
import {
  validateInputs,
  showError,
  showSuccess,
} from "../../BottomSheetUtils/FormHelpers";
import {
  loadingReducer,
  loadingInitialState,
  LoadingActionType,
} from "../../BottomSheetUtils/LoadingReducer";
import ModalFormLabel from "../../BottomSheetUtils/ModalFormLabel";

const FormKeys = {
  companyName: "CompanyName",
  companyRegNo: "CompanyRegistrationNumber",
  meansOfId: "MeansOfIdentification",
  newAddr: "NewAddress",
  oldAddr: "OldAddress",
};
export function ChangeOfRegisteredAddr(props: BottomSheetProps) {
  const { navigation, closeModal, service, lawyer, historyId } = props;
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState
  );
  const [formData, setFormData] = React.useState<any>({});

  const handleTextChange = (payload: { field: string; value: string }) => {
    setFormData((values: any) => ({
      ...values,
      [payload.field]: { key: payload.field, value: payload.value },
    }));
  };

  //--> Submit From
  const submit = () => {
    validateInputs(FormKeys, formData, async (newData, isError) => {
      setFormData(newData);
      if (isError) {
        showError("Error(s) encountered!");
      } else {
        const formMeta = await transformMeta(
          newData,
          historyId,
          service.serviceCode
        );

        loadingDispatch({
          type: LoadingActionType.SHOW_WITH_CONTENT,
          payload: { content: "Submiting, please wait..." },
        });
        const submit = await addMetadata(formMeta);
        loadingDispatch({ type: LoadingActionType.HIDE });
        if (submit === 200) {
          //--> Submit Service
          try {
            const response = await submitHistory(props);
            if (response?.status === 200) {
              //--> Redirect to checkout
              closeModal();
              showSuccess("Submitted Successfully");
              const newProps = {
                ...props,
                serviceHistoryID: response?.data?.serviceHistoryID,
              };
              navigation.navigate(ROUTES.CHECKOUT_SCREEN, {
                ...newProps,
              });
            } else {
              showError("An error occured");
            }
          } catch (error) {
            showError(`Error occured: ${error}`);
          }
        } else {
          showError("Error in your network connection, try again");
        }
      }
    });
  };

  const uploadFile = async (field: string) => {
    const payload: DocUploadInterface = {
      fileType: 2,
      isfor: field,
      Section: service.serviceCode,
      HistoryID: historyId,
    };

    const pickedFile = await pickFile();
    if (pickedFile != null) {
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
          handleTextChange({ field: field, value: confirm?.url });
        }
      }
    }
  };

  return (
    <View style={modalFormstyles.formContainer}>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <ScrollView>
        <KeyboardAwareScrollView extraScrollHeight={wp(100)}>
          <Text style={globalStyles.H1Style}>{service.serviceName}</Text>
          <Text style={modalFormstyles.titleDesc}>
            Please fill the form with your proposed business details
          </Text>
          <ModalFormLabel text="Type company name" giveMargin={false} />
          <Input
            placeholder=""
            errorText={formData?.[FormKeys.companyName]?.error}
            onChangeText={(text: string) => {
              handleTextChange({ field: FormKeys.companyName, value: text });
            }}
          />
          <ModalFormLabel text="Company Registration Number" />
          <Input
            placeholder="Type company registration number "
            errorText={formData?.[FormKeys.companyRegNo]?.error}
            onChangeText={(text: string) => {
              handleTextChange({ field: FormKeys.companyRegNo, value: text });
            }}
          />
          <ModalFormLabel text="Means of Identification" />
          <Input
            onPress={() => uploadFile(FormKeys.meansOfId)}
            errorText={formData?.[FormKeys.meansOfId]?.error}
            dataValue={
              formData?.[FormKeys.meansOfId]?.value ??
              "Upload means of identification"
            }
            icon
          />
          <ModalFormLabel text="New Address of Company" />
          <Input
            placeholder="Type new address of company"
            errorText={formData?.[FormKeys.newAddr]?.error}
            onChangeText={(text: string) => {
              handleTextChange({ field: FormKeys.newAddr, value: text });
            }}
          />
          <ModalFormLabel text="Old Address of Company" />
          <Input
            placeholder="Type old address of company"
            errorText={formData?.[FormKeys.oldAddr]?.error}
            onChangeText={(text: string) => {
              handleTextChange({ field: FormKeys.oldAddr, value: text });
            }}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
      <View style={{ height: 16 }} />
      <CustomButton btnText="Submit" onClick={submit} />
    </View>
  );
}
