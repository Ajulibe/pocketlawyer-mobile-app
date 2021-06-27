import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import modalFormstyles from "../../ModalFormStyles";
import {
  DocUploadInterface,
  uploadFileToS3,
  pickFile,
} from "services/S3FileUploadHelper";
import { confirmUpload, transformMeta } from "services/UploadDocsService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "utils/Colors";
import { meansOfIdentification } from "../../../BottomSheetUtils/FormStaticData";
import PickerInput from "components/PickerInput";
import ModalFormLabel from "../../../BottomSheetUtils/ModalFormLabel";

const allFomKeys = [...Array(30).keys()].map((item, index) => {
  const idx = index + 1;
  return {
    ...{
      [`firstName${idx}`]: `ShareholderFirstName${idx}`,
      [`lastName${idx}`]: `ShareholderLastName${idx}`,
      [`meansOfId${idx}`]: `ShareholderMeansOfIdentification${idx}`,
      [`idNo${idx}`]: `ShareholderIdentityNumber${idx}`,
      [`signature${idx}`]: `ShareholderSignature${idx}`,
    },
  };
});

interface Props extends BottomSheetProps {
  formTitle: string;
  subTitle: string;
  onSubmit: (meta: Array<any>) => void;
}

export function ShareholdersInfo(props: Props) {
  const { formTitle, service, subTitle, historyId } = props;
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState
  );
  const [formData, setFormData] = React.useState<any>({});
  const [noOfShareholder, setNoOfShareholder] = React.useState<number>(2);

  const handleTextChange = (payload: { field: string; value: string }) => {
    setFormData((values: any) => ({
      ...values,
      [payload.field]: { key: payload.field, value: payload.value },
    }));
  };

  //--> Submit From
  //:--> https://stackoverflow.com/questions/27538349/merge-multiple-objects-inside-the-same-array-into-one-object
  const submit = () => {
    const getNoOfDirKeys = [...Array(noOfShareholder).keys()].map(
      (v, index) => ({
        ...allFomKeys[index],
      })
    );
    const fKeys = getNoOfDirKeys.reduce((r, c) => Object.assign(r, c), {});

    validateInputs(fKeys, formData, async (newData, isError) => {
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
  const addNew = () => {
    if (noOfShareholder < allFomKeys.length) {
      setNoOfShareholder((prev) => prev + 1);
    }
  };
  const remove = () => {
    if (noOfShareholder > 2) {
      setNoOfShareholder((prev) => prev - 1);
    }
  };

  return (
    <View style={modalFormstyles.formContainer} collapsable={false}>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <KeyboardAwareScrollView
        // extraScrollHeight={wp(20)}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={globalStyles.H1Style}>{formTitle}</Text>
        <Text style={modalFormstyles.titleDesc}>{subTitle}</Text>

        {[...Array(noOfShareholder).keys()].map((item, index) => {
          const idx = index + 1;
          const FormKeys = allFomKeys[index];

          return (
            <View key={`${index}`}>
              <Text style={modalFormstyles.subHeader}>
                Shareholder's Information {idx}
              </Text>

              <ModalFormLabel text="First Name" giveMargin={false} />
              <Input
                placeholder="Type first name"
                errorText={formData?.[FormKeys?.[`firstName${idx}`]]?.error}
                onChangeText={(text: string) => {
                  handleTextChange({
                    field: FormKeys?.[`firstName${idx}`],
                    value: text,
                  });
                }}
              />
              <ModalFormLabel text="Last Name" />
              <Input
                placeholder="Type last name"
                errorText={formData?.[FormKeys?.[`lastName${idx}`]]?.error}
                onChangeText={(text: string) => {
                  handleTextChange({
                    field: FormKeys?.[`lastName${idx}`],
                    value: text,
                  });
                }}
              />
              <ModalFormLabel text="Means of Identification" />
              <PickerInput
                data={meansOfIdentification}
                errorText={formData?.[FormKeys?.[`meansOfId${idx}`]]?.error}
                dataValue={
                  formData?.[FormKeys?.[`meansOfId${idx}`]]?.value ??
                  "Select your means of Identification"
                }
                onSelectChange={(text: string) => {
                  handleTextChange({
                    field: FormKeys?.[`meansOfId${idx}`],
                    value: text,
                  });
                }}
              />
              <ModalFormLabel text="ID Number" />
              <Input
                placeholder="Type identification number"
                errorText={formData?.[FormKeys?.[`idNo${idx}`]]?.error}
                onChangeText={(text: string) => {
                  handleTextChange({
                    field: FormKeys?.[`idNo${idx}`],
                    value: text,
                  });
                }}
              />
              <ModalFormLabel text="Signature" />
              <Input
                onPress={() => uploadFile(FormKeys?.[`signature${idx}`])}
                errorText={formData?.[FormKeys?.[`signature${idx}`]]?.error}
                dataValue={
                  formData?.[FormKeys?.[`signature${idx}`]]?.value ??
                  "Upload signature"
                }
                icon
              />
              <View style={{ height: 16 }} />
            </View>
          );
        })}
        <View style={modalFormstyles.addMoreWrapper}>
          {noOfShareholder < allFomKeys.length ? (
            <TouchableOpacity
              style={modalFormstyles.addMoreBtn}
              onPress={() => addNew()}
            >
              <Ionicons name="ios-add" size={18} color={COLORS.light.primary} />
              <Text style={modalFormstyles.addText}>Add New</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {noOfShareholder > 2 && (
            <TouchableOpacity
              style={modalFormstyles.addMoreBtn}
              onPress={() => remove()}
            >
              <MaterialCommunityIcons
                name="minus"
                size={18}
                color={COLORS.light.primary}
              />
              <Text style={modalFormstyles.addText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
      <View style={{ height: 16 }} />
      <CustomButton btnText="Next" onClick={submit} />
    </View>
  );
}
