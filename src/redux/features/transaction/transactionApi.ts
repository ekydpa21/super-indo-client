import { apiSlice } from "../api/apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    transactions: builder.query({
      query: ({ session }: { session: string }) => ({
        url: "/transactions",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      providesTags: ["Transaction"],
    }),
    addTransaction: builder.mutation({
      query: ({
        product_variant_id,
        session,
      }: {
        product_variant_id: number;

        session: string;
      }) => ({
        url: "/transaction/add",
        method: "POST",
        body: { product_variant_id: +product_variant_id },
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Transaction"],
    }),

    addQuantity: builder.mutation({
      query: ({ id, session }: { id: number; session: string }) => ({
        url: `/transaction/${id}/add`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Transaction"],
    }),
    reduceQuantity: builder.mutation({
      query: ({ id, session }: { id: number; session: string }) => ({
        url: `/transaction/${id}/reduce`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Transaction"],
    }),
    editTransaction: builder.mutation({
      query: ({
        id,
        transaction_category_id,
        name,
        active,
        session,
      }: {
        id: number;
        transaction_category_id: number;
        name: string;
        active: boolean;
        session: string;
      }) => ({
        url: `/transaction/update-transaction/${id}`,
        method: "PUT",
        body: { transaction_category_id: +transaction_category_id, name, active },
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteTransaction: builder.mutation({
      query: ({ id, session }: { id: number; session: string }) => ({
        url: `/transaction/${id}/delete`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Transaction"],
    }),
    checkout: builder.mutation({
      query: ({ data, session }: { data: any; session: string }) => ({
        url: "/transaction/checkout",
        method: "POST",
        body: {},
        // body: { data},
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useTransactionsQuery,
  useAddTransactionMutation,
  useAddQuantityMutation,
  useReduceQuantityMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
  useCheckoutMutation,
} = transactionApi;
