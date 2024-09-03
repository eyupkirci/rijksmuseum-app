import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, IQuery } from "../types";

const initialState: AppState = {
  isLoading: false,
  query: { q: "", p: 1, ps: 20, color: "", maker: "", material: "", s: "relevance" },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setQuery(state, action: PayloadAction<IQuery>) {
      state.query = action.payload;
    },
  },
});

export const { setLoading, setQuery } = appSlice.actions;
export default appSlice.reducer;
