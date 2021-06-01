import React from "react";
import { Service } from "database/DBData";
import { LawyerModel } from "models/Interfaces";
import {
  BusinessNameAndRegistration,
  CompanyRegistration,
  RegOfIncTrustees,
} from "./BottomSheetServices/PreIncorporation";
import { Advisory } from "./BottomSheetServices/CompanySecretarialServices";

interface Props {
  modalOptions: {
    navigation: any;
    closeModal: () => void;
    service: Service;
    lawyer: LawyerModel;
  };
}
export default function renderView({ modalOptions }: Props) {
  switch (modalOptions.service.serviceCode) {
    //-->Company name registration
    case "01":
      return <BusinessNameAndRegistration {...modalOptions} />;
    case "02":
      return <CompanyRegistration {...modalOptions} />;
    case "03":
      return <RegOfIncTrustees {...modalOptions} />;
    //-->Company Secretarial Services
    case "04":
      return <Advisory {...modalOptions} />;

    default:
      return <BusinessNameAndRegistration {...modalOptions} />;
  }
}
