import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import React from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const FormKeys1 = {
  firstName1: "FirstName1",
  lastName1: "LastName1",
  meansOfId1: "MeansOfIdentification1",
  idNo1: "IdentityNumber1",
  signature1: "Signature1",
};
const FormKeys2 = {
  firstName2: "FirstName2",
  lastName2: "LastName2",
  meansOfId2: "MeansOfIdentification2",
  idNo2: "IdentityNumber2",
  signature2: "Signature2",
};
const FormKeys3 = {
  firstName3: "FirstName3",
  lastName3: "LastName3",
  meansOfId3: "MeansOfIdentification3",
  idNo3: "IdentityNumber3",
  signature3: "Signature3",
};
const FormKeys4 = {
  firstName4: "FirstName4",
  lastName4: "LastName4",
  meansOfId4: "MeansOfIdentification4",
  idNo4: "IdentityNumber4",
  signature4: "Signature4",
};

const allFomKeys = [FormKeys1, FormKeys2, FormKeys3, FormKeys4];

interface Props extends BottomSheetProps {
  formTitle: string;
  subTitle: string;
  onSubmit: (meta: Array<any>) => void;
}

export function DirectorsInfo(props: Props) {
  const { formTitle, service, subTitle, historyId } = props;
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState
  );
  const [formData, setFormData] = React.useState<any>({});
  const [noOfDirectors, setNoOfDirectors] = React.useState<number>(1);

  const handleTextChange = (payload: { field: string; value: string }) => {
    setFormData((values: any) => ({
      ...values,
      [payload.field]: { key: payload.field, value: payload.value },
    }));
  };

  //--> Submit From
  const submit = () => {
    const fKeys = {
      ...allFomKeys[0],
      ...allFomKeys[1],
      ...allFomKeys[2],
      ...allFomKeys[3],
    };
    const k = [...Array(noOfDirectors).keys()].map((v, index) => ({
      ...allFomKeys[index],
    }));
    // console.log(k);
    // return;

    validateInputs(fKeys, formData, async (newData, isError) => {
      console.log(newData);

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
  const addNewDir = () => {
    if (noOfDirectors <= 10) {
      setNoOfDirectors((prev) => prev + 1);
    }
  };
  const removeDir = () => {
    if (noOfDirectors > 1) {
      setNoOfDirectors((prev) => prev - 1);
    }
  };

  return (
    <View style={{ paddingBottom: 90 }}>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <ScrollView>
        <KeyboardAwareScrollView
          extraScrollHeight={wp(100)}
          keyboardShouldPersistTaps={"handled"}
        >
          <Text style={globalStyles.H1Style}>{formTitle}</Text>
          <Text style={modalFormstyles.titleDesc}>{subTitle}</Text>

          {[...Array(noOfDirectors).keys()].map((item, index) => {
            const idx = index + 1;
            const FormKeys = allFomKeys[index];

            return (
              <View key={`${index}`}>
                <Text style={modalFormstyles.subHeader}>
                  Director's Information {idx}
                </Text>

                <Text style={modalFormstyles.inputLabel}>
                  First Name
                  <Text style={modalFormstyles.required}> *</Text>
                </Text>
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
                <View style={{ height: 16 }} />
                <Text style={modalFormstyles.inputLabel}>
                  Last Name
                  <Text style={modalFormstyles.required}>*</Text>
                </Text>
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
                <View style={{ height: 16 }} />
                <Text style={modalFormstyles.inputLabel}>
                  Means of Identification
                  <Text style={modalFormstyles.required}>*</Text>
                </Text>
                <Input
                  placeholder="Select means of identification"
                  errorText={formData?.[FormKeys?.[`meansOfId${idx}`]]?.error}
                  onChangeText={(text: string) => {
                    handleTextChange({
                      field: FormKeys?.[`meansOfId${idx}`],
                      value: text,
                    });
                  }}
                />
                <View style={{ height: 16 }} />
                <Text style={modalFormstyles.inputLabel}>
                  ID Number
                  <Text style={modalFormstyles.required}>*</Text>
                </Text>
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
                <View style={{ height: 16 }} />
                <Text style={modalFormstyles.inputLabel}>
                  Signature
                  <Text style={modalFormstyles.required}> *</Text>
                </Text>
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
            <TouchableOpacity
              style={modalFormstyles.addMoreBtn}
              onPress={() => addNewDir()}
            >
              <Ionicons name="ios-add" size={18} color="black" />
              <Text style={modalFormstyles.addText}>Add New Director</Text>
            </TouchableOpacity>
            {noOfDirectors > 1 && (
              <TouchableOpacity
                style={modalFormstyles.addMoreBtn}
                onPress={() => removeDir()}
              >
                <MaterialCommunityIcons name="minus" size={18} color="black" />
                <Text style={modalFormstyles.addText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <View style={{ height: 16 }} />
      <CustomButton btnText="Next" onClick={submit} />
    </View>
  );
}
