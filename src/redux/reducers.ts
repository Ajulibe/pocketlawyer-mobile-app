import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistCombineReducers} from "redux-persist";
import {reducer} from "./features/userReducer";

const reducers = {
  users: reducer,
};

//--> this is persisting the data or users reducer
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["users"],
};

//-->  Infer the `RootState` and `AppDispatch` types from the store itself
export const persistedRootReducer = persistCombineReducers(
  persistConfig,
  reducers,
);

export default persistedRootReducer;
