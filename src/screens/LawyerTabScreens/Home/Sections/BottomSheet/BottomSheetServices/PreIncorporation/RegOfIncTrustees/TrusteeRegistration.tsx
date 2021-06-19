import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import React from "react";
import { Text, View, ScrollView } from "react-native";
import modalFormstyles from "../../ModalFormStyles";
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
import {
  DocUploadInterface,
  pickFile,
  uploadFileToS3,
} from "services/S3FileUploadHelper";

const FormKeys = {
  name1: "ProposedName1",
  name2: "ProposedName2",
  firstPub: "FirstPublication",
  secondPub: "SecondPublication",
  comapanySeal: "CompanySeal",
};
interface Props extends BottomSheetProps {
  formTitle: string;
  subTitle: string;
  onSubmit: (meta: Array<any>) => void;
}

export function TrusteeRegistration(props: Props) {
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
    <View style={modalFormstyles.formContainer} collapsable={false}>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <KeyboardAwareScrollView>
        <Text style={globalStyles.H1Style}>{formTitle}</Text>
        <Text style={modalFormstyles.titleDesc}>{subTitle}</Text>
        <Text style={modalFormstyles.inputLabel}>
          Proposed Name 1<Text style={modalFormstyles.required}>*</Text>
        </Text>
        <Input
          placeholder="Type business name 1"
          errorText={formData?.[FormKeys.name1]?.error}
          onChangeText={(text: string) => {
            handleTextChange({ field: FormKeys.name1, value: text });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          Proposed Name 2<Text style={modalFormstyles.required}>*</Text>
        </Text>
        <Input
          placeholder="Type business name 2"
          errorText={formData?.[FormKeys.name2]?.error}
          onChangeText={(text: string) => {
            handleTextChange({ field: FormKeys.name2, value: text });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          First Publication
          <Text style={modalFormstyles.required}>*</Text>
        </Text>
        <Input
          placeholder=""
          errorText={formData?.[FormKeys.firstPub]?.error}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text: string) => {
            handleTextChange({ field: FormKeys.firstPub, value: text });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          Company Seal
          <Text style={modalFormstyles.required}> *</Text>
        </Text>
        <Input
          onPress={() => uploadFile(FormKeys.comapanySeal)}
          errorText={formData?.[FormKeys.comapanySeal]?.error}
          dataValue={
            formData?.[FormKeys.comapanySeal]?.value ?? "Upload company seal"
          }
          icon
        />
      </KeyboardAwareScrollView>
      <View style={{ height: 16 }} />
      <CustomButton btnText="Next" onClick={submit} />
    </View>
  );
}
