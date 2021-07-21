import React from "react";
import {View, Text, ActivityIndicator} from "react-native";
import {CheckBox as RNECheckBox} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";
import _ from "lodash";
import {MaterialIcons} from "@expo/vector-icons";
import PLButton from "components/PLButton/PLButton.component";

import * as Animatable from "react-native-animatable";
import {styles} from "../styles";
import COLORS from "utils/Colors";

interface IProps {
  isOpen: boolean;
  catArray: string[];
  getSelected(name: string): boolean | undefined;
  setAccepted(name: string): void;
  isloading: boolean | null;
  filterCategories(): void;
  btnText: string;
  emptyStateMessage: string;
  isDisabled: boolean;
}

const AddandRemove: React.FC<IProps> = ({
  isOpen,
  catArray,
  getSelected,
  filterCategories,
  isloading,
  setAccepted,
  btnText,
  emptyStateMessage,
  isDisabled,
}) => {
  return (
    <>
      {isOpen && (
        <Animatable.View
          animation="fadeIn"
          duration={500}
          easing="ease-in"
          style={styles.dataWrapper}>
          {catArray.length > 0 ? (
            catArray.map((item: any, i) => (
              <RNECheckBox
                key={`${item}-${i}`}
                title={item}
                iconRight
                containerStyle={[
                  styles.checkBoxWrapper,
                  {
                    backgroundColor:
                      getSelected(item) === true
                        ? COLORS.light.primary
                        : COLORS.light.checkpurple,
                  },
                ]}
                textStyle={[
                  styles.textStyle,
                  {
                    color:
                      getSelected(item) === true
                        ? COLORS.light.white
                        : COLORS.light.primary,
                  },
                ]}
                checkedIcon={
                  <AntDesign
                    name="checksquare"
                    size={18}
                    color={COLORS.light.white}
                  />
                }
                uncheckedIcon={
                  <MaterialIcons
                    name="check-box-outline-blank"
                    size={20}
                    color={COLORS.light.primary}
                  />
                }
                checkedColor={COLORS.light.primary}
                checked={getSelected(item)}
                onPress={() => setAccepted(item)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              {isloading === null ? (
                <ActivityIndicator />
              ) : (
                <>
                  <MaterialIcons
                    name="hourglass-empty"
                    size={24}
                    color={COLORS.light.primary}
                  />
                  <Text style={styles.emptyText}>{emptyStateMessage}</Text>
                </>
              )}
            </View>
          )}

          {catArray.length > 0 && (
            <View style={styles.btnWrapper}>
              <PLButton
                disabled={isDisabled}
                style={styles.nextButton}
                textColor={COLORS.light.white}
                btnText={btnText}
                onClick={filterCategories}
              />
            </View>
          )}
        </Animatable.View>
      )}
    </>
  );
};

export default AddandRemove;
