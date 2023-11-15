import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: ({
        username,
        password,
      }: {
        username: string;
        password: string;
      }) => ({
        url: "/login",
        method: "POST",
        body: { username, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(
        arg: any,
        { queryFulfilled, dispatch }: { queryFulfilled: any; dispatch: any },
      ) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              access_token: result.data.access_token,
              name: result.data.name,
              username: result.data.username,
              role: result.data.role,
            }),
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
