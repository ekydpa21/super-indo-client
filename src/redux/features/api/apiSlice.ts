import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice: any = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
  tagTypes: ["Category", "Product", "ProductVariant", "Cart", "Transaction"],
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
