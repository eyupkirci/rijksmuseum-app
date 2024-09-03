import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
  user: { email?: string; uid?: string; displayName?: string };
}

const initialState: AuthState = {
  token: "",
  user: {},
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
