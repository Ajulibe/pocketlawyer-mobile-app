import { GEN_ACTIONS, FetchActionTypes } from "../types/CommonTypes";
import { ActionCreator } from "redux";

export const loading: ActionCreator<FetchActionTypes> = (loading: boolean) => {
  return { type: GEN_ACTIONS.DATA_LOADING, payload: loading };
};
export const failure: ActionCreator<FetchActionTypes> = (error: string) => {
  return { type: GEN_ACTIONS.ERROR, payload: error };
};
