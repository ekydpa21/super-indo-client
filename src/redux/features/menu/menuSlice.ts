import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { menus: any[] } = {
  menus: []
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    userMenus: (state, action: PayloadAction<{ data: any[] }>) => {
      state.menus = action.payload.data;
    }
  }
});

export const { userMenus } = menuSlice.actions;

export default menuSlice.reducer;
