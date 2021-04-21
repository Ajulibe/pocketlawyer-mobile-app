import { AUTH_TYPES, AuthActionTypes, UserInterface } from "../types/AuthTypes";

import { GEN_ACTIONS, FetchActionTypes } from "../types/CommonTypes";

interface AuthState {
  user: UserInterface;
  error?: string | null;
  loading?: boolean | null;
  success?: boolean;
}

const initialState: AuthState = {
  user: {
    phoneNumber: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
  },
  error: null,
  loading: null,
  success: false,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActionTypes | FetchActionTypes
): AuthState {
  switch (action.type) {
    case AUTH_TYPES.USER_LOGIN: {
      return {
        ...state,
        user: action.payload,
        error: null,
        success: true,
      };
    }
    case AUTH_TYPES.USER_REGISTRATION: {
      return {
        ...state,
        user: action.payload,
        error: null,
        success: true,
      };
    }
    case AUTH_TYPES.USER_PROFILE_UPDATE: {
      return {
        ...state,
        user: action.payload,
        error: null,
        success: true,
      };
    }
    case GEN_ACTIONS.DATA_LOADING: {
      return {
        ...state,
        loading: action.payload,
        error: null,
        success: false,
      };
    }
    case GEN_ACTIONS.ERROR: {
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    }
    default:
      return state;
  }
}
