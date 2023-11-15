import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    carts: builder.query({
      query: ({ session }: { session: string }) => ({
        url: "/carts",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      providesTags: ["Cart"],
    }),
    addCart: builder.mutation({
      query: ({
        product_variant_id,
        session,
      }: {
        product_variant_id: number;

        session: string;
      }) => ({
        url: "/cart/add",
        method: "POST",
        body: { product_variant_id: +product_variant_id },
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Cart"],
    }),

    addQuantity: builder.mutation({
      query: ({ id, session }: { id: number; session: string }) => ({
        url: `/cart/${id}/add`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Cart"],
    }),
    reduceQuantity: builder.mutation({
      query: ({ id, session }: { id: number; session: string }) => ({
        url: `/cart/${id}/reduce`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Cart"],
    }),
    editCart: builder.mutation({
      query: ({
        id,
        cart_category_id,
        name,
        active,
        session,
      }: {
        id: number;
        cart_category_id: number;
        name: string;
        active: boolean;
        session: string;
      }) => ({
        url: `/cart/update-cart/${id}`,
        method: "PUT",
        body: { cart_category_id: +cart_category_id, name, active },
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: ({ id, session }: { id: number; session: string }) => ({
        url: `/cart/${id}/delete`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Cart"],
    }),
    checkout: builder.mutation({
      query: ({ data, session }: { data: any; session: string }) => ({
        url: "/cart/checkout",
        method: "POST",
        body: {},
        // body: { data},
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useCartsQuery,
  useAddCartMutation,
  useAddQuantityMutation,
  useReduceQuantityMutation,
  useEditCartMutation,
  useDeleteCartMutation,
  useCheckoutMutation,
} = cartApi;
