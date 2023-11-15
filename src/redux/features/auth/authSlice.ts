import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  access_token: "",
  name: "",
  username: "",
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (
      state,
      action: PayloadAction<{
        access_token: string;
        name: string;
        username: string;
        role: string;
      }>,
    ) => {
      state.access_token = action.payload.access_token;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    userLoggedOut: (state) => {
      state.access_token = "";
      state.name = "logged";
      state.username = "";
      state.role = "";
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
