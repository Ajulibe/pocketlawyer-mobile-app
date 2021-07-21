import React from "react";
import _ from "lodash";
import {PLToast} from "components/PLToast/index.component";
import axiosClient from "utils/axiosClient";
import {submitCategories} from "navigation/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CategoryDb} from "database/CategoryDb";

export const useAddMoreCategories = (
  data: any,
  navigation: any,
  add: boolean,
) => {
  const [preincorporation, setPreIncorporation] =
    React.useState<boolean>(false);
  const [companysecretarial, setCompanysecretarial] =
    React.useState<boolean>(false);
  const [postincorporation, setPostincorporation] =
    React.useState<boolean>(false);
  const [reviewofLegal, setReviewofLegal] = React.useState<boolean>(false);
  const [legaladvice, setLegaladvice] = React.useState<boolean>(false);
  const [legaldrafting, setLegaldrafting] = React.useState<boolean>(false);

  const [catadata, setCatData] = React.useState<any>([]);
  const [selectedcat, setSelectedCat] = React.useState<string[]>([]);
  const [unselectedcat, setUnSelectedCat] = React.useState<string[]>([]);

  const [isRemoveOpen, setIsRemoveOpen] = React.useState(false);
  const [isAddmoreOpen, setIsAddmoreOpen] = React.useState(false);

  const [isdisabled, setIsDisabled] = React.useState(true);
  const [isloading, setIsLoading] = React.useState<boolean | null>(null);

  const addingObject = {
    reviewofLegal,
    legaladvice,
    legaldrafting,
    preincorporation,
    companysecretarial,
    postincorporation,
  };

  React.useEffect(() => {
    if (
      reviewofLegal ||
      legaladvice ||
      legaldrafting ||
      preincorporation ||
      companysecretarial ||
      postincorporation
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [...Object.values(addingObject)]);

  React.useEffect(() => {
    if (typeof data === "undefined") {
      return;
    }
    setCatData(data);
  }, [data]);

  React.useEffect(() => {
    if (catadata.length < 0) {
      return;
    }

    getUnselectedCategories();
  }, [catadata]);

  //--> loading state
  const [loading, setLoading] = React.useState(false);

  const selectedCategories = [
    {
      name: CategoryDb.categories[0].categoryName,
      code: CategoryDb.categories[0].categoryCode,
      value: preincorporation,
    },
    {
      name: CategoryDb.categories[1].categoryName,
      code: CategoryDb.categories[1].categoryCode,
      value: companysecretarial,
    },
    {
      name: CategoryDb.categories[2].categoryName,
      code: CategoryDb.categories[2].categoryCode,
      value: postincorporation,
    },
    {
      name: CategoryDb.categories[3].categoryName,
      code: CategoryDb.categories[3].categoryCode,
      value: reviewofLegal,
    },
    {
      name: CategoryDb.categories[4].categoryName,
      code: CategoryDb.categories[4].categoryCode,
      value: legaladvice,
    },
    {
      name: CategoryDb.categories[5].categoryName,
      code: CategoryDb.categories[5].categoryCode,
      value: legaldrafting,
    },
  ];

  const getUnselectedCategories = () => {
    const arrayDb: string[] = [];
    const catDb: string[] = [];

    selectedCategories.map((item) => {
      arrayDb.push(item.name);
    });

    catadata.map((item: any) => {
      catDb.push(item.categoryName);
    });

    const difference = _.difference(arrayDb, catDb);

    setTimeout(() => {
      setUnSelectedCat(difference);
      setSelectedCat(catDb);
    }, 1000);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const filterCategories = async () => {
    const fliteredCategories = selectedCategories.filter((item) => {
      return item.value === true;
    });

    const Categorylist = fliteredCategories.map((item) => {
      return {CategoryCode: item.code, CategoryName: item.name};
    });

    try {
      //--> reading async storage value
      const userType = await AsyncStorage.getItem("userType");
      const userID = await AsyncStorage.getItem("userID");

      const Payload: submitCategories = {
        UserId: userID === null ? "" : JSON.parse(userID),
        UserType: userType === null ? "" : JSON.parse(userType),
        Categorylist: Categorylist,
      };

      submitCategoriesFn(Payload);
    } catch (error) {
      //---> return the error
    }
  };

  const submitCategoriesFn = async (Payload: submitCategories) => {
    setLoading(true);

    const endpoint = add ? "AddUSerCategory" : "RemoveUSerCategory";

    console.log(add, Payload);

    try {
      await axiosClient.post(`Category/${endpoint}`, Payload);
      setTimeout(() => {
        setLoading(false);
        PLToast({
          message: add ? "Categories added" : "Categories removed",
          type: "success",
        });

        navigation.goBack();
      }, 3000);
    } catch (error) {
      setLoading(false);

      PLToast({
        message: add ? "Error Adding Categories" : "Error Removing Categories",
        type: "error",
      });

      return;
    }
  };

  const setAccepted = (name: string) => {
    switch (name) {
      case "Pre-Incorporation":
        return setPreIncorporation(!preincorporation);
      case "Company Secretarial Services":
        return setCompanysecretarial(!companysecretarial);
      case "Post-Incorporation":
        return setPostincorporation(!postincorporation);
      case "Review of Legal Documents":
        return setReviewofLegal(!reviewofLegal);
      case "Legal Advice and Consultancy":
        return setLegaladvice(!legaladvice);
      case "Legal Drafting":
        return setLegaldrafting(!legaldrafting);
      default:
        break;
    }
  };

  const getSelected = (name: string) => {
    switch (name) {
      case "Pre-Incorporation":
        return preincorporation;
      case "Company Secretarial Services":
        return companysecretarial;
      case "Post-Incorporation":
        return postincorporation;
      case "Review of Legal Documents":
        return reviewofLegal;
      case "Legal Advice and Consultancy":
        return legaladvice;
      case "Legal Drafting":
        return legaldrafting;
      default:
        break;
    }
  };

  return {
    setIsRemoveOpen,
    setIsAddmoreOpen,
    isRemoveOpen,
    isAddmoreOpen,
    selectedcat,
    unselectedcat,
    getSelected,
    setAccepted,
    isloading,
    filterCategories,
    isdisabled,
    loading,
  };
};
