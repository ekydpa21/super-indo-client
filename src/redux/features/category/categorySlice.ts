import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { categories: any[] } = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    storeCategories: (state, action: PayloadAction<{ data: any[] }>) => {
      state.categories = action.payload.data;
    },
  },
});

export const { storeCategories } = categorySlice.actions;

export default categorySlice.reducer;
