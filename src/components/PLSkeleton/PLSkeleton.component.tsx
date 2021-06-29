import React from "react";
import { hp, wp } from "utils/Dimensions";
import SkeletonContent from "react-native-skeleton-content";

const secondLayout = [
  {
    width: "100%",
    height: 20,
    marginBottom: 8,
  },
  {
    width: "100%",
    height: 20,
    marginBottom: 8,
    marginLeft: 0,
  },
  {
    width: "100%",
    height: 20,
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
}

export const CircularSkeleton: React.FC<ICircularProps> = ({ isLoading }) => {
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
}) => {
  return (
    <SkeletonContent
      layout={secondLayout}
      isLoading={isLoading}
      animationType="shiver"
    />
  );
};
