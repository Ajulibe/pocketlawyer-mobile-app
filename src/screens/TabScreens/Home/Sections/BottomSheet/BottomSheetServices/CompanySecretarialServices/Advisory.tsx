import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import {ROUTES} from "navigation/Routes";
import React from "react";
import {Text, View, ScrollView} from "react-native";
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
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {wp} from "utils/Dimensions";
import LoadingSpinner from "components/LoadingSpinner/index.component";
import {BottomSheetProps} from "../../BottomSheetUtils/BottomSheetProps";
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
import {contractDuration} from "../../BottomSheetUtils/FormStaticData";
import ModalFormLabel from "../../BottomSheetUtils/ModalFormLabel";

const FormKeys = {
  name: "BusinessName",
  sector: "BusinessSector",
  duration: "ContractDuration",
  certOfReg: "CertificateOfRegistration",
  certOfInc: "CertificateOfIncorporation",
  memAndArtOfAssoc: "MemorandumAndArticlesOfAssociation",
};
export function Advisory(props: BottomSheetProps) {
  const {navigation, closeModal, service, lawyer, historyId, amount} = props;
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState,
  );
  const [formData, setFormData] = React.useState<any>({});

  const handleTextChange = (payload: {field: string; value: string}) => {
    setFormData((values: any) => ({
      ...values,
      [payload.field]: {key: payload.field, value: payload.value},
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
          service.serviceCode,
        );

        loadingDispatch({
          type: LoadingActionType.SHOW_WITH_CONTENT,
          payload: {content: "Submiting, please wait..."},
        });
        const submit = await addMetadata(formMeta);
        loadingDispatch({type: LoadingActionType.HIDE});
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
        payload: {content: "Uploading file..."},
      });
      const upload = await uploadFileToS3(payload, pickedFile);
      if (upload == null) {
        showError("Error occured while uploading, try again...");
      } else {
        const confirm = await confirmUpload(upload);
        loadingDispatch({type: LoadingActionType.HIDE});
        if (confirm == null || confirm?.url == null) {
          showError("Error occured while uploading, try again...");
        } else {
          handleTextChange({field: field, value: confirm?.url});
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
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={globalStyles.H1Style}>{service.serviceName}</Text>
        <Text style={modalFormstyles.titleDesc}>
          Please fill the form with your proposed business details
        </Text>

        <ModalFormLabel text="Business Name" giveMargin={false} />
        <Input
          placeholder="Type business name"
          errorText={formData?.[FormKeys.name]?.error}
          onChangeText={(text: string) => {
            handleTextChange({field: FormKeys.name, value: text});
          }}
        />
        <ModalFormLabel text="Business Sector" />
        <Input
          placeholder="Enter business sector"
          errorText={formData?.[FormKeys.sector]?.error}
          onChangeText={(text: string) => {
            handleTextChange({field: FormKeys.sector, value: text});
          }}
        />
        <ModalFormLabel text="Contract Duration" />
        <PickerInput
          data={contractDuration}
          errorText={formData?.[FormKeys.duration]?.error}
          dataValue={
            formData?.[FormKeys.duration]?.value ?? "Select contract duration"
          }
          onSelectChange={(text: string) => {
            handleTextChange({field: FormKeys.duration, value: text});
          }}
        />
        <ModalFormLabel text="Certificate of Registration (SMEs)" />
        <Input
          onPress={() => uploadFile(FormKeys.certOfReg)}
          errorText={formData?.[FormKeys.certOfReg]?.error}
          dataValue={formData?.[FormKeys.certOfReg]?.value ?? "Select file"}
          icon
        />
        <ModalFormLabel text="Certificate of Incorporation (Companies)" />
        <Input
          onPress={() => uploadFile(FormKeys.certOfInc)}
          errorText={formData?.[FormKeys.certOfInc]?.error}
          dataValue={formData?.[FormKeys.certOfInc]?.value ?? "Select file"}
          icon
        />
        <ModalFormLabel text="Memorandum and Articles of Association" />
        <Input
          onPress={() => uploadFile(FormKeys.memAndArtOfAssoc)}
          errorText={formData?.[FormKeys.memAndArtOfAssoc]?.error}
          dataValue={
            formData?.[FormKeys.memAndArtOfAssoc]?.value ?? "Select file"
          }
          icon
        />
      </KeyboardAwareScrollView>
      <View style={{height: 16}} />
      <CustomButton btnText="Submit" onClick={submit} />
    </View>
  );
}
