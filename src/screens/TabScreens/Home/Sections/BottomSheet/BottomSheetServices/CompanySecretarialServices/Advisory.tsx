import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import { useDocUpload } from "hooks/useDocUpload";
import { ROUTES } from "navigation/Routes";
import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Value } from "react-native-reanimated";
import modalFormstyles from "../ModalFormStyles";
import {
  DocUploadInterface,
  pickAndUploadFile,
} from "services/S3FileUploadHelper";
import { Service } from "database/DBData";
import { LawyerModel } from "models/Interfaces";
import { confirmUpload, getHistoryId } from "services/UploadDocsService";

interface Props {
  navigation: any;
  closeModal: () => void;
  service: Service;
  lawyer: LawyerModel;
}

export function Advisory(props: Props) {
  const { navigation, closeModal, service, lawyer } = props;

  const [formData, setFormData] = React.useState({});
  const { pickDocument, isUploaded, disabled, docName } = useDocUpload(
    "signature",
    "Business Name registration"
  );

  const handleTextChange = (payload: { field: string; value: string }) => {
    setFormData((values) => ({
      ...values,
      [payload.field]: { key: payload.field, value: payload.value },
    }));
  };

  const submit = () => {
    console.log(formData);

    if (formData == null) {
    } else {
      // closeModal();
      // navigation.navigate(ROUTES.CHECKOUT_SCREEN);
    }
  };

  const uploadFile = async (field: string) => {
    const historyID = await getHistoryId(service.categoryCode);
    if (historyID == null) {
      console.log("Error initiating the history ID");
      return;
    }
    const payload: DocUploadInterface = {
      fileType: 2,
      isfor: field ?? "FieldValue",
      Section: service.serviceCode,
      HistoryID: historyID ?? 12,
    };
    const upload = await pickAndUploadFile(payload);
    if (upload == null) {
      console.log("Error");
    } else {
      console.log(upload);
      const confirm = await confirmUpload(upload);
      console.log(confirm);
    }
  };

  return (
    <View style={{ paddingBottom: 120 }}>
      <ScrollView>
        <Text style={globalStyles.H1Style}>Advisory</Text>
        <Text style={modalFormstyles.titleDesc}>
          Please fill the form with your proposed business details
        </Text>
        <Text style={modalFormstyles.inputLabel}>
          Business Name <Text style={modalFormstyles.required}>*</Text>
        </Text>
        <Input
          placeholder="Type business name"
          errorText={""}
          onChangeText={(text: string) => {
            handleTextChange({ field: "BusinessName", value: text });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          Business Sector <Text style={modalFormstyles.required}>*</Text>
        </Text>
        <Input
          placeholder="Enter business sector"
          errorText={""}
          onChangeText={(text: string) => {
            handleTextChange({ field: "BusinessSector", value: text });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          Contract Duration <Text style={modalFormstyles.required}>*</Text>
        </Text>
        <Input
          placeholder="Select contract duration"
          errorText={""}
          onChangeText={(text: string) => {
            handleTextChange({ field: "ContractDuration", value: text });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          Certificate of Registration (SMEs)
          <Text style={modalFormstyles.required}>*</Text>
        </Text>
        <Input
          onPress={() => uploadFile("CertificateOfRegistration")}
          dataValue={docName}
          icon
          onChangeText={(text: string) => {
            handleTextChange({
              field: "CertificateOfRegistration",
              value: text,
            });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          Certificate of Incorporation (Companies)
          <Text style={modalFormstyles.required}>*</Text>
        </Text>
        <Input
          onPress={pickDocument}
          dataValue={docName}
          icon
          onChangeText={(text: string) => {
            handleTextChange({
              field: "CertificateOfIncorporation",
              value: text,
            });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          Memorandum and Articles of Association
          <Text style={modalFormstyles.required}> *</Text>
        </Text>
        <Input
          onPress={pickDocument}
          dataValue={docName}
          icon
          onChangeText={(text: string) => {
            handleTextChange({
              field: "MemorandumAndArticlesOfAssociation",
              value: text,
            });
          }}
        />
      </ScrollView>
      <View style={{ height: 16 }} />
      <CustomButton btnText="Submit" onClick={submit} />
    </View>
  );
}
