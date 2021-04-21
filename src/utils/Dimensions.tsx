import {
   widthPercentageToDP as wp2dp,
   heightPercentageToDP as hp2dp
} from "react-native-responsive-screen";

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 375, 812 - This is the widht and height
 * of the frame in use on Figma either iphone X or 11
 * @param dimension @typedef number directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */

export const wp = (dimension: number) => {
   return wp2dp((dimension / 375) * 100 + "%");
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * 375, 812 - This is the widht and height
 * of the frame in use on Figma either iphone X or 11
 * @param dimension  @typedef number directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */

export const hp = (dimension: number) => {
   return hp2dp((dimension / 812) * 100 + "%");
};
