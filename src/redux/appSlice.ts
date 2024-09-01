import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isLoading: boolean;
  searchTerm: string;
}

const initialState: AppState = {
  isLoading: false,
  searchTerm: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setLoading, setSearchTerm } = appSlice.actions;
export default appSlice.reducer;
