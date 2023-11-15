"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import menuSlice from "./features/menu/menuSlice";
import categorySlice from "./features/category/categorySlice";
import productSlice from "./features/product/productSlice";

export const store: any = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    menu: menuSlice,
    category: categorySlice,
    product: productSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// const initializeApp = async () => {
//   await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
//   await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
// };

// initializeApp();
