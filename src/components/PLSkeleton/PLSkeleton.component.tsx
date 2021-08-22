import React from "react";
import {hp, wp} from "utils/Dimensions";
import SkeletonContent from "react-native-skeleton-content";
import {View} from "react-native";

const topFindingsLayout = [
  {
    flexDirection: "row",
    width: "100%",
    height: 60,
    marginBottom: 10,
    alignItems: "center",
    paddingLeft: 5,
    children: [
      {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: "5%",
      },
      {
        width: "80%",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        children: [
          {
            width: "100%",
            height: "35%",
          },
          {
            width: "100%",
            height: "35%",
          },
        ],
      },
    ],
  },
];

const yourCategoriesLayout = [
  {
    flexDirection: "column",
    width: wp(120),
    marginBottom: 10,
    marginTop: 20,
    alignItems: "center",
    paddingLeft: 5,
    marginLeft: wp(5),
    paddingBottom: hp(12),
    paddingHorizontal: wp(12),
    paddingTop: wp(10),
    // borderWidth: 1,
    children: [
      {
        width: 40,
        height: 40,
        borderRadius: 40,
      },
      {
        width: "80%",
        height: "50%",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: hp(16),
        marginBottom: hp(10),
        children: [
          {
            width: "100%",
            height: "15%",
          },
          {
            width: "100%",
            height: "15%",
          },
        ],
      },
    ],
  },
];

const firstLayout = [
  {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: wp(15),
    marginBottom: hp(10),
  },
  {
    width: 80,
    height: 30,
    marginBottom: hp(5),
    marginRight: wp(15),
  },
  {
    width: 80,
    height: 30,
    marginRight: wp(15),
    marginBottom: hp(5),
  },
  {
    width: 80,
    height: 30,
    marginRight: wp(15),
  },
];

interface ICircularProps {
  isLoading: boolean;
  style?: any;
}

export const CircularSkeleton: React.FC<ICircularProps> = ({isLoading}) => {
  return (
    <SkeletonContent
      layout={firstLayout}
      isLoading={isLoading}
      animationType="shiver"
    />
  );
};

export const RectangularSkeleton: React.FC<ICircularProps> = ({
  isLoading,
  style,
}) => {
  return (
    <View style={[style]}>
      <SkeletonContent
        // @ts-ignore
        layout={topFindingsLayout}
        isLoading={isLoading}
        animationType="shiver"
      />
    </View>
  );
};

export const CategoriesSkeleton: React.FC<ICircularProps> = ({
  isLoading,
  style,
}) => {
  return (
    <View style={[style]}>
      <SkeletonContent
        // @ts-ignore
        layout={yourCategoriesLayout}
        isLoading={isLoading}
        animationType="shiver"
      />
    </View>
  );
};
