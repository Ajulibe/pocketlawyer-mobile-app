import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import {ROUTES} from "navigation/Routes";
import React from "react";
import {Text, View, ScrollView, TouchableOpacity} from "react-native";
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
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import COLORS from "utils/Colors";
import PickerInput from "components/PickerInput";
import {meansOfIdentification} from "../../BottomSheetUtils/FormStaticData";
import ModalFormLabel from "../../BottomSheetUtils/ModalFormLabel";

const allFomKeys = [...Array(10).keys()].map((item, index) => {
  const idx = index + 1;
  return {
    ...{
      [`companyName${idx}`]: `CompanyName${idx}`,
      [`companyRegNo${idx}`]: `CompanyRegistrationNumber${idx}`,
      [`uploadMeansOfId${idx}`]: `UploadMeansOfIdentification${idx}`,
      [`nameOfNewDirector${idx}`]: `NameOfNewDirector${idx}`,
      [`meansOfId${idx}`]: `MeansOfIdentification${idx}`,
      [`idNo${idx}`]: `IdentityNumber${idx}`,
      [`signature${idx}`]: `Signature${idx}`,
    },
  };
});

export function NoticeOfChangeOfDirector(props: BottomSheetProps) {
  const {navigation, closeModal, service, lawyer, historyId} = props;
  const [loadingState, loadingDispatch] = React.useReducer(
    loadingReducer,
    loadingInitialState,
  );
  const [formData, setFormData] = React.useState<any>({});
  const [noOfDirector, setNoOfDirector] = React.useState<number>(1);

  const handleTextChange = (payload: {field: string; value: string}) => {
    setFormData((values: any) => ({
      ...values,
      [payload.field]: {key: payload.field, value: payload.value},
    }));
  };

  //--> Submit From
  const submit = () => {
    const getNoOfDirKeys = [...Array(noOfDirector).keys()].map((v, index) => ({
      ...allFomKeys[index],
    }));
    const fKeys = getNoOfDirKeys.reduce((r, c) => Object.assign(r, c), {});

    validateInputs(fKeys, formData, async (newData, isError) => {
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

  const addNew = () => {
    if (noOfDirector < allFomKeys.length) {
      setNoOfDirector((prev) => prev + 1);
    }
  };
  const remove = () => {
    if (noOfDirector > 1) {
      setNoOfDirector((prev) => prev - 1);
    }
  };
  return (
    <View style={modalFormstyles.formContainer}>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={globalStyles.H1Style}>{service.serviceName}</Text>
          <Text style={modalFormstyles.titleDesc}>
            Please fill the form with the required details
          </Text>

          {[...Array(noOfDirector).keys()].map((item, index) => {
            const idx = index + 1;
            const FormKeys = allFomKeys[index];

            return (
              <View key={`${index}`}>
                <Text style={modalFormstyles.subHeader}>
                  Director's Info {idx}
                </Text>

                <ModalFormLabel text="Company Name" giveMargin={false} />
                <Input
                  placeholder="Type company name"
                  errorText={formData?.[FormKeys?.[`companyName${idx}`]]?.error}
                  onChangeText={(text: string) => {
                    handleTextChange({
                      field: FormKeys?.[`companyName${idx}`],
                      value: text,
                    });
                  }}
                />
                <ModalFormLabel text="Company Registration Number" />
                <Input
                  placeholder="Type company registration number"
                  errorText={
                    formData?.[FormKeys?.[`companyRegNo${idx}`]]?.error
                  }
                  onChangeText={(text: string) => {
                    handleTextChange({
                      field: FormKeys?.[`companyRegNo${idx}`],
                      value: text,
                    });
                  }}
                />
                <ModalFormLabel text="Name of New Director" />
                <Input
                  placeholder="Type name of new director"
                  errorText={
                    formData?.[FormKeys?.[`nameOfNewDirector${idx}`]]?.error
                  }
                  onChangeText={(text: string) => {
                    handleTextChange({
                      field: FormKeys?.[`nameOfNewDirector${idx}`],
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
                <ModalFormLabel text="Upload Means of Identification" />
                <Input
                  onPress={() =>
                    uploadFile(FormKeys?.[`uploadMeansOfId${idx}`])
                  }
                  errorText={
                    formData?.[FormKeys?.[`uploadMeansOfId${idx}`]]?.error
                  }
                  dataValue={
                    formData?.[FormKeys?.[`uploadMeansOfId${idx}`]]?.value ??
                    "Upload means of identification"
                  }
                  icon
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
                <View style={{height: 16}} />
              </View>
            );
          })}
          <View style={modalFormstyles.addMoreWrapper}>
            {noOfDirector < allFomKeys.length ? (
              <TouchableOpacity
                style={modalFormstyles.addMoreBtn}
                onPress={() => addNew()}>
                <Ionicons
                  name="ios-add"
                  size={18}
                  color={COLORS.light.primary}
                />
                <Text style={modalFormstyles.addText}>Add New Director</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            {noOfDirector > 1 && (
              <TouchableOpacity
                style={modalFormstyles.addMoreBtn}
                onPress={() => remove()}>
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
      </ScrollView>
      <View style={{height: 16}} />
      <CustomButton btnText="Submit" onClick={submit} />
    </View>
  );
}
