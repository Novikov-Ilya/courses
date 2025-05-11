import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    userName: '',
    email: '',
    token: '',
  },
  reducers: {
    loginUser(state, action) {
      console.log(state);
      console.log(action)
    },
    createUser() { },
    logoutUser() { },
  }
});

export const { loginUser, createUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;