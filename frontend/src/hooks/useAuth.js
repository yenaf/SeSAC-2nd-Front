import React, { createContext, useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFn } from '../store/loginSlice';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const { isLogin, isAdmin, isSeller, isBlackList, headerMenu } = useSelector(
    (state) => state.login,
  );

  const dkdk = useContext(UserContext);
  console.log(dkdk);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      // dispatch(loginFn());
      if (!userInfo.admin) {
        // 일반 유저인 경우
        const { userId, sellerId, isBlacklist } = userInfo;
        if (sellerId !== '') {
          // 판매자가 아닌 경우
          dispatch(
            loginFn({
              isLogin: true,
              isAdmin: false,
              isSeller: false,
              isBlackList: isBlacklist,
              headerMenu: 'user',
            }),
          );
        } else {
          // 판매자인 경우
          dispatch(
            loginFn({
              isLogin: true,
              isAdmin: false,
              isSeller: true,
              isBlackList: isBlacklist,
              headerMenu: 'user',
            }),
          );
        }
      } else {
        // 관리자인 경우
        const { admin } = userInfo;
        dispatch(
          loginFn({
            isLogin: true,
            isAdmin: admin,
            isSeller: false,
            isBlackList: false,
            headerMenu: 'admin',
          }),
        );
      }
      setUser(userInfo);
      setIsLoggedIn(isLogin);
    } else {
      dispatch(
        loginFn({
          isLogin: false,
          isAdmin: false,
          isSeller: false,
          isBlackList: false,
          headerMenu: 'logout',
        }),
      );
    }
  }, [dispatch]);

  const login = (userData) => {
    setUser(userData);

    dispatch(
      loginFn({
        isLogin: true,
        isAdmin: userData.admin || false,
        isSeller: !userData.sellerId,
        isBlackList: userData.isBlacklist,
        headerMenu: userData.admin ? 'admin' : 'user',
      }),
    );
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    dispatch(
      loginFn({
        isLogin: false,
        isAdmin: false,
        isSeller: false,
        isBlackList: false,
        headerMenu: 'logout',
      }),
    );
    sessionStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
