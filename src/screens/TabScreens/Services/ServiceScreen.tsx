import {StackScreenProps} from "@react-navigation/stack";
import CustomAppbar from "components/CustomAppbar";
import ServiceSearch from "components/ServiceSearch";
import globalStyles from "css/GlobalCss";
import {CategoryDb} from "database/CategoryDb";
import {ServiceDb} from "database/ServiceDb";
import {ROUTES} from "navigation/Routes";
import {ServiceStackParamList} from "navigation/ServiceStack";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {hp, wp} from "utils/Dimensions";
import ServiceCardTile from "./Components/ServiceCardTile";
import {useScrollToTop} from "@react-navigation/native";

type Props = StackScreenProps<ServiceStackParamList, ROUTES.SERVICE_SCREEN>;
interface filtered {
  categoryCode: string;
  image: number;
  serviceCode: string;
  serviceName: string;
}

const ServiceScreen = ({navigation}: Props) => {
  const ref = React.useRef<FlatList | null>(null);
  const [search, setSearch] = React.useState<string | any>();
  const [filteredData, setFilteredData] = React.useState<filtered[]>();

  useScrollToTop(ref);

  // console.log(ServiceDb.services);

  const filterCategories = (search: string): filtered[] => {
    const result = ServiceDb.services.filter((item) => {
      return item.serviceName!.startsWith(search);
    });

    return result;
  };

  return (
    <>
      <SafeAreaView
        style={[globalStyles.AndroidSafeArea, styles.safeAreaContainer]}>
        <KeyboardAvoidingView
          behavior={"padding"}
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.OS == "android" ? -300 : -50}>
          <CustomAppbar
            navigation={navigation}
            title="Services"
            showBorderBottom={false}
            hideBackButton={true}
          />

          <ServiceSearch
            filteredData={filteredData}
            search={search}
            style={styles.searchBar}
            searchFn={(value) => {
              setSearch(value);
              setFilteredData(filterCategories(value));
            }}
            onNavigateClick={(_: filtered) => {
              navigation.navigate(ROUTES.PICK_LAWYER_SCREEN, {
                service: _,
              });
            }}
          />

          <FlatList
            ref={ref}
            data={ServiceDb.services}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={[styles.container]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ServiceCardTile
                service={item}
                onClick={() => {
                  navigation.navigate(ROUTES.PICK_LAWYER_SCREEN, {
                    service: item,
                  });
                }}
              />
            )}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {},
  container: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
  },
  searchBar: {
    width: widthPercentageToDP("95%"),
    alignSelf: "center",
  },
});
