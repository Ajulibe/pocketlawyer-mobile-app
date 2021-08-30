import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import React from "react";
import {Text, View, ScrollView} from "react-native";
import modalFormstyles from "../../ModalFormStyles";
import {transformMeta} from "services/UploadDocsService";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {wp} from "utils/Dimensions";
import LoadingSpinner from "components/LoadingSpinner/index.component";
import {BottomSheetProps} from "../../../BottomSheetUtils/BottomSheetProps";
import {validateInputs, showError} from "../../../BottomSheetUtils/FormHelpers";
import {
  loadingReducer,
  loadingInitialState,
} from "../../../BottomSheetUtils/LoadingReducer";
import PickerInput from "components/PickerInput";
import {shareCapital} from "../../../BottomSheetUtils/FormStaticData";
import ModalFormLabel from "../../../BottomSheetUtils/ModalFormLabel";

const FormKeys = {
  name1: "BuisnessNameOne",
  name2: "BusinessNameTwo",
  desc: "BusinessDescription",
  shareCapital: "ShareCapital",
};
interface Props extends BottomSheetProps {
  formTitle: string;
  subTitle: string;
  onSubmit: (meta: Array<any>) => void;
}

export function CompReg(props: Props) {
  const {formTitle, service, subTitle, historyId} = props;
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
          service.serviceCode!,
        );

        props.onSubmit(formMeta);
      }
    });
  };

  return (
    <View style={modalFormstyles.formContainer} collapsable={false}>
      <LoadingSpinner
        modalVisible={loadingState.isVisible ?? false}
        content={loadingState.content}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Text style={globalStyles.H1Style}>{formTitle}</Text>
        <Text style={modalFormstyles.titleDesc}>{subTitle}</Text>

        <ModalFormLabel text="Proposed Business Name 1" giveMargin={false} />
        <Input
          placeholder="Type business name 1"
          errorText={formData?.[FormKeys.name1]?.error}
          onChangeText={(text: string) => {
            handleTextChange({field: FormKeys.name1, value: text});
          }}
        />
        <ModalFormLabel text="Proposed Business Name 2" />
        <Input
          placeholder="Type business name 2"
          errorText={formData?.[FormKeys.name2]?.error}
          onChangeText={(text: string) => {
            handleTextChange({field: FormKeys.name2, value: text});
          }}
        />
        <ModalFormLabel text="Brief Description of Business" />
        <Input
          placeholder=""
          errorText={formData?.[FormKeys.desc]?.error}
          multiline={true}
          numberOfLines={3}
          onChangeText={(text: string) => {
            handleTextChange({field: FormKeys.desc, value: text});
          }}
        />
        <ModalFormLabel text="Proposed Share Capital" />
        <PickerInput
          data={shareCapital}
          errorText={formData?.[FormKeys.shareCapital]?.error}
          dataValue={
            formData?.[FormKeys.shareCapital]?.value ??
            "Select your shared capital"
          }
          onSelectChange={(text: string) => {
            handleTextChange({field: FormKeys.shareCapital, value: text});
          }}
        />
        <View style={{height: 36}} />
        <CustomButton btnText="Next" onClick={submit} />
      </KeyboardAwareScrollView>
    </View>
  );
}
