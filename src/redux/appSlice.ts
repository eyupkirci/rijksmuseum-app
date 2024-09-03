import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, ArtObject, IQuery } from "../types";

export const initialQuery: IQuery = {
  q: "",
  p: 1,
  ps: 10,
  color: "",
  maker: "",
  material: "",
  s: "relevance",
};
export const initialState: AppState = {
  isLoading: false,
  query: { ...initialQuery },
  data: [],
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
    setData(state, action: PayloadAction<ArtObject[]>) {
      state.data = action.payload;
    },
  },
});

export const { setLoading, setQuery, setData } = appSlice.actions;
export default appSlice.reducer;
