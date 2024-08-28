import React, { useState } from 'react';
import '../styles/layout/Header.scss';
import { Link } from 'react-router-dom';
import HeaderSideMenu from '../components/HeaderSideMenu';
import { loginMenu } from '../data/loginData';

export default function Header() {
  // 임시 로그인 상태값 저장
  const [isLogin, setIsLogin] = useState(true)
  // 임시 판매자 상태값 저장
  const [isSeller, setIsSeller] =  useState(true);

  return (
    <header>
      <div className='inner'>
        <div className=''>
          <h1 className='header-logo'>리블링스</h1>
          <div className='header-searchbox'>
            <input type='text' id='search' name='search' />
            <button className='search-btn'></button>
          </div>
          <div className='sales-btn'>
            { isLogin && isSeller &&
              <Link to='' >판매하기</Link>
            }
          </div>
          <aside className='top-menu'>
            { isLogin ?  <HeaderSideMenu logstate={loginMenu[0]}/> : <HeaderSideMenu logstate={loginMenu[1]}/>}
          </aside>
        </div>
        <nav>

        </nav>
      </div>
    </header>
  )
}
