import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isLoading: boolean;
  query: string;
  searchTerm: string;
}

const initialState: AppState = {
  isLoading: false,
  query: "",
  searchTerm: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setLoading, setQuery, setSearchTerm } = appSlice.actions;
export default appSlice.reducer;
