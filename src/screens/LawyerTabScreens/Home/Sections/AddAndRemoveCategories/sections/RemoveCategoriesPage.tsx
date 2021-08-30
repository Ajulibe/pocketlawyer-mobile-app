import React from "react";
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import COLORS from "utils/Colors";
import _ from "lodash";
import {MaterialIcons} from "@expo/vector-icons";
import {styles} from "../styles";
import Remove from "./AddandRemoveTable";
import {useAddMoreCategories} from "../hooks/useAddMoreCategories";

export const RemoveCategories = ({routedata, navigation}: any) => {
  const {
    setIsRemoveOpen,
    isRemoveOpen,
    selectedcat,
    getSelected,
    setAccepted,
    isloading,
    filterCategories,
    isdisabled,
    loading,
  } = useAddMoreCategories(routedata, navigation, false);

  return (
    <>
      <TouchableOpacity
        style={[styles.changePasswordBth]}
        onPress={() => {
          setIsRemoveOpen(!isRemoveOpen);
        }}>
        <Text style={styles.formWrapper}>RemoveCategories</Text>

        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={COLORS.light.primary}
        />
      </TouchableOpacity>

      {loading ? (
        <View style={styles.activityIndicatorStyle}>
          <ActivityIndicator color={COLORS.light.primary} />
        </View>
      ) : (
        <Remove
          isOpen={isRemoveOpen}
          catArray={selectedcat}
          getSelected={getSelected}
          setAccepted={setAccepted}
          isloading={isloading}
          filterCategories={filterCategories}
          btnText="Remove"
          isDisabled={isdisabled}
          emptyStateMessage="You have no selected categories"
        />
      )}
    </>
  );
};
