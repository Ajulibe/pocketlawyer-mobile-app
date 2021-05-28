import CustomButton from "components/CustomButton";
import Input from "components/Input";
import globalStyles from "css/GlobalCss";
import { ROUTES } from "navigation/Routes";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { hp, wp } from "utils/Dimensions";

interface Props {
  navigation: any;
  closeModal: () => void;
}

export default function BottomSheetContent({ navigation, closeModal }: Props) {
  return (
    <View style={{ paddingBottom: 120 }}>
      <ScrollView>
        <Text style={globalStyles.H1Style}>Business Name Registration</Text>
        <Text style={styles.titleDesc}>
          Please fill the form with your proposed business details
        </Text>
        <Text style={styles.inputLabel}>Proposed Business Name 1</Text>
        <Input
          placeholder="Type business name 1"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          onInputChange={(value) => null}
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
        />
        <View style={{ height: 16 }} />
        <Text style={styles.inputLabel}>Proposed Business Name 2</Text>
        <Input
          placeholder="Type business name 2"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          onInputChange={(value) => null}
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
        />
        <View style={{ height: 16 }} />
        <Text style={styles.inputLabel}>Nature of Business</Text>
        <Input
          placeholder="Type the business nature"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          onInputChange={(value) => null}
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
        />
        <View style={{ height: 16 }} />
        <Text style={styles.inputLabel}>Means of Identification</Text>
        <Input
          placeholder="Select your means of identification"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          onInputChange={(value) => null}
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
        />
        <View style={{ height: 16 }} />
        <Text style={styles.inputLabel}>ID Number</Text>
        <Input
          placeholder="Type identification number"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          onInputChange={(value) => null}
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
        />
        <View style={{ height: 16 }} />
        <Text style={styles.inputLabel}>Signature</Text>
        <Input
          placeholder="Upload your signature"
          placeholderTextColor=""
          errorText={""}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="send"
          onInputChange={(value) => null}
          initialValue=""
          initiallyValid={false}
          required
          secureTextEntry={false}
          minLength={2}
          textContentType="none"
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

const styles = StyleSheet.create({
  titleDesc: {
    fontSize: wp(12),
    lineHeight: hp(14),
    fontWeight: "400",
    fontFamily: "Roboto",
    color: "rgba(0, 0, 0, 0.7)",
    marginVertical: hp(24),
  },
  inputLabel: {
    fontSize: wp(12),
    lineHeight: hp(24),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "rgba(0, 0, 0, 0.7)",
    marginBottom: hp(2),
  },
});
