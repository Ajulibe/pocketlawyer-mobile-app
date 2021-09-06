import React, {useState} from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  ScrollView,
} from "react-native";
import COLORS from "utils/Colors";
import {hp, wp} from "utils/Dimensions";
import {SearchBar} from "react-native-elements";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ServiceCardTile from "screens/TabScreens/Services/Components/ServiceCardTile";

interface filtered {
  categoryCode: string;
  image: number;
  serviceCode: string;
  serviceName: string;
}
interface ISearch {
  style?: ViewStyle;
  searchFn?: (value: string) => void;
  search?: string;
  filteredData?: filtered[];
  onNavigateClick?: any;
}

const ServiceSearch: React.FC<ISearch> = ({
  style,
  searchFn,
  search = "",
  filteredData,
  onNavigateClick,
}) => {
  // const [search, setSearch] = useState<string | any>();
  const [focus, setFocus] = useState<boolean>(false);
  const searchBar = React.useRef<any>();
  const fadeAnim = React.useRef<any>(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 0.4 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 0.5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  // const searchFn = (searchTerm: string) => {
  //   setSearch(searchTerm);
  // };

  return (
    <>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            // marginBottom: hp(20),
            paddingHorizontal: wp(8),
          },
          style,
        ]}>
        {/* @ts-ignore */}
        <SearchBar
          ref={searchBar}
          inputStyle={styles.searchbar}
          inputContainerStyle={styles.inputContainerStyle}
          placeholder="Search for services.."
          onChangeText={() => {}}
          onFocus={() => {
            if (focus) {
              return;
            }
            fadeIn();
            setFocus(true);
          }}
          showCancel
          lightTheme={true}
          containerStyle={[
            styles.containerStyling,
            {
              width: "100%",
            },
          ]}
        />
      </View>

      {focus ? (
        <Animated.View
          style={{
            flexDirection: "column",
            alignItems: "center",
            width: widthPercentageToDP("100%"),
            marginBottom: hp(20),
            position: "absolute",
            backgroundColor: "#fff",
            flex: 1,
            height: heightPercentageToDP("100%"),
            zIndex: 100000,
            // justifyContent: "center",
            paddingTop: hp(20),
            // Bind opacity to animated value
            opacity: fadeAnim,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "95%",
              justifyContent: "space-between",
              marginBottom: hp(20),
            }}>
            <SearchBar
              inputStyle={styles.searchbar}
              autoFocus
              inputContainerStyle={styles.inputContainerStyle}
              placeholder="Search for services.."
              // @ts-ignore
              onChangeText={searchFn}
              value={search}
              showCancel
              lightTheme={true}
              containerStyle={[
                styles.containerStyling,
                {
                  width: focus ? "85%" : "100%",
                },
              ]}
            />

            {focus && (
              <TouchableOpacity
                style={{
                  height: hp(40),
                  justifyContent: "center",
                }}
                onPress={() => {
                  fadeOut();
                  searchBar.current.blur();
                  setTimeout(() => {
                    setFocus(false);
                  }, 500);
                }}>
                <Text
                  style={{
                    color: COLORS.light.primary,
                    fontFamily: "Roboto-Medium",
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <ScrollView
            style={styles.result}
            showsVerticalScrollIndicator={false}>
            {filteredData?.map((item, index) => {
              return (
                <ServiceCardTile
                  key={`${item}${index}`}
                  service={item}
                  onClick={() => {
                    onNavigateClick(item);
                  }}
                />
              );
            })}
          </ScrollView>
        </Animated.View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  containerStyling: {
    width: widthPercentageToDP("75%"),
    backgroundColor: "#ffffff",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainerStyle: {
    backgroundColor: "#F2F3F2",
    borderRadius: 10,
    maxHeight: hp(40),
    width: "100%",
  },
  searchbar: {
    backgroundColor: "#F2F3F2",
    fontSize: wp(14),
    fontFamily: "Roboto-Regular",
    color: "#7C7C7C",
  },
  result: {
    width: "90%",
    height: heightPercentageToDP("80%"),
  },
});

export default ServiceSearch;
