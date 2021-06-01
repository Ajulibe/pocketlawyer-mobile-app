import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import { ROUTES } from "navigation/Routes";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axiosClient from "utils/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import modalFormstyles from "../ModalFormStyles";
import { Service } from "database/DBData";
import { LawyerModel } from "models/Interfaces";

interface Props {
  navigation: any;
  closeModal: () => void;
  service: Service;
  lawyer: LawyerModel;
}

interface IState {
  BuisnessName1: string;
  BusinessName2: string;
  NatureOfBusiness: string;
  MeansOfIdentification: string;
  IDNumber: string;
  signatureUpload: string;
}

const initialState: IState = {
  BuisnessName1: "",
  BusinessName2: "",
  NatureOfBusiness: "",
  MeansOfIdentification: "",
  IDNumber: "",
  signatureUpload: "",
};

//--> action typings
enum ActionKind {
  addState = "ADD_STATE",
}

type Action = {
  type: ActionKind;
  payload: { field: string; value: string };
};

//---------------------------

function formReducer(state: IState, action: Action) {
  switch (action.type) {
    case ActionKind.addState:
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    default:
      return state;
  }
}

export const BusinessNameAndRegistration = ({
  navigation,
  closeModal,
  service,
  lawyer,
}: Props) => {
  const [state, dispatch] = React.useReducer(formReducer, initialState);
  console.log(lawyer, "state value");

  const [tempServiceHistoryID, setTempServiceHistoryID] =
    React.useState<string>("");

  const [isdisabled, setIsDisabled] = React.useState(true);

  const handleTextChange = (payload: { field: string; value: string }) => {
    dispatch({
      type: ActionKind.addState,
      payload,
    });
  };

  React.useEffect(() => {
    getTemporaryServiceHistoryID();
  });

  const getTemporaryServiceHistoryID = async () => {
    try {
      const userID = await AsyncStorage.getItem("userID");
      const payload = {
        ServiceCode: service.serviceCode,
        userID: userID,
      };
      const { data } = await axiosClient.post(
        "Service/InitiateServiceHistory",
        payload
      );
      console.log(data);

      //--> set the service history received
      // setTempServiceHistoryID()
    } catch (error) {}
  };

  const submit = async () => {
    if (tempServiceHistoryID === "") {
      setIsDisabled(true);
      return;
    }

    const payload = [
      {
        key: "BuisnessName1",
        value: state.BuisnessName1,
        section: "BusinessNameAndRegistration",
        userID: 1,
        tempServiceHistoryID: 1,
      },
      {
        key: "BusinessName2",
        value: state.BusinessName2,
        section: "BusinessNameAndRegistration",
        userID: 1,
        tempServiceHistoryID: 1,
      },
      {
        key: "NatureOfBusiness",
        value: state.NatureOfBusiness,
        section: "BusinessNameAndRegistration",
        userID: 1,
        tempServiceHistoryID: 1,
      },
      {
        key: "MeansOfIdentification",
        value: state.MeansOfIdentification,
        section: "BusinessNameAndRegistration",
        userID: 1,
        tempServiceHistoryID: 1,
      },
      {
        key: "IDNumber",
        value: state.IDNumber,
        section: "BusinessNameAndRegistration",
        userID: 1,
        tempServiceHistoryID: 1,
      },
      {
        key: "signatureUpload",
        value: state.signatureUpload,
        section: "BusinessNameAndRegistration",
        userID: 1,
        tempServiceHistoryID: 1,
      },
    ];
    try {
      const { data } = await axiosClient.post(
        "Service/AddMetadataHistory",
        payload
      );
      closeModal();
      navigation.navigate(ROUTES.CHECKOUT_SCREEN);
    } catch (error) {}
  };

  return (
    <View style={{ paddingBottom: 120 }}>
      <ScrollView>
        <Text style={globalStyles.H1Style}>{service.serviceName}</Text>
        <Text style={modalFormstyles.titleDesc}>
          Please fill the form with your proposed business details
        </Text>
        <Text style={modalFormstyles.inputLabel}>Proposed Business Name 1</Text>
        <Input
          placeholder="Type business name 1"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          onChangeText={(text: string) => {
            handleTextChange({ field: "BuisnessName1", value: text });
          }}
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>Proposed Business Name 2</Text>
        <Input
          placeholder="Type business name 2"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
          onChangeText={(text: string) => {
            handleTextChange({ field: "BuisnessName2", value: text });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>Nature of Business</Text>
        <Input
          placeholder="Type the business nature"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
          onChangeText={(text: string) => {
            handleTextChange({ field: "NatureOfBusiness", value: text });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>Means of Identification</Text>
        <Input
          placeholder="Select your means of identification"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
          onChangeText={(text: string) => {
            handleTextChange({ field: "MeansOfIdentification", value: text });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>ID Number</Text>
        <Input
          placeholder="Type identification number"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
          onChangeText={(text: string) => {
            handleTextChange({ field: "IDNumber", value: text });
          }}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>Signature</Text>
        <Input
          placeholder="Upload your signature"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
          onChangeText={(text: string) => {
            handleTextChange({ field: "signatureUpload", value: text });
          }}
        />
      </ScrollView>
      <View style={{ height: 16 }} />

      <CustomButton
        btnText="Submit"
        onClick={() => {
          submit;
          closeModal();
          navigation.navigate(ROUTES.CHECKOUT_SCREEN, {
            service: service,
            lawyer: lawyer,
          });
        }}
      />
    </View>
  );
};
