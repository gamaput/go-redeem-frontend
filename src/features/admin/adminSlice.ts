// adminSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  id: string;
  name: string;
  // tambahkan properti lain yang diperlukan untuk admin
}

const initialState: AdminState = {
  id: '',
  name: '',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminState>) => {
      return { ...state, ...action.payload };
    },
    clearAdmin: () => initialState,
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;
