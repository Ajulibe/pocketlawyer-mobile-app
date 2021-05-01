import React from "react";
import { View, StyleSheet, Text, ViewStyle } from "react-native";
import COLORS from "../../utils/Colors";
import { wp, hp } from "../../utils/Dimensions";
import { Entypo } from "@expo/vector-icons";
import { Picker, Form } from "native-base";

interface Props {
  data: any;
  key: string;
  label: string;
  value: string;
  style: ViewStyle;
  onChange: () => void;
  selectedValue: string | number;
}

const AuthGetStarted: React.FC<Props> = ({
  data,
  style,
  value,
  label,
  key,
  selectedValue,
  onChange,
}) => {
  return (
    <View style={[styles.Wrapper, style]}>
      <View>
        <Text style={styles.label}>State</Text>
        <Form>
          <Picker
            mode="dropdown"
            iosIcon={
              <Entypo
                name="chevron-small-down"
                size={24}
                color={COLORS.light.black}
              />
            }
            placeholder="Select State"
            selectedValue={selectedValue}
            onValueChange={onChange}
            placeholderStyle={{
              color: COLORS.light.darkgrey,
              fontFamily: "Roboto-Regular",
              fontSize: 12,
            }}
            placeholderIconColor={COLORS.light.darkgrey}
            style={styles.picker}
          >
            {data.map(function (item: any) {
              return <Picker.Item key={key} label={label} value={value} />;
            })}
          </Picker>
        </Form>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    width: wp(334),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    width: wp(156),
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0.5,
    borderRadius: 4,
    height: wp(40),
    paddingRight: wp(4),
  },
  label: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(12),
    marginTop: hp(12),
  },
});

export default AuthGetStarted;
