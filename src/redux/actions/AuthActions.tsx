import { AUTH_TYPES, AuthActionTypes, UserInterface } from "../types/AuthTypes";
import { AuthService } from "../../services/AuthService";
import { loading, failure } from "./CommonActions";
import { Action, ActionCreator } from "redux";
import { Dispatch } from "react";
import { AuthDetail } from "../../models/AuthDetail";
// import { PhoneNumber } from "google-libphonenumber";

//ACTIONS
const userLoginSuccess: ActionCreator<AuthActionTypes> = (
  user: UserInterface
) => {
  return { type: AUTH_TYPES.USER_LOGIN, payload: user };
};
const userRegisterSuccess: ActionCreator<AuthActionTypes> = (
  user: UserInterface
) => {
  return { type: AUTH_TYPES.USER_REGISTRATION, payload: user };
};
const userProfileUpdateSuccess: ActionCreator<AuthActionTypes> = (
  user: UserInterface
) => {
  return { type: AUTH_TYPES.USER_PROFILE_UPDATE, payload: user };
};

//ACTION FUNCTIONS
export function registerUser({ authDetail }: { authDetail: AuthDetail }) {
  //to be called from sreen pahges
  return (dispatch: Dispatch<Action>) => {
    // async action: uses Redux-Thunk middleware to return a function instead of an action creator
    dispatch(loading(true));
    return AuthService.userRegistration({ authDetail: authDetail }).then(
      (response: any) => {
        dispatch(loading(false));
        if (typeof response === "object" && response !== null) {
          dispatch(userRegisterSuccess(response));
        } else {
          dispatch(failure(response));
        }
      },
      (error: any) => {
        dispatch(loading(false));
        dispatch(failure("Server error. " + error));
      }
    );
  };
}

export function loginUser({
  PhoneNumber,
  pin,
}: {
  PhoneNumber: String;
  pin: String;
}) {
  return (dispatch: any) => {
    dispatch(loading(true));
    return AuthService.userLogin({ phoneNumber: PhoneNumber, pin: pin }).then(
      (response: any) => {
        dispatch(loading(false));
        if (typeof response === "object" && response !== null) {
          dispatch(userLoginSuccess(response));
        } else {
          dispatch(failure(response));
        }
      },
      (error) => {
        dispatch(loading(false));
        dispatch(failure("Server error. " + error));
      }
    );
  };
}
