import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
} from "react-native";
import COLORS from "utils/Colors";
import { hp, wp } from "utils/Dimensions";
import { SearchBar } from "react-native-elements";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

interface ISearch {
  style?: ViewStyle;
}

const ServiceSearch: React.FC<ISearch> = ({ style }) => {
  const [search, setSearch] = useState<string | any>();
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
  const searchFn = (searchTerm: string) => {
    setSearch(searchTerm);
  };
  return (
    <>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: hp(20),
          },
          style,
        ]}
      >
        <SearchBar
          ref={searchBar}
          inputStyle={styles.searchbar}
          inputContainerStyle={styles.inputContainerStyle}
          placeholder="Search for services.."
          onChangeText={() => {
            return true;
          }}
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
          cancelButtonProps={{
            buttonStyle: { width: "wp(30)" },
            color: "red",
            buttonTextStyle: { color: "blue" },
          }}
        />
      </View>

      {focus ? (
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            width: widthPercentageToDP("100%"),
            marginBottom: hp(20),
            position: "absolute",
            backgroundColor: "#fff",
            flex: 1,
            height: heightPercentageToDP("100%"),
            zIndex: 100000,
            justifyContent: "center",
            paddingTop: hp(20),
            // Bind opacity to animated value
            opacity: fadeAnim,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "95%",
              justifyContent: "space-between",
              marginBottom: hp(20),
            }}
          >
            <SearchBar
              inputStyle={styles.searchbar}
              inputContainerStyle={styles.inputContainerStyle}
              placeholder="Search for services.."
              // @ts-ignore
              onChangeText={searchFn}
              value={search}
              showLoading
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
                }}
              >
                <Text
                  style={{
                    color: COLORS.light.primary,
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#7C7C7C",
  },
});

export default ServiceSearch;
