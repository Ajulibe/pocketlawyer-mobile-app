import React from "react";
import { StyleSheet, View } from "react-native";
import { Datepicker } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { wp } from "../../utils/Dimensions";
import COLORS from "../../utils/Colors";

const CalendarIcon = () => <AntDesign name="calendar" size={12} color="grey" />;

export const PLDatePicker = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <View style={styles.DatepickerWrapper}>
      <Datepicker
        style={styles.DatePicker}
        placeholder="Select your Date of Birth"
        date={date}
        onSelect={(nextDate) => setDate(nextDate)}
        accessoryRight={CalendarIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  DatepickerWrapper: {
    width: wp(334),
    height: wp(40),
    backgroundColor: COLORS.light.white,
  },
  DatePicker: {
    width: "100%",
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    borderColor: COLORS.light.darkgrey,
    fontSize: 12,
  },
});
