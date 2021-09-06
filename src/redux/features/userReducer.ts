import {setSuccessUser, setErrorUser, setResetUser} from "../actions/index";
import {createReducer} from "@reduxjs/toolkit";
import {reducer as network} from "react-native-offline";
// Define a type for the slice state
interface IUser {
  data: number;
  user: any;
  status: string;
}

// Define the initial state using that type
// const initialState: IUser = {
//   data: 0,
// };

//--> an alternative to the above
const initialState = {
  data: 0,
  user: "",
  status: "initial",
} as IUser;

export const reducer = createReducer(initialState, {
  [setSuccessUser.type]: (state, action) => {
    state.user = action.payload;
    state.status = "success";
  },
  [setErrorUser.type]: (state) => {
    state.status = "failed";
  },
  [setResetUser.type]: (state) => {
    state.user = {};
    state.status = "Initial";
  },
});
