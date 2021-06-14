import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistedRootReducer from "./reducers";
import rootSaga from "./rootSaga";

// Setup Middlewares
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    // This is needed because redux-persist will prompt an error.  Redux-persist is using default redux configuration and redux-starter-kit is waiting for a string.
    serializableCheck: {
      // Redux bothers with payload.file that is a non-serializable value
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  sagaMiddleware,
];

// Create Store
const store = configureStore({
  reducer: persistedRootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

// Start rootSaga
sagaMiddleware.run(rootSaga);

//-->  Infer the `RootState` and `AppDispatch` types from the store itself
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
