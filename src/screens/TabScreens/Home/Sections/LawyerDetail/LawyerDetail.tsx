import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "navigation/HomeStack";
import { ROUTES } from "navigation/Routes";
import CustomAppbar from "components/CustomAppbar";
import globalStyles from "css/GlobalCss";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { hp, wp } from "utils/Dimensions";
import CONSTANTS from "utils/Constants";
import COLORS from "utils/Colors";
import CustomButton from "components/CustomButton";
import BottomSheetModal from "../BottomSheet/BottomSheetModal";

type Props = StackScreenProps<HomeStackParamList, ROUTES.LAWYER_DETAIL_SCREEN>;

export default function LawyerDetail({ navigation }: Props) {
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const DescTile = ({
    leading,
    value,
    faintTrailing,
  }: {
    leading: String;
    value: String;
    faintTrailing?: boolean;
  }) => (
    <View style={styles.tileWrapper}>
      <Text style={styles.tileLeading}>{leading}</Text>
      <Text
        style={[
          styles.tileTrailing,
          {
            fontWeight: faintTrailing ? "400" : "700",
            fontSize: faintTrailing ? wp(10) : wp(12),
            color: faintTrailing ? "#6E58B3" : COLORS.light.primary,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <>
      <BottomSheetModal
        closeModal={() => setModalVisibility(false)}
        navigation={navigation}
        modalVisible={modalVisibility}
      />
      <SafeAreaView style={globalStyles.AndroidSafeArea}>
        <CustomAppbar navigation={navigation} title="" />
        <ScrollView
          contentContainerStyle={[styles.container, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <Image
            source={{
              uri: CONSTANTS.user,
            }}
            style={styles.userPhoto}
          />
          <Text style={styles.name}>Omoye Afosa</Text>
          <View style={styles.userDetails}>
            <Text style={styles.descTitle}>Brief Description</Text>
            <DescTile leading="Location:" value="Lagos" />
            <DescTile leading="Price:" value="N56, 000" />
            <DescTile leading="Years of Experience:" value="2yrs" />
            <Text style={styles.aboutUser}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              dolor nam vestibulum parturient augue etiam bibendum egestas nibh.
              Proin nulla interdum amet est ridiculus in leo. Nunc, ultricies
              blandit nisl, eget nec. Tincidunt elementum senectus mauris
              sapien.
            </Text>
            <DescTile
              leading="Business Name Registration"
              value="12/03/21"
              faintTrailing={true}
            />
            <DescTile
              leading="Business Name Registration"
              value="12/03/21"
              faintTrailing={true}
            />
            <DescTile
              leading="Business Name Registration"
              value="12/03/21"
              faintTrailing={true}
            />
            <View style={{ flex: 1 }} />
            <CustomButton
              btnText="Confirm"
              onClick={() => setModalVisibility(true)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(20),
    // paddingVertical: hp(18),
    ...globalStyles.centerHorizontal,
  },
  userPhoto: {
    resizeMode: "contain",
    width: wp(117),
    height: wp(117),
    borderRadius: 150,
  },
  name: {
    lineHeight: hp(16),
    fontWeight: "500",
    fontSize: wp(14),
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
    marginTop: hp(17),
    marginBottom: hp(17),
    textAlign: "center",
  },
  userDetails: {
    flex: 1,
    backgroundColor: "rgba(243, 242, 253, 0.51)",
    margin: 1,
    width: "100%",
    borderTopRightRadius: wp(24),
    borderTopLeftRadius: wp(24),
    paddingVertical: hp(17),
    paddingHorizontal: wp(28),
  },
  descTitle: {
    lineHeight: hp(24),
    fontWeight: "500",
    fontSize: wp(14),
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto-Medium",
    marginBottom: hp(18),
  },
  tileWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(12),
  },
  tileLeading: {
    fontWeight: "400",
    fontSize: wp(12),
    lineHeight: hp(14),
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto",
  },
  tileTrailing: {
    fontWeight: "700",
    fontSize: wp(12),
    lineHeight: hp(14),
    color: COLORS.light.primary,
    fontFamily: "Roboto-Medium",
  },
  aboutUser: {
    fontWeight: "400",
    fontSize: wp(12),
    lineHeight: hp(14),
    color: "rgba(0, 0, 0, 0.7)",
    textAlign: "justify",
    fontFamily: "Roboto",
    marginTop: hp(6),
    marginBottom: hp(32),
  },
});
