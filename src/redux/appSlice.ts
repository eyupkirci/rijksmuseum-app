import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = appSlice.actions;
export default appSlice.reducer;
