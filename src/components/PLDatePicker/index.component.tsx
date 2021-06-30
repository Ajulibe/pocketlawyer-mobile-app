import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { CalendarViewModes, Datepicker } from "@ui-kitten/components";
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
  const now = new Date();
  const max = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6570); //--> at least 18years

  return (
    <View style={styles.DatepickerWrapper}>
      <Datepicker
        startView={CalendarViewModes.YEAR}
        textStyle={{
          color: COLORS.light.black,
          fontSize: wp(12),
          fontFamily: "Roboto-Medium",
        }}
        controlStyle={styles.controlStyle}
        min={min}
        max={max}
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
    fontSize: wp(13),
    marginLeft: wp(8),
    fontFamily: "Roboto-Medium",
  },
  backdropStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
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
