import { createAction } from "@reduxjs/toolkit";
export const getUser = createAction<any>("GET_USER_DETAILS");
export const setSuccessUser = createAction<any>("SET_USER_DETAILS_SUCCESS");
export const setErrorUser = createAction("SET_USER_DETAILS_ERROR");
export const setResetUser = createAction("SET_RESET_USER");
