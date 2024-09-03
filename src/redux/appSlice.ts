import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IQuery {
  q?: string;
  p?: number;
  ps?: number;
  color?: string;
  maker?: string;
}
export interface AppState {
  isLoading: boolean;
  query: IQuery;
}

const initialState: AppState = {
  isLoading: false,
  query: { q: "", p: 1, ps: 20, color: "", maker: "" },
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
