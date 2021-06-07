import { Service } from "database/DBData";
import { LawyerModel } from "models/Interfaces";

export interface BottomSheetProps {
    navigation: any;
    closeModal: () => void;
    service: Service;
    lawyer: LawyerModel;
    historyId: number;
    amount: number;
  }