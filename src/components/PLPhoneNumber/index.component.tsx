import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { wp } from "utils/Dimensions";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  return (
    <>
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="DM"
        layout="first"
        onChangeText={(text) => {
          setValue(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
        // withDarkTheme
        // withShadow
        autoFocus
        containerStyle={styles.container}
        codeTextStyle={{ fontSize: wp(13), fontFamily: "Roboto-Medium" }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    height: wp(40),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#7CDB8A",
    // shadowColor: "rgba(0,0,0,0.4)",
    // shadowOffset: {
    //   width: 1,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,
    // elevation: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  redColor: {
    backgroundColor: "#F57777",
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default App;
