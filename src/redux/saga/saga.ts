import { PayloadAction } from "@reduxjs/toolkit";
import {
  call,
  ForkEffect,
  takeLatest,
  CallEffect,
  PutEffect,
  takeEvery,
  put,
} from "redux-saga/effects";
import {
  getUser,
  setSuccessUser,
  setErrorUser,
  setResetUser,
} from "../actions/index";
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
    const res: any = yield call(UsersAPI.getUser, { userID });
    yield put(setSuccessUser(res.metaData));
  } catch (err) {
    yield put(setErrorUser());
  }
}

function* resetAllUserDetail({ payload }: PayloadAction<any>): Generator<
  | CallEffect
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void
> {
  try {
    yield put(setSuccessUser({}));
  } catch (err) {
    yield put(setErrorUser());
  }
}

//--> general saga watcher for users
function* userSagas(): Generator<ForkEffect<never>, void> {
  yield takeLatest(getUser.type, getAllUserDetail);
  yield takeEvery(setResetUser.type, resetAllUserDetail);
}

export default userSagas;
