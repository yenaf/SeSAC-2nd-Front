import { createSlice } from '@reduxjs/toolkit';
const loginMenu = [
  [
    // 로그인
    {
      title: '장바구니',
      path: `/cart`,
      icon: 'fa-basket-shopping',
    },
    {
      title: '마이페이지',
      path: '/mypage',
      icon: 'fa-user',
    },
    {
      title: '로그아웃',
      path: '/user/logout',
      icon: 'fa-right-from-bracket',
    },
  ],
  [
    // 로그아웃
    {
      title: '장바구니',
      path: '/cart',
      icon: 'fa-basket-shopping',
    },
    {
      title: '회원가입',
      path: '/user/register',
      icon: 'fa-user',
    },
    {
      title: '로그인',
      path: '/user/login',
      icon: 'fa-right-to-bracket',
    },
  ],
  [
    // 관리자
    {
      title: '장바구니',
      path: '/cart',
      icon: 'fa-basket-shopping',
    },
    {
      title: '관리자 페이지',
      path: '/admin',
      icon: 'fa-user',
    },
    {
      title: '로그아웃',
      path: '/user/logout',
      icon: 'fa-right-from-bracket',
    },
  ],
];

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    isAdmin: false,
    isSeller: false,
    isBlackList: false,
    headerMenu: loginMenu[1],
  },
  reducers: {
    loginFn: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.isAdmin = action.payload.isAdmin;
      state.isSeller = action.payload.isSeller;
      state.isBlackList = action.payload.isBlackList;
      const whoAmI = action.payload.headerMenu;
      if (whoAmI === 'user') {
        state.headerMenu = loginMenu[0];
      } else if (whoAmI === 'admin') {
        state.headerMenu = loginMenu[2];
      } else if (whoAmI === 'logout') {
        state.headerMenu = loginMenu[1];
      }
    },
  },
});
export const { loginFn } = loginSlice.actions;

export default loginSlice.reducer;
