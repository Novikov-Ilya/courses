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
      state.userName = action.payload.user.name;
      state.email = action.payload.user.email;
      state.token = action.payload.result;
      state.isAuth = true;
    },
    logoutUser(state) {
      state.userName = '';
      state.email = '';
      state.token = '';
      state.isAuth = false;
     },
     setUserRole(state, action) {
      state.role = action.payload
     }
  }
});

export const { loginUser, logoutUser, setUserRole } = userSlice.actions;

export default userSlice.reducer;