//@ts-nocheck
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer } from "redux-persist";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "features/user/userSlice";

const persistConfig = {
    key: "root",
    storage,
  },
  reducers = combineReducers({ counter: counterReducer, user: userReducer });

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
