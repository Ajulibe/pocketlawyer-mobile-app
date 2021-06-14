import { PayloadAction } from "@reduxjs/toolkit";
import {
  call,
  ForkEffect,
  takeLatest,
  CallEffect,
  PutEffect,
  put,
} from "redux-saga/effects";
import { getUser, setSuccessUser, setErrorUser } from "../actions/index";
import * as UsersAPI from "../api/index";

function* getAllUserDetail({ payload }: PayloadAction<any>): Generator<
  | CallEffect
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void
> {
  const { userID } = payload;
  try {
    const res = yield call(UsersAPI.getUser, { userID });
    console.log(res);
    yield put(setSuccessUser(res));
  } catch (err) {
    yield put(setErrorUser());
  }
}

function* userSagas(): Generator<ForkEffect<never>, void> {
  yield takeLatest(getUser.type, getAllUserDetail);
}

export default userSagas;
