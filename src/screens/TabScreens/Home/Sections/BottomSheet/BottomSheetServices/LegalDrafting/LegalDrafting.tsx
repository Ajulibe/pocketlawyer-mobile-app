import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import {ROUTES} from "navigation/Routes";
import React from "react";
import {Text, View} from "react-native";
import modalFormstyles from "../ModalFormStyles";
import {
  transformMeta,
  addMetadata,
  submitHistory,
} from "services/UploadDocsService";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
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
import {documentType} from "../../BottomSheetUtils/FormStaticData";
import ModalFormLabel from "../../BottomSheetUtils/ModalFormLabel";

const FormKeys = {
  documentType: "DocumentType",
  otherDocumentType: "OtherDocumentType",
  involvedParty: "InvolvedParties",
  docHighlight: "DocumentHighlights",
};
const OptionalKeys = {
  otherDocumentType: "OtherDocumentType",
  // involvedParty: "InvolvedParties",
};

export function LegalDrafting(props: BottomSheetProps) {
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
      },
      OptionalKeys,
    );
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
            handleTextChange({field: FormKeys.documentType, value: text});
          }}
        />
        {/* Show Others input field if others is selected */}
        {formData?.[FormKeys.documentType]?.value === "Others" && (
          <>
            <View style={{height: 8}} />
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
        <ModalFormLabel text="Who are the parties involved?" />
        <Input
          placeholder="Type parties involved"
          errorText={formData?.[FormKeys.involvedParty]?.error}
          onChangeText={(text: string) => {
            handleTextChange({field: FormKeys.involvedParty, value: text});
          }}
        />
        <ModalFormLabel text="Document Highlights" />
        <Input
          placeholder="Type points you want addressed in the document"
          errorText={formData?.[FormKeys.docHighlight]?.error}
          multiline={true}
          numberOfLines={3}
          onChangeText={(text: string) => {
            handleTextChange({field: FormKeys.docHighlight, value: text});
          }}
        />
      </KeyboardAwareScrollView>
      <View style={{height: 16}} />
      <CustomButton btnText="Submit" onClick={submit} />
    </View>
  );
}
