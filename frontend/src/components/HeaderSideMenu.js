import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketShopping,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faBasketShopping, faUser, faRightFromBracket, faRightToBracket);

// header 회원정보 버튼들 컴포넌트
export default function HeaderSideMenu({ logstate, loginFn }) {
  // const openLogin = (e) => {
  //   e.preventDefault();
  //   const loginContainer = document.querySelector('.login-container');
  //   if (loginContainer) {
  //     loginContainer.style.display = 'block';
  //   }
  // };

  console.log(logstate);

  return (
    <ul>
      {logstate.map((value, idx) => (
        <li key={idx} title={value.title}>
          {/* {value.path === '/user/login' && (
            <Link to={value.path} onClick={openLogin}>
              <FontAwesomeIcon icon={`fa-solid ${value.icon}`} />
            </Link>
          )} */}
          <Link to={value.path}>
            <FontAwesomeIcon
              icon={`fa-solid ${value.icon}`}
              onClick={loginFn}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

// 로그인 아이콘 클릭시 로그인 띄우기
