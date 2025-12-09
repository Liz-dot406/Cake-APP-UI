import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { usersAPI } from "../features/users/usersAPI";
import { loginAPI } from "../features/auth/loginapi";
import { cakesAPI } from "../features/cakes/cakesAPI"; 
import { ordersAPI } from "../features/orders/ordersAPI";
import { designsAPI } from "../features/designs/designAPI";
import userSlice from "../features/auth/userslice";

const persistConfig = {
  key: "cakestore",
  version: 1,
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [cakesAPI.reducerPath]: cakesAPI.reducer, 
  [ordersAPI.reducerPath]: ordersAPI.reducer,
  [designsAPI.reducerPath]: designsAPI.reducer,
  user: userSlice,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(usersAPI.middleware)
      .concat(loginAPI.middleware)
      .concat(cakesAPI.middleware)
      .concat(ordersAPI.middleware)
      .concat(designsAPI.middleware), 
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
