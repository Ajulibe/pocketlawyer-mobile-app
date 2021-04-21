import React, { useReducer, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../utils/Colors";
import InputValidation from "../utils/InputValidation";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

interface InitialStateType {
  value?: string | null;
  isValid?: boolean;
  touched?: boolean;
}

interface IAction {
  type: string;
  value?: string;
  isValid?: boolean;
}

interface Props {
  id: string;
  keyboardType: any;
  secureTextEntry: boolean;
  required: boolean;
  minLength: number;
  // autoCompleteType?: any;
  autoCapitalize: any;
  errorText: string;
  initialValue: string;
  initiallyValid: boolean;
  email?: string | null;
  min?: number | null;
  max?: number | null;
  value?: string | null;
  textContentType: any;
  touched?: boolean;
  returnKeyType: any;
  placeholder?: string;
  placeholderTextColor?: any;
  onInputChange: (id?: string, x?: string, y?: boolean) => void;
  onSubmit: () => void;
}

const inputReducer = (state: InitialStateType, action: IAction) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input: React.FC<Props> = (props) => {
  const initialState = {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: props.touched,
  };

  const [inputState, dispatch] = useReducer(inputReducer, initialState);
  const [isTouched, setIsTouched] = useState(false);
  const [errorText, setErrorText] = useState("");

  const { onInputChange, onSubmit, id, touched } = props;

  // useEffect(() => {
  //   if (touched && inputState.value == "") {
  //     setIsTouched(true);
  //   }
  //   onInputChange(id, inputState.value, inputState.isValid);
  // }, [inputState, onInputChange, id, touched]);

  const textChangeHandler = (text: string) => {
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    //Email Validation
    // if (props.email) {
    //   if (!InputValidation.isValidEmail(text.toLowerCase()).isValid) {
    //     isValid = false;
    //     setErrorText(
    //       InputValidation.isValidEmail(text.toLocaleLowerCase()).message
    //     );
    //   }
    // }

    if (props.min != null && +text < props.min) {
      isValid = false;
    }

    if (props.max != null && +text > props.max) {
      isValid = false;
    }

    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  return (
    <View style={[styles.formControl]}>
      <TextInput
        {...props}
        style={[
          {
            fontWeight: inputState.value != "" ? "700" : "400",
            borderColor:
              !inputState.isValid && (inputState.touched || isTouched)
                ? COLORS.light.red
                : COLORS.light.primaryLight,
          },
          styles.input,
        ]}
        placeholderTextColor={COLORS.light.inputText}
        value={inputState.value!}
        onChangeText={textChangeHandler}
        // onBlur={lostFocusHandler}
        // onSubmitEditing={() =>
        //   onSubmit(id, inputState.value, inputState.isValid)
        // }
      />
      {props.errorText != "" && (inputState.touched || isTouched) && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  input: {
    borderRadius: 4,
    backgroundColor: COLORS.light.inputBg,
    fontSize: wp("4.26%"),
    fontFamily: "Roboto-Regular",
    paddingHorizontal: wp("5.6%"),
    paddingVertical: hp("1.47%"),
    color: COLORS.light.inputText,
    height: hp("6.15%"),
  },
  errorContainer: {
    marginVertical: 0,
  },
  errorText: {
    marginTop: hp("1%"),
    fontFamily: "Roboto-Regular",
    color: COLORS.light.red,
    fontSize: 13,
  },
});

export default Input;
