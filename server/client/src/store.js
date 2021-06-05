import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import usersReducer from "./features/users/usersSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

export default configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
