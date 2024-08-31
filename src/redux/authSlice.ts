import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuth: boolean;
  token: string;
}

const initialState: AuthState = {
  isAuth: false,
  token: "",
};
const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { setAuth, setToken } = authSlice.actions;
export default authSlice.reducer;
