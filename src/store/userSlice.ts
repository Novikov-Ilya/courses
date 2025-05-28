import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserLoginPayload } from "./types";

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    userName: '',
    email: '',
    token: '',
    role: '',
    isAuth: false,
  },
  reducers: {
    loginUser(state, action: PayloadAction<IUserLoginPayload>) {
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuth = true;
    },
    logoutUser(state) {
      state.userName = '';
      state.email = '';
      state.token = '';
      state.isAuth = false;
     },
  }
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;