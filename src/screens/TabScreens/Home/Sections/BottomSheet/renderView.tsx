import React from "react";
import { Service } from "database/DBData";
import { LawyerModel } from "models/Interfaces";
import {
  BusinessNameAndRegistration,
  CompanyRegistration,
  RegOfIncTrustees,
} from "./BottomSheetServices/PreIncorporation";
import { Advisory } from "./BottomSheetServices/CompanySecretarialServices";
import {
  ChangeOfRegisteredAddr,
  ChangeOfTrustee,
  IncreaseOfShareCapital,
  NoticeOfChangeOfDirector,
} from "./BottomSheetServices/PostIncorporation";
import { ReviewOfLegalDocs } from "./BottomSheetServices/ReviewOfLegalDocs";
import { LegalDrafting } from "./BottomSheetServices/LegalDrafting";
import { ModalProps } from "./BottomSheetModal";

export default function renderView(props: ModalProps) {
  switch (props.service.serviceCode) {
    //-->Pre-Incorporation
    case "01":
      return <BusinessNameAndRegistration {...props} />;
    case "02":
      return <CompanyRegistration {...props} />;
    case "03":
      return <RegOfIncTrustees {...props} />;
    //-->Company Secretarial Services
    case "04":
      return <Advisory {...props} />;
    case "05":
      return <Advisory {...props} />;
    case "06":
      return <Advisory {...props} />;
    case "07":
      return <Advisory {...props} />;
    //-->Post-Incorporation
    case "08":
      return <ChangeOfRegisteredAddr {...props} />;
    case "09":
      return <NoticeOfChangeOfDirector {...props} />;
    case "10":
      return <IncreaseOfShareCapital {...props} />;
    case "11":
      return <ChangeOfTrustee {...props} />;
    //-->Review of Legal Documents
    case "12":
      return <ReviewOfLegalDocs {...props} />;
    case "13":
      return <ReviewOfLegalDocs {...props} />;
    case "14":
      return <ReviewOfLegalDocs {...props} />;
    case "15":
      return <ReviewOfLegalDocs {...props} />;
    case "16":
      return <ReviewOfLegalDocs {...props} />;
    //-->Review of Legal Documents
    case "19":
      return <LegalDrafting {...props} />;
    case "20":
      return <LegalDrafting {...props} />;

    default:
      return <BusinessNameAndRegistration {...props} />;
  }
}
