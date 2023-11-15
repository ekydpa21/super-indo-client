import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { categories: any[] } = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
