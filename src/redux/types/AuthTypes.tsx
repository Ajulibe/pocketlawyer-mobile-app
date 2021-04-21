export interface UserInterface {
  id?: String;
  uuid?: String;
  userType?: "user|merchant";
  phoneNumber: string;
  firstName: string;
  lastName: string;
  emailAddress?: string;
  accessToken?: string;
  accessTokenExpires?: string;
  refreshToken?: string;
  refreshTokenExpires?: string;
}

//different operation types....
export enum AUTH_TYPES {
  USER_REGISTRATION = "AUTH_REGISTRATION",
  USER_LOGIN = "AUTH_LOGIN",
  USER_PROFILE_UPDATE = "AUTH_UPDATE_PROFILE",
}

interface RegisterAction {
  type: typeof AUTH_TYPES.USER_REGISTRATION;
  payload: UserInterface;
}

interface LoginAction {
  type: typeof AUTH_TYPES.USER_LOGIN;
  payload: UserInterface;
}

interface UpdateProfileAction {
  type: typeof AUTH_TYPES.USER_PROFILE_UPDATE;
  payload: UserInterface;
}

export type AuthActionTypes =
  | RegisterAction
  | LoginAction
  | UpdateProfileAction;
