export enum GEN_ACTIONS {
  DATA_LOADING = "data_loading",
  ERROR = "error",
}

interface FetchRequestAction {
  type: typeof GEN_ACTIONS.DATA_LOADING;
  payload?: boolean;
}

interface FetchFailureAction {
  type: typeof GEN_ACTIONS.ERROR;
  payload: any;
}

export type FetchActionTypes = FetchRequestAction | FetchFailureAction;
