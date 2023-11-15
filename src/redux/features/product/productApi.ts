import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    products: builder.query({
      query: ({ session }: { session: string }) => ({
        url: "/products",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: ({
        product_category_id,
        name,
        active,
        session,
      }: {
        product_category_id: number;
        name: string;
        active: boolean;
        session: string;
      }) => ({
        url: "/product/add-product",
        method: "POST",
        body: { product_category_id: +product_category_id, name, active },
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Product"],
    }),
    editProduct: builder.mutation({
      query: ({
        id,
        product_category_id,
        name,
        active,
        session,
      }: {
        id: number;
        product_category_id: number;
        name: string;
        active: boolean;
        session: string;
      }) => ({
        url: `/product/update-product/${id}`,
        method: "PUT",
        body: { product_category_id: +product_category_id, name, active },
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id, session }: { id: number; session: string }) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Product"],
    }),
    productVariants: builder.query({
      query: ({ session }: { session: string }) => ({
        url: "/product-variants",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      providesTags: ["ProductVariant"],
    }),
    addProductVariant: builder.mutation({
      query: ({
        product_id,
        plu,
        name,
        qty,
        price,
        image_url,
        active,
        session,
      }: {
        product_id: number;
        plu: string;
        name: string;
        qty: number;
        price: number;
        image_url: string;
        active: boolean;
        session: string;
      }) => ({
        url: "/product-variant/add-product-variant",
        method: "POST",
        body: {
          product_id: +product_id,
          plu,
          name,
          qty,
          price,
          image_url,
          active,
        },
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
    editProductVariant: builder.mutation({
      query: ({
        id,
        product_id,
        plu,
        name,
        qty,
        price,
        image_url,
        active,
        session,
      }: {
        id: number;
        product_id: number;
        plu: string;
        name: string;
        qty: number;
        price: number;
        image_url: string;
        active: boolean;
        session: string;
      }) => ({
        url: `/product-variant/update-product-variant/${id}`,
        method: "PUT",
        body: {
          product_id: +product_id,
          plu,
          name,
          qty,
          price,
          image_url,
          active,
        },
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
    deleteProductVariant: builder.mutation({
      query: ({ id, session }: { id: number; session: string }) => ({
        url: `/product-variant/delete-product-variant/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
  }),
});

export const {
  useProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useProductVariantsQuery,
  useAddProductVariantMutation,
  useEditProductVariantMutation,
  useDeleteProductVariantMutation,
} = productApi;
