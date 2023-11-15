import { apiSlice } from "../api/apiSlice";
import { storeCategories } from "./categorySlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    categories: builder.query({
      query: ({ session }: { session: string }) => ({
        url: "/categories",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: ({
        name,
        active,
        session,
      }: {
        name: string;
        active: boolean;
        session: string;
      }) => ({
        url: "/category/add-category",
        method: "POST",
        body: { name, active },
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: ({
        id,
        name,
        active,
        session,
      }: {
        id: number;
        name: string;
        active: boolean;
        session: string;
      }) => ({
        url: `/category/update-category/${id}`,
        method: "PUT",
        body: { name, active },
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: ({ id, session }: { id: number; session: string }) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
