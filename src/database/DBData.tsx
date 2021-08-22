import React from "react";
import IMAGES from "../utils/Images";

import {FontAwesome5} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {Octicons} from "@expo/vector-icons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Foundation} from "@expo/vector-icons";

import COLORS from "utils/Colors";
import {wp} from "utils/Dimensions";

export interface Category {
  categoryName: string;
  categoryCode: string;
  image: any;
  newImage?: any;
}
export const allCategories: Category[] = [
  {
    categoryName: "Pre-Incorporation",
    categoryCode: "01",
    image: IMAGES["cat-pre-incorporation"],
    newImage: (
      <MaterialCommunityIcons
        name="office-building"
        size={wp(17)}
        color={COLORS.light.primary}
      />
    ),
  },
  {
    categoryName: "Post-Incorporation",
    categoryCode: "03",
    image: IMAGES["cat-company-reg"],
    newImage: (
      <FontAwesome5
        name="acquisitions-incorporated"
        size={wp(15)}
        color={COLORS.light.primary}
      />
    ),
  },
  {
    categoryName: "Legal Drafting",
    categoryCode: "06",
    image: IMAGES["cat-company-reg"],
    newImage: (
      <FontAwesome5
        name="drafting-compass"
        size={wp(14)}
        color={COLORS.light.primary}
      />
    ),
  },

  {
    categoryName: "Registration",
    categoryCode: "07",
    image: IMAGES["cat-company-reg"],
    newImage: (
      <FontAwesome5
        name="registered"
        size={wp(16)}
        color={COLORS.light.primary}
      />
    ),
  },
  {
    categoryName: "Land Documents",
    categoryCode: "08",
    image: IMAGES["cat-company-reg"],
    newImage: (
      <Foundation name="mountains" size={wp(18)} color={COLORS.light.primary} />
    ),
  },
  {
    categoryName: "Company Secretarial Services",
    categoryCode: "02",
    image: IMAGES["cat-company-reg"],
    newImage: (
      <AntDesign
        name="customerservice"
        size={wp(15)}
        color={COLORS.light.primary}
      />
    ),
  },

  {
    categoryName: "Review of Legal Documents",
    categoryCode: "04",
    image: IMAGES["cat-company-reg"],
    newImage: (
      <AntDesign name="file1" size={wp(14)} color={COLORS.light.primary} />
    ),
  },
  {
    categoryName: "Legal Advice and Consultancy",
    categoryCode: "05",
    image: IMAGES["cat-pre-incorporation"],
    newImage: (
      <Octicons name="law" size={wp(16)} color={COLORS.light.primary} />
    ),
  },
];

export interface Service {
  serviceCode: string;
  serviceName: string;
  categoryCode: string;
  image: any;
}
export const allServices: Service[] = [
  //-->Pre-Incorporation
  {
    serviceCode: "01",
    serviceName: "Business Name Registration",
    categoryCode: "01",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "02",
    serviceName: "Company Registration",
    categoryCode: "01",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "03",
    serviceName: "Registration of Incorporated Trustees",
    categoryCode: "01",
    image: IMAGES["cat-company-reg"],
  },
  //-->Company Secretarial Services
  {
    serviceCode: "04",
    serviceName: "Advisory services",
    categoryCode: "02",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "05",
    serviceName: "Filling of annual tax returns",
    categoryCode: "02",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "06",
    serviceName: "Attestation and execution of company documents",
    categoryCode: "02",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "07",
    serviceName: "Organize both Board and Annual General Meetings",
    categoryCode: "02",
    image: IMAGES["cat-company-reg"],
  },
  //-->Post-Incorporation
  {
    serviceCode: "08",
    serviceName: "Change of Registered Address",
    categoryCode: "03",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "09",
    serviceName: "Notice of change of Directors",
    categoryCode: "03",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "10",
    serviceName: "Increase of Shared Capitals",
    categoryCode: "03",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "11",
    serviceName: "Change of Trustees",
    categoryCode: "03",
    image: IMAGES["cat-company-reg"],
  },
  //-->Review of Legal Documents
  {
    serviceCode: "12",
    serviceName: "Contract analysis and Review",
    categoryCode: "04",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "13",
    serviceName: "Demand letters review",
    categoryCode: "04",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "14",
    serviceName: "Joint ventures agreement review/Partnership agreement Review",
    categoryCode: "04",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "15",
    serviceName: "Review of artist management Agreement",
    categoryCode: "04",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "16",
    serviceName: "Reconstructuring of pre-drafted contracts",
    categoryCode: "04",
    image: IMAGES["cat-company-reg"],
  },
  //--> Legal Advice and Consultancy
  {
    serviceCode: "17",
    serviceName:
      "Legal advice on joint venture agreements, indirect taxes, and real estate transactions",
    categoryCode: "05",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "18",
    serviceName: "Trademark consultancy",
    categoryCode: "05",
    image: IMAGES["cat-company-reg"],
  },
  //--> Legal Drafting
  {
    serviceCode: "19",
    serviceName:
      "Drafting petitions and reply to petitions, Negotiation & Review of Real Estate Agreement, Negotiation of Record Label agreement",
    categoryCode: "06",
    image: IMAGES["cat-company-reg"],
  },
  {
    serviceCode: "20",
    serviceName: "Artist management agreement (Songwriters and Producers)",
    categoryCode: "06",
    image: IMAGES["cat-company-reg"],
  },
  //--> Registration
  {
    serviceCode: "21",
    serviceName: "Trademark, Copyright and Patents and design registration",
    categoryCode: "07",
    image: IMAGES["cat-company-reg"],
  },
  //--> Land Documents
  {
    serviceCode: "22",
    serviceName: "Perfection of Title, Drafting of deed of assignment",
    categoryCode: "08",
    image: IMAGES["cat-company-reg"],
  },
];
