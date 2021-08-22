import React, {useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import COLORS from "utils/Colors";
import {wp, hp} from "utils/Dimensions";
import {Entypo} from "@expo/vector-icons";
import {BottomSheet, ListItem} from "react-native-elements";
import {widthPercentageToDP} from "react-native-responsive-screen";

interface Props {
  isVisible: boolean;
  data: any;
  dataProperty: any;
  NameField: string;
  style: ViewStyle;
  setIsVisible: (data: boolean) => void;
}

export const PLBottomSheet: React.FC<Props> = ({
  data,
  // isVisible,
  NameField,
  // setIsVisible,
  style,
  dataProperty,
}) => {
  //--> state values for the section
  const [state, setState] = useState("Select your location");
  const [statePlaceholder, setStatePlaceholder] = useState(0);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (state === "Select your location") {
      return;
    }
    setIsVisible(false);
    setStatePlaceholder(statePlaceholder + 1);
  }, [state]);

  //-->  data for bottom sheet
  const list = [
    {
      title: "Cancel",
      containerStyle: {
        backgroundColor: COLORS.light.primary,
      },
      titleStyle: {color: "white"},
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <View>
      <Text style={styles.inputText}>
        {NameField} <Text style={styles.required}>*</Text>
      </Text>
      <View
        style={[
          {
            borderWidth: 1,
            width: widthPercentageToDP("100%"),
            height: wp(40),
            borderRadius: 4,
            borderColor: COLORS.light.textinputborder,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          },
          style,
        ]}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <View style={{width: wp(300)}}>
              <Text
                style={{
                  marginLeft: wp(16),
                  fontSize: wp(12),
                  fontFamily: "Roboto-Medium",
                  color:
                    statePlaceholder === 0
                      ? COLORS.light.darkgrey
                      : COLORS.light.black,
                }}>
                {state}
              </Text>
            </View>
            <View
              style={{
                width: wp(30),
                alignItems: "flex-end",
              }}>
              <Entypo name="chevron-small-down" size={20} color="grey" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <BottomSheet
        modalProps={{
          visible: isVisible,
          statusBarTranslucent: true,
        }}
        isVisible={isVisible}
        containerStyle={{backgroundColor: COLORS.light.primary}}>
        {data.map((l: any, i: any) => (
          <ListItem
            key={i}
            onPress={() => {
              setState(l.state);
            }}>
            <ListItem.Content>
              <ListItem.Title>
                <Text>{l.state}</Text>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>
                <Text>{l.title}</Text>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(4),
    marginTop: hp(12),
  },
  required: {
    color: "red",
  },
});
