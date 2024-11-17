import { AuthenticationState } from "../../models/AuthenticationState";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthenticationState = {
  isAuthenticated: false,
  userId: null,
  username: null,
  accessToken: null,
  refreshToken: null,
  role: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload.accessToken === null) return;

      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userId = null;
      state.username = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
