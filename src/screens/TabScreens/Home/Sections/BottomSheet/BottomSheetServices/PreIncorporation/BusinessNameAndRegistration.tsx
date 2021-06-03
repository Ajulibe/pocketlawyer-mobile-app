import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import { ROUTES } from "navigation/Routes";
import PDFReader from "rn-pdf-reader-js";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import axiosClient from "utils/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PLButton from "components/PLButton/PLButton";
import COLORS from "utils/Colors";
import modalFormstyles from "../ModalFormStyles";
import { Service } from "database/DBData";
import { LawyerModel } from "models/Interfaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { wp } from "utils/Dimensions";
import { useDocUpload } from "hooks/useDocUpload";
import { PLTextInput } from "components/PLTextInput/PLTextInput";

interface Props {
  navigation: any;
  closeModal: () => void;
  service: Service;
  lawyer: LawyerModel;
}

interface IState {
  BuisnessNameOne: string;
  BusinessNameTwo: string;
  NatureOfBusiness: string;
  MeansOfIdentification: string;
  IDNumber: string;
  signatureUpload: string;
}

const initialState: IState = {
  BuisnessNameOne: "",
  BusinessNameTwo: "",
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
  // console.log(state);

  const {
    pickDocument,
    isUploaded,
    disabled,
    docName,
    uri,
    pdfUri,
    handlePdfPrint_Download,
  } = useDocUpload("signature", "Business Name registration");

  const [tempServiceHistoryID, setTempServiceHistoryID] =
    React.useState<string>("");
  const [userID, setUserID] = React.useState<any>("");

  const [isdisabled, setIsDisabled] = React.useState(true);
  const {
    BuisnessNameOne,
    BusinessNameTwo,
    NatureOfBusiness,
    MeansOfIdentification,
    IDNumber,
    signatureUpload,
  } = state;

  React.useEffect(() => {
    if (pdfUri === "") {
      return;
    } else {
      handleTextChange({ field: "signatureUpload", value: pdfUri });
    }
  }, [pdfUri]);

  React.useEffect(() => {
    if (
      BuisnessNameOne.length === 0 ||
      BusinessNameTwo.length === 0 ||
      NatureOfBusiness.length === 0 ||
      MeansOfIdentification.length === 0 ||
      IDNumber.length === 0 ||
      signatureUpload.length === 0
    ) {
      setIsDisabled(true);
      return;
    }
    setIsDisabled(false);
  }, [
    BuisnessNameOne,
    BusinessNameTwo,
    NatureOfBusiness,
    MeansOfIdentification,
    IDNumber,
    signatureUpload,
  ]);

  // console.log(
  //   BuisnessName1,
  //   BusinessName2
  //   // NatureOfBusiness,
  //   // MeansOfIdentification,
  //   // IDNumber,
  //   // signatureUpload
  // );

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
      const ID = await AsyncStorage.getItem("userID");
      setUserID(ID);
      const payload = {
        ServiceCode: service.serviceCode,
        userID: Number(ID),
      };

      const { data } = await axiosClient.post(
        "Service/InitiateServiceHistory",
        payload
      );
      const { tempServiceHistoryID } = data.data;
      // console.log(tempServiceHistoryID, "temporaryService");

      //--> set the service history received
      setTempServiceHistoryID(tempServiceHistoryID);
    } catch (error) {}
  };

  const submit = async () => {
    console.log("called top");
    if (tempServiceHistoryID === "" || userID === "") {
      setIsDisabled(true);
      return;
    }

    const payload = [
      {
        key: "BuisnessName1",
        value: state.BuisnessNameOne,
        section: "BusinessNameAndRegistration",
        userID: userID,
        tempServiceHistoryID: tempServiceHistoryID,
      },
      {
        key: "BusinessName2",
        value: state.BusinessNameTwo,
        section: "BusinessNameAndRegistration",
        userID: userID,
        tempServiceHistoryID: tempServiceHistoryID,
      },
      {
        key: "NatureOfBusiness",
        value: state.NatureOfBusiness,
        section: "BusinessNameAndRegistration",
        userID: userID,
        tempServiceHistoryID: tempServiceHistoryID,
      },
      {
        key: "MeansOfIdentification",
        value: state.MeansOfIdentification,
        section: "BusinessNameAndRegistration",
        userID: userID,
        tempServiceHistoryID: tempServiceHistoryID,
      },
      {
        key: "IDNumber",
        value: state.IDNumber,
        section: "BusinessNameAndRegistration",
        userID: userID,
        tempServiceHistoryID: tempServiceHistoryID,
      },
      {
        key: "signatureUpload",
        value: state.signatureUpload,
        section: "BusinessNameAndRegistration",
        userID: userID,
        tempServiceHistoryID: tempServiceHistoryID,
      },
    ];
    try {
      console.log("called");
      const { data } = await axiosClient.post(
        "Service/AddMetadataHistory",
        payload
      );
      console.log(data);
      // closeModal();
      // navigation.navigate(ROUTES.CHECKOUT_SCREEN);
    } catch (error) {}
  };

  return (
    <View style={{ paddingBottom: 40 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView extraScrollHeight={wp(100)}>
          <Text style={globalStyles.H1Style}>{service.serviceName}</Text>
          <Text style={modalFormstyles.titleDesc}>
            Please fill the form with your proposed business details
          </Text>

          <Text style={modalFormstyles.inputLabel}>
            Proposed Business Name 1{" "}
            <Text style={modalFormstyles.required}>*</Text>
          </Text>

          <Input
            placeholder="Type business name 1"
            placeholderTextColor={COLORS.light.darkgrey}
            errorText={""}
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="send"
            onChangeText={(text: string) => {
              handleTextChange({ field: "BuisnessNameOne", value: text });
            }}
            initialValue=""
            initiallyValid={false}
            required
            secureTextEntry={false}
            minLength={2}
            textContentType="none"
          />

          <View style={{ height: 16 }} />
          <Text style={modalFormstyles.inputLabel}>
            Proposed Business Name 2{" "}
            <Text style={modalFormstyles.required}>*</Text>
          </Text>
          <Input
            placeholder="Type business name 2"
            placeholderTextColor={COLORS.light.darkgrey}
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
              handleTextChange({ field: "BusinessNameTwo", value: text });
            }}
          />
          <View style={{ height: 16 }} />
          <Text style={modalFormstyles.inputLabel}>
            Nature of Business <Text style={modalFormstyles.required}>*</Text>
          </Text>
          <Input
            placeholder="Type the business nature"
            placeholderTextColor={COLORS.light.darkgrey}
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
          <Text style={modalFormstyles.inputLabel}>
            Means of Identification{" "}
            <Text style={modalFormstyles.required}>*</Text>
          </Text>
          <Input
            placeholder="Select your means of identification"
            placeholderTextColor={COLORS.light.darkgrey}
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
          <Text style={modalFormstyles.inputLabel}>
            ID Number <Text style={modalFormstyles.required}>*</Text>
          </Text>
          <Input
            placeholder="Type identification number"
            placeholderTextColor={COLORS.light.darkgrey}
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
          <Text style={modalFormstyles.inputLabel}>
            Signature{" "}
            <Text style={[modalFormstyles.required, { fontSize: wp(11) }]}>
              only PDF accepted&nbsp;*
            </Text>
          </Text>

          <Input onPress={pickDocument} dataValue={docName} icon />

          <View style={{ height: 30 }} />

          {pdfUri ? (
            <View
              style={{
                flex: 1,
                height: 100,
                marginTop: wp(20),
                borderWidth: 1,
                borderRadius: 4,
                marginBottom: wp(20),
              }}
            >
              {/* <Button title="Pick document" onPress={pickDocument} />
            <Button title="Print document" onPress={handlePdfPrint_Download} /> */}

              <PDFReader
                style={{ width: "100%", height: 200 }}
                source={{ base64: pdfUri }}
              />
            </View>
          ) : null}
        </KeyboardAwareScrollView>

        <View style={{ height: 16 }} />
      </ScrollView>

      <CustomButton
        disabled={isdisabled}
        btnText="Submit"
        onClick={() => {
          console.log("clicked");
          submit();
          // closeModal();
          // navigation.navigate(ROUTES.CHECKOUT_SCREEN, {
          //   service: service,
          //   lawyer: lawyer,
          // });
        }}
      />
    </View>
  );
};
