import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Datepicker } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { wp, hp } from "../../utils/Dimensions";
import COLORS from "../../utils/Colors";

const CalendarIcon = () => <AntDesign name="calendar" size={12} color="grey" />;

interface PLDatePicker {
  onSelect: (date: Date) => void;
  initial: string;
  selectedDate: string;
}

export const PLDatePicker: React.FC<PLDatePicker> = ({
  onSelect,
  initial,
  selectedDate,
}) => {
  const min = new Date(1960, 11, 24);

  return (
    <View style={styles.DatepickerWrapper}>
      <Datepicker
        controlStyle={styles.controlStyle}
        min={min}
        backdropStyle={styles.backdropStyle}
        style={styles.DatePicker}
        placeholder="Select your Date of Birth"
        status="basic"
        onSelect={onSelect}
        accessoryRight={CalendarIcon}
      />

      <View style={styles.cover}>
        <Text
          style={[
            styles.selectedDate,
            {
              color:
                initial === new Date().toString()
                  ? COLORS.light.darkgrey
                  : COLORS.light.black,
            },
          ]}
        >
          {initial === new Date().toString()
            ? "Select your Date of Birth"
            : selectedDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DatepickerWrapper: {
    width: wp(334),
    height: wp(40),
    backgroundColor: COLORS.light.white,
    borderWidth: 0,
    justifyContent: "center",
  },
  DatePicker: {
    width: "100%",
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  controlStyle: {
    backgroundColor: COLORS.light.white,
    borderColor: COLORS.light.textinputborder,
    borderWidth: 1,
    color: COLORS.light.black,
  },
  backdropStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    position: "absolute",
    width: wp(200),
    height: wp(30),
    backgroundColor: COLORS.light.white,
    top: hp(5),
    left: wp(7),
    justifyContent: "center",
    paddingLeft: wp(9),
  },
  selectedDate: {
    fontSize: wp(12),
    color: COLORS.light.black,
  },
});
