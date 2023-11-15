import { apiSlice } from "../api/apiSlice";
import { userMenus } from "./menuSlice";

export const menuApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    menu: builder.query({
      query: ({ session }: { session: string }) => ({
        url: "/menus",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: session,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(
        arg: any,
        { queryFulfilled, dispatch }: { queryFulfilled: any; dispatch: any },
      ) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userMenus({
              data: result.data.data,
            }),
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useMenuQuery } = menuApi;
