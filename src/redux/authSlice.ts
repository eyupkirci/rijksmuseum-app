import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuth: boolean;
  token: string;
}

const initialState: AuthState = {
  isAuth: true, //todo: implement after auth mechanism
  token: "",
};
const authSlice = createSlice({
  name: "auth",
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
