import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import IMAGES from '../utils/Images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CELL_COUNT = 6;

const LoadingSpinner = () => {

  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.loading}
        style={styles.image}
      />

    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: hp('3.36%'),
    alignItems: 'center'
  },
  image: {

  }
})


