import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentageToDP as wpercent } from "react-native-responsive-screen";
import { RootStackParamList } from "navigation/MainNavigator";
import { ROUTES } from "navigation/Routes";
import COLORS from "utils/Colors";
import { wp, hp } from "utils/Dimensions";
import NavBar from "components/NavBar";
import PLButton from "components/PLButton/PLButton";
import { PLPasswordInput } from "components/PLPasswordInput/PLPasswordInput";
import { PLTextInput } from "components/PLTextInput/PLTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PLModal } from "components/PLModal";
import { Picker, Form, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheet, ListItem } from "react-native-elements";
import { states } from "utils/nigerianStates";
import { ScrollView } from "react-native-gesture-handler";
import axiosClient from "utils/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DocUploadUserInfo } from "navigation/interfaces";
import axios from "axios";

type Props = StackScreenProps<
  RootStackParamList,
  ROUTES.AUTH_SIGN_UP_SECTION_TWO
>;

const AuthGetStarted = ({ navigation }: Props) => {
  const [visible, setVisible] = React.useState(false);

  //--> state  for bottom sheet
  const [isVisible, setIsVisible] = useState<boolean>(false);

  //-->  data for bottom sheet
  const list = [
    {
      title: "Cancel",
      containerStyle: {
        backgroundColor: COLORS.light.primary,
      },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  //--> state values
  const [school, setSchool] = useState("");
  const [CGPA, setCGPA] = useState("");
  const [Identification, setIdentification] = useState(
    "Select your means of Identification"
  );
  const [identificationPlaceholder, setIdentificationPlaceholder] = useState(0);
  interface uploadInterfaace {
    name: string;
    size: number;
    uri: string;
    type: string;
  }
  const [idNumber, setIdNumber] = useState("");
  const [resume, setResume] = useState<uploadInterfaace[]>([
    {
      name: "",
      size: 0,
      uri: "",
      type: "",
    },
  ]);
  const [resumeName, setResumeName] = useState("Select from files");

  //--> setting resume data
  const pickDocument = async () => {
    await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = [
          {
            name: name,
            size: size,
            uri: uri,
            type: "application/" + fileType,
          },
        ];
        console.log(fileToUpload, "...............file");
        setResumeName(name);
        setResume(fileToUpload);
      }
    });
  };

  React.useEffect(() => {
    const { name, size, uri, type } = resume[0];
    if (name === "" || size === 0 || uri === "" || type === "") {
      return;
    }
    //--> get the user id from async storage
    AsyncStorage.getItem("userID").then((res) => {
      const payload: DocUploadUserInfo = {
        fileName: name,
        fileType: 1,
        isfor: "Certificate",
        contentType: type,
        userID: Number(res),
      };

      postDocument(payload);
    });
  }, [resume]);

  //--> posting resume data
  const postDocument = async (payload: DocUploadUserInfo) => {
    try {
      await axiosClient.post("Upload/Generates3URL", payload).then((res) => {
        const { url, uploadID, fileName } = res.data.data;

        // console.log(fileName);
        const formData = new FormData();
        formData.append("Certificate", resume[0] as any);
        formData.append("fileName", fileName);
        console.log(formData);
        console.log(url);

        //--> post document to the received s3 url
        // axios({
        //   method: "PUT",
        //   url: url,
        //   data: formData,
        //   headers: { "Content-Type": "application/octet-stream" },
        // })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (er) {
        //     console.log(er.toString());
        //     return;
        //   });

        //--> confirm upload
        const confirmPayload = {
          fileName: fileName,
          fileType: 1,
          userID: payload.userID,
          uploadID: uploadID,
        };
      });
    } catch (error) {}
  };

  //--> disabling button
  const [disabled, setDisabled] = useState<boolean>(true);

  //--> to change placeholder color when indentification is set
  React.useEffect(() => {
    if (Identification === "Select your means of Identification") {
      return;
    }
    setIsVisible(false);
    setIdentificationPlaceholder(identificationPlaceholder + 1);
  }, [Identification]);

  //--> check to ensure all values are filled and enable button
  React.useEffect(() => {
    //--> check if the payload has be completely filled
    if (
      school === "" ||
      CGPA === "" ||
      Identification === "" ||
      idNumber === "" ||
      resume[0].name === ""
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [CGPA, Identification, school, idNumber, resume]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <NavBar
          onPress={() => {
            navigation.navigate(ROUTES.AUTH_PASSWORD_LAWYER);
          }}
          navText="Education Details"
        />
        <ScrollView>
          <View style={styles.contentWraper}>
            <Text style={styles.welcomeMessage}>
              <Text style={styles.verifyEmail}>
                An email has been sent to you to verify your email address.
              </Text>
              &nbsp; Kindly fill in your &nbsp;
              <Text style={styles.educationDetails}>education details </Text> to
              complete your profile as a lawyer.
            </Text>

            <View>
              <PLTextInput
                onChangeText={setSchool}
                labelText="School"
                error={false}
                name="School"
                textContentType="none"
                style={styles.input}
                placeholder="Type the name of institution attended"
              />
            </View>

            <View>
              <PLTextInput
                onChangeText={setCGPA}
                labelText="CGPA"
                error={false}
                name="CGPA"
                textContentType="none"
                keyboardType="numeric"
                style={styles.input}
                placeholder="Type your grade"
              />
            </View>

            <View style={{ marginTop: wp(4) }}>
              <Text style={styles.inputText}>State</Text>
              <View
                style={{
                  borderWidth: 1,
                  width: wp(334),
                  height: wp(40),
                  borderRadius: 4,
                  borderColor: COLORS.light.textinputborder,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(true);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ width: wp(300) }}>
                      <Text
                        style={{
                          marginLeft: wp(16),
                          fontSize: 12,
                          fontFamily: "Roboto-Regular",
                          color:
                            identificationPlaceholder === 0
                              ? COLORS.light.darkgrey
                              : COLORS.light.black,
                        }}
                      >
                        {Identification}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: wp(30),
                        alignItems: "flex-end",
                      }}
                    >
                      <Entypo
                        name="chevron-small-down"
                        size={20}
                        color="grey"
                      />
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
                containerStyle={{ backgroundColor: COLORS.light.primary }}
              >
                {states.map((l, i) => (
                  <ListItem
                    key={i}
                    onPress={() => {
                      setIdentification(l.state);
                    }}
                  >
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
                    onPress={l.onPress}
                  >
                    <ListItem.Content>
                      <ListItem.Title style={l.titleStyle}>
                        <Text>{l.title}</Text>
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </BottomSheet>
            </View>

            <View>
              <PLTextInput
                onChangeText={setIdNumber}
                labelText="ID Number"
                error={false}
                name="ID Number"
                textContentType="none"
                style={styles.input}
                placeholder="Type identification number"
              />
            </View>

            <View style={styles.fileSelectBox}>
              <Text style={styles.inputText}>Resume</Text>
              <TouchableOpacity
                onPress={pickDocument}
                style={styles.inputButton}
              >
                <Text style={styles.selectText}>{resumeName}</Text>
                <FontAwesome
                  name="file-pdf-o"
                  size={14}
                  color={COLORS.light.black}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.carouselWrapper}>
              <View style={styles.carouselIcon}>
                <FontAwesome
                  name="circle"
                  size={12}
                  color={COLORS.light.primary}
                />
                <Entypo name="circle" size={10} color={COLORS.light.primary} />
                <Entypo name="circle" size={10} color={COLORS.light.primary} />
              </View>
            </View>

            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() =>
                  navigation.navigate(ROUTES.AUTH_PROFILE_IMAGE_LAWYER)
                }
              >
                <Text style={styles.skip}>Skip</Text>
              </TouchableOpacity>

              <PLButton
                disabled={disabled}
                style={styles.nextButton}
                textColor={COLORS.light.white}
                btnText={"Next"}
                onClick={() =>
                  navigation.navigate(ROUTES.AUTH_PROFILE_IMAGE_LAWYER)
                }
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.light.white,
  },
  welcomeMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(14),
    lineHeight: hp(27),
    textAlign: "left",
    alignSelf: "flex-start",
    color: COLORS.light.black,
    marginBottom: hp(12),
  },
  contentWraper: {
    width: wpercent("90%"),
    alignItems: "center",
    marginTop: hp(28),
  },
  educationDetails: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: hp(20),
    color: COLORS.light.primary,
  },
  input: {
    width: wp(334),
    height: wp(40),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
    borderColor: COLORS.light.textinputborder,
  },
  inputButton: {
    flexDirection: "row",
    height: wp(40),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.light.textinputborder,
    justifyContent: "space-between",
    paddingLeft: wp(20),
    paddingRight: wp(20),
    alignItems: "center",
  },
  fileSelectBox: {
    width: "100%",
    justifyContent: "center",
  },
  selectText: {
    color: COLORS.light.darkgrey,
    fontSize: 12,
  },
  resetPasswordInput: {
    width: wp(300),
    height: wp(40),
    marginTop: wp(20),
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  verifyEmail: {
    fontFamily: "Roboto-MediumItalic",
  },
  resetPasswordText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    color: COLORS.light.black,
    textAlign: "center",
  },
  resetPasswordBtn: {
    marginTop: wp(40),
    width: wp(300),
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: wp(12),
    color: COLORS.light.darkgrey,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(21),
    width: wpercent("90%"),
  },
  skipButton: {
    width: wp(156),
    backgroundColor: COLORS.light.white,
    borderRadius: wp(7),
    borderWidth: 1,
    borderColor: COLORS.light.primary,
    height: wp(45),
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: COLORS.light.primaryLight,
    shadowOpacity: 0.2,
  },
  skip: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: wp(16),
    color: COLORS.light.primary,
  },
  nextButton: {
    width: wp(156),
    borderRadius: wp(7),
  },

  inputText: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(12),
    lineHeight: hp(24),
    textAlign: "left",
    color: COLORS.light.black,
    marginBottom: hp(4),
    marginTop: hp(10),
  },
  forgotPassword: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.lightpurple,
    textAlign: "right",
    fontSize: wp(12),
    marginTop: wp(8),
  },
  codeText: {
    fontFamily: "Roboto-Medium",
    color: COLORS.light.darkgrey,
    fontSize: wp(12),
  },
  plButton: {
    // marginTop: hp(390),
  },
  carouselWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(22),
    width: wpercent("90%"),
  },
  identification: {
    width: wp(334),
    borderColor: COLORS.light.textinputborder,
    borderWidth: 0.5,
    borderRadius: 4,
    height: wp(40),
    paddingRight: wp(4),
  },
  carouselIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wpercent("11%"),
  },
  phoneNumberWrapper: {
    width: wpercent("90%"),
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-between",
    borderRadius: 4,
    borderColor: "#f0f0f0",
  },
  loginWrapper: {
    flexDirection: "row",
    width: wpercent("80%"),
    justifyContent: "space-around",
    marginTop: hp(12),
  },
  login: {
    fontFamily: "Roboto-Medium",
    fontSize: wp(14),
    lineHeight: hp(16),
    letterSpacing: 0,
    color: COLORS.light.lightpurple,
  },
  countryPickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
    paddingLeft: wpercent("2%"),
    width: wpercent("26%"),
  },
});

export default AuthGetStarted;
