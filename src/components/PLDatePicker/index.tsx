import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Datepicker } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { wp, hp } from "../../utils/Dimensions";
import COLORS from "../../utils/Colors";

const CalendarIcon = () => <AntDesign name="calendar" size={12} color="grey" />;

interface PLDatePicker {
  onSelect?: (date: Date) => void;
  initial?: string;
  selectedDate?: any;
  placeholder: any;
  useDatepickerState: any;
}

export const PLDatePicker: React.FC<PLDatePicker> = ({
  onSelect,
  initial,
  selectedDate,
  placeholder,
  useDatepickerState,
}) => {
  const min = new Date(1960, 11, 24);

  return (
    <View style={styles.DatepickerWrapper}>
      <Datepicker
        textStyle={{ color: COLORS.light.black, fontSize: wp(12) }}
        controlStyle={styles.controlStyle}
        min={min}
        date={selectedDate}
        backdropStyle={styles.backdropStyle}
        style={styles.DatePicker}
        placeholder={(TextProps) => {
          return <Text style={styles.placeholder}>{placeholder}</Text>;
        }}
        status="basic"
        accessoryRight={CalendarIcon}
        {...useDatepickerState}
      />
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
    fontSize: wp(12),
    backgroundColor: COLORS.light.white,
  },
  controlStyle: {
    backgroundColor: COLORS.light.white,
    borderColor: COLORS.light.textinputborder,
    borderWidth: 1,
    fontSize: wp(12),
    color: COLORS.light.black,
    fontWeight: "300",
  },
  placeholder: {
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
    marginLeft: wp(8),
  },
  backdropStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    position: "absolute",
    width: wp(200),
    height: wp(30),
    backgroundColor: COLORS.light.fadedSecondary,
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
