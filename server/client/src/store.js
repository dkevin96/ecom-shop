import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import usersReducer from "./features/users/usersSlice";
import cartReducer from "./features/cart/cartSlice";
import ordersReducer from "./features/orders/ordersSlice";
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

const userpersistConfig = {
  key: "user",
  storage,
};
const persistedUserReducer = persistReducer(userpersistConfig, usersReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export default configureStore({
  reducer: {
    products: productsReducer,
    users: persistedUserReducer,
    cart: persistedCartReducer,
    orders: ordersReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
