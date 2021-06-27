import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import { ROUTES } from "navigation/Routes";
import React from "react";
import { Text, View } from "react-native";
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
import PickerInput from "components/PickerInput";
import { documentType } from "../../BottomSheetUtils/FormStaticData";
import ModalFormLabel from "../../BottomSheetUtils/ModalFormLabel";

const FormKeys = {
  documentType: "DocumentType",
  otherDocumentType: "OtherDocumentType",
  industrySector: "Industry-Sector",
  noOfPages: "NoOfPages",
  uploadedDocument: "UploadedDocument",
};
export function ReviewOfLegalDocs(props: BottomSheetProps) {
  const { navigation, closeModal, service, lawyer, historyId, amount } = props;
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
    let OptionalKeys = {};
    if (formData?.[FormKeys.documentType]?.value === "Others") {
      OptionalKeys = {};
    } else {
      OptionalKeys = {
        otherDocumentType: "OtherDocumentType",
      };
    }
    validateInputs(
      FormKeys,
      formData,
      async (newData, isError) => {
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
      },
      OptionalKeys
    );
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
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Text style={globalStyles.H1Style}>{service.serviceName}</Text>
        <Text style={modalFormstyles.titleDesc}>
          Please fill the form with your proposed business details
        </Text>

        <ModalFormLabel text="Document Type" giveMargin={false} />
        <PickerInput
          data={documentType}
          errorText={formData?.[FormKeys.documentType]?.error}
          dataValue={
            formData?.[FormKeys.documentType]?.value ?? "Select document type"
          }
          onSelectChange={(text: string) => {
            handleTextChange({ field: FormKeys.documentType, value: text });
          }}
        />
        {/* Show Others input field if others is selected */}
        {formData?.[FormKeys.documentType]?.value === "Others" && (
          <>
            <View style={{ height: 8 }} />
            <Input
              placeholder="Type document type"
              errorText={formData?.[FormKeys.otherDocumentType]?.error}
              onChangeText={(text: string) => {
                handleTextChange({
                  field: FormKeys.otherDocumentType,
                  value: text,
                });
              }}
            />
          </>
        )}
        <ModalFormLabel text="Industry/Sector" />
        <Input
          placeholder="Type industry/sector  "
          errorText={formData?.[FormKeys.industrySector]?.error}
          onChangeText={(text: string) => {
            handleTextChange({ field: FormKeys.industrySector, value: text });
          }}
        />
        <ModalFormLabel text="Number of Pages" />
        <Input
          placeholder="Type the number of pages"
          errorText={formData?.[FormKeys.noOfPages]?.error}
          onChangeText={(text: string) => {
            handleTextChange({ field: FormKeys.noOfPages, value: text });
          }}
        />
        <ModalFormLabel text="Upload Document" />
        <Input
          onPress={() => uploadFile(FormKeys.uploadedDocument)}
          errorText={formData?.[FormKeys.uploadedDocument]?.error}
          dataValue={
            formData?.[FormKeys.uploadedDocument]?.value ?? "Upload Document"
          }
          icon
        />
      </KeyboardAwareScrollView>
      <View style={{ height: 16 }} />
      <CustomButton btnText="Submit" onClick={submit} />
    </View>
  );
}
