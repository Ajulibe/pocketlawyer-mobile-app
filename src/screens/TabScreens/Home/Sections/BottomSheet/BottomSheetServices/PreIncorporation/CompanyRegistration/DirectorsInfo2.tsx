import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import React from "react";
import { Text, View, ScrollView } from "react-native";
import modalFormstyles from "../../ModalFormStyles";
import {
  DocUploadInterface,
  uploadFileToS3,
  pickFile,
} from "services/S3FileUploadHelper";
import { confirmUpload, transformMeta } from "services/UploadDocsService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { wp } from "utils/Dimensions";
import LoadingSpinner from "components/LoadingSpinner";
import { BottomSheetProps } from "../../../BottomSheetUtils/BottomSheetProps";
import {
  validateInputs,
  showError,
} from "../../../BottomSheetUtils/FormHelpers";

import {
  loadingReducer,
  loadingInitialState,
  LoadingActionType,
} from "../../../BottomSheetUtils/LoadingReducer";

const FormKeys = {
  firstName: "FirstName",
  lastName: "LastName",
  meansOfId: "MeansOfIdentification",
  idNo: "IdentityNumber",
  signature: "Signature",
};

interface Props extends BottomSheetProps {
  formTitle: string;
  subTitle: string;
  onSubmit: (meta: Array<any>) => void;
}

export function DirectorsInfo2(props: Props) {
  const { formTitle, service, subTitle, historyId } = props;
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

        props.onSubmit(formMeta);
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
    <View style={{ paddingBottom: 90 }}>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <ScrollView>
        <KeyboardAwareScrollView extraScrollHeight={wp(100)}>
          <Text style={globalStyles.H1Style}>{formTitle}</Text>
          <Text style={modalFormstyles.titleDesc}>{subTitle}</Text>
          <View>
            <Text style={modalFormstyles.inputLabel}>
              First Name
              <Text style={modalFormstyles.required}> *</Text>
            </Text>
            <Input
              placeholder="Type first name"
              errorText={formData?.[FormKeys.firstName]?.error}
              onChangeText={(text: string) => {
                handleTextChange({ field: FormKeys.firstName, value: text });
              }}
            />
            <View style={{ height: 16 }} />
            <Text style={modalFormstyles.inputLabel}>
              Last Name
              <Text style={modalFormstyles.required}>*</Text>
            </Text>
            <Input
              placeholder="Type last name"
              errorText={formData?.[FormKeys.lastName]?.error}
              onChangeText={(text: string) => {
                handleTextChange({ field: FormKeys.lastName, value: text });
              }}
            />
            <View style={{ height: 16 }} />
            <Text style={modalFormstyles.inputLabel}>
              Means of Identification
              <Text style={modalFormstyles.required}>*</Text>
            </Text>
            <Input
              placeholder="Select means of identification"
              errorText={formData?.[FormKeys.meansOfId]?.error}
              onChangeText={(text: string) => {
                handleTextChange({ field: FormKeys.meansOfId, value: text });
              }}
            />
            <View style={{ height: 16 }} />
            <Text style={modalFormstyles.inputLabel}>
              ID Number
              <Text style={modalFormstyles.required}>*</Text>
            </Text>
            <Input
              placeholder="Type identification number"
              errorText={formData?.[FormKeys.idNo]?.error}
              onChangeText={(text: string) => {
                handleTextChange({ field: FormKeys.idNo, value: text });
              }}
            />
            <View style={{ height: 16 }} />
            <Text style={modalFormstyles.inputLabel}>
              Signature
              <Text style={modalFormstyles.required}> *</Text>
            </Text>
            <Input
              onPress={() => uploadFile(FormKeys.signature)}
              errorText={formData?.[FormKeys.signature]?.error}
              dataValue={
                formData?.[FormKeys.signature]?.value ?? "Upload signature"
              }
              icon
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <View style={{ height: 16 }} />
      <CustomButton btnText="Next" onClick={submit} />
    </View>
  );
}
