import React from "react";
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import COLORS from "utils/Colors";
import {hp} from "utils/Dimensions";
import _ from "lodash";
import {MaterialIcons} from "@expo/vector-icons";
import {styles} from "../styles";
import Add from "./AddandRemoveTable";
import {useAddMoreCategories} from "../hooks/useAddMoreCategories";

export const AddCategories = ({routedata, navigation}: any) => {
  const {
    setIsAddmoreOpen,
    isAddmoreOpen,
    unselectedcat,
    getSelected,
    setAccepted,
    isloading,
    filterCategories,
    isdisabled,
    loading,
  } = useAddMoreCategories(routedata, navigation, true);

  return (
    <View style={styles.adjustContainer}>
      <TouchableOpacity
        style={[
          styles.changePasswordBth,
          {marginBottom: hp(10), width: "100%"},
        ]}
        onPress={() => {
          setIsAddmoreOpen(!isAddmoreOpen);
        }}>
        <Text style={styles.formWrapper}>Add Categories</Text>

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
        <Add
          isOpen={isAddmoreOpen}
          catArray={unselectedcat}
          getSelected={getSelected}
          setAccepted={setAccepted}
          isloading={isloading}
          filterCategories={filterCategories}
          btnText="Add"
          isDisabled={isdisabled}
          emptyStateMessage="You have no selected categories"
        />
      )}
    </View>
  );
};
