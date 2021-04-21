import React, { useEffect, useState } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {
  CountryData,
  CountryInterface,
} from "../extra/CountryData";
import COLORS from "../utils/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  initialSnap: number;
  onClose: () => void;
  current: CountryInterface;
  onCountryChange: (country: CountryInterface) => void;
}

export function CountryPicker(props: Props) {
  const [countries, setCountries] = useState(CountryData.allCountries)
  let bsRef: any = React.createRef();

  useEffect(() => {
    bsRef.current.snapTo(props.initialSnap);
  }, [props.initialSnap]);

  const onTextChange = (text: string) => {
    let newCountries = CountryData.allCountries.filter(function (item) {
      return item.name.toLocaleLowerCase().includes(text.toLocaleLowerCase());
    });
    setCountries(newCountries)
  }

  const renderInner = () => (
    <View style={{ padding: 20, backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.inputWrapper}>
        <FeatherIcon
          name="search"
          size={wp("5.26%")}
          color={COLORS.light.inputText}
          style={styles.icon}
        />
        <TextInput placeholder={"Search..."} style={styles.input} onChangeText={(onTextChange)} />
      </View>

      {countries.length > 0 ? <FlatList
        data={countries}
        keyboardShouldPersistTaps={'handled'}
        bouncesZoom={true}
        renderItem={(data) => (
          <CountryItem country={data.item} current={props.current} />
        )}
        keyExtractor={(item) => item.code}
      /> : <Text style={styles.noResult}>No result found</Text>}
    </View>
  );
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const CountryItem = ({
    country,
    current,
  }: {
    country: CountryInterface,
    current: CountryInterface
  }) => (
    <TouchableOpacity onPress={() => { props.onCountryChange(country); props.onClose() }}>
      <View style={styles.countryItem}>
        <Text
          style={[
            styles.countryText,
            { color: country.code == current.code ? COLORS.light.secondary : "#001538" },
          ]}
        >
          {country.name}({country.dial_code})
      </Text>
        <FeatherIcon
          name="check"
          size={wp("5.26%")}
          color={COLORS.light.secondary}
          style={{ display: country.code == current.code ? "flex" : "none" }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <BottomSheet
      ref={bsRef}
      snapPoints={[330, 0]}
      renderContent={renderInner}
      renderHeader={renderHeader}
      initialSnap={props.initialSnap}
      onCloseEnd={() => props.onClose()}
      // callbackNode={props.fall}
      enabledGestureInteraction={true}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    // elevation: 5,
    paddingTop: 20,
    borderTopColor: '#eee',
    borderTopWidth: Platform.OS == "android" ? 1 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  inputWrapper: {
    backgroundColor: COLORS.light.inputBg,
    borderColor: COLORS.light.inputBorder,
    paddingHorizontal: wp("5.6%"),
    flexDirection: 'row',
    height: hp('6.15%'),
    width: '100%',
    borderRadius: wp('8%'),
    alignItems: 'center',
    marginBottom: hp('2.58%')
  },
  icon: {
    marginRight: wp('2.15%')
  },
  input: {
    flex: 1,
    fontSize: wp('3.2%')
  },
  countryItem: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 6,
    justifyContent: "space-between",
    marginVertical: hp("1.35%"),
    zIndex: 2
  },
  countryText: {
    fontSize: wp("4.26%"),
    overflow: 'hidden'
  },
  noResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});
