import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import { ROUTES } from "navigation/Routes";
import React from "react";
import { Text, View, ScrollView } from "react-native";
import modalFormstyles from "../ModalFormStyles";

interface Props {
  navigation: any;
  closeModal: () => void;
}

export function Advisory({ navigation, closeModal }: Props) {
  return (
    <View style={{ paddingBottom: 120 }}>
      <ScrollView>
        <Text style={globalStyles.H1Style}>Advisory</Text>
        <Text style={modalFormstyles.titleDesc}>
          Please fill the form with your proposed business details
        </Text>
        <Text style={modalFormstyles.inputLabel}>Business Name</Text>
        <Input
          placeholder="Type business name"
          errorText={""}
          onChangeText={(text: string) => null}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}> Business Sector</Text>
        <Input
          placeholder="Enter business sector"
          errorText={""}
          onChangeText={(text: string) => null}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>Contract Duration</Text>
        <Input
          placeholder="Select contract duration"
          errorText={""}
          onChangeText={(text: string) => null}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          Certificate of Registration (SMEs)
        </Text>
        <Input
          placeholder="Upload certificate of Registration"
          errorText={""}
          onChangeText={(text: string) => null}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          Certificate of Incorporation (Companies)
        </Text>
        <Input
          placeholder="Upload certificate of incorporation"
          errorText={""}
          onChangeText={(text: string) => null}
        />
        <View style={{ height: 16 }} />
        <Text style={modalFormstyles.inputLabel}>
          Memorandum and Articles of Association
        </Text>
        <Input
          placeholder="Upload memorandum"
          errorText={""}
          onChangeText={(text: string) => null}
        />
      </ScrollView>
      <View style={{ height: 16 }} />
      <CustomButton
        btnText="Submit"
        onClick={() => {
          closeModal();
          navigation.navigate(ROUTES.CHECKOUT_SCREEN);
        }}
      />
    </View>
  );
}
