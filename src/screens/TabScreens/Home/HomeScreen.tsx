import { StackScreenProps } from "@react-navigation/stack";
import globalStyles from "css/GlobalCss";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  View,
} from "react-native";

// type Props = StackScreenProps<HomeStackParamList, ROUTES.HOME_SCREEN_STACK>;
type Props = StackScreenProps<any>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <>
      {/* <SafeAreaView style={globalStyles.AndroidSafeArea}> */}
      <KeyboardAvoidingView
        behavior={"padding"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS == "android" ? -300 : -50}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={{ flex: 1, marginTop: 1 }}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              possimus deserunt quibusdam, assumenda dolorem omnis officia
              excepturi, nulla tenetur incidunt rem exercitationem asperiores
              recusandae fugiat amet, perspiciatis mollitia voluptate quo.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* </SafeAreaView> */}
    </>
  );
};

export default HomeScreen;
