import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    isAdmin: false,
    isSeller: false,
    isBlackList: false,
  },
  reducers: {
    loginFn: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});
export const { loginFn } = loginSlice.actions;

export default loginSlice.reducer;
