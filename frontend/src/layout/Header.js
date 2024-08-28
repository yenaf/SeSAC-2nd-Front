import React, { useState } from 'react';
import '../styles/layout/Header.scss';
import { Link } from 'react-router-dom';
import HeaderSideMenu from '../components/HeaderSideMenu';
import { loginMenu } from '../data/loginData';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Category from '../components/Category';

// header 컴포넌트
export default function Header() {
  // 임시 로그인 상태값 저장
  const [isLogin, setIsLogin] = useState(true);
  // 임시 판매자 상태값 저장
  const [isSeller, setIsSeller] =  useState(true);
  // 임시 관리자 상태값 저장
  const [isAdmin, setIsAdmin] = useState(false);
  // 임시 블랙리스트 상태값 저장
  const [isBlacklist, setIsBlacklist] = useState(false);

  return (
    <header>
      <div className='inner'>
        <div className=''>
          <h1 className='header-logo'>리블링스</h1>
          <div className='header-searchbox'>
            <input type='text' id='search' name='search' />
            <button className='search-btn'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <div className='sales-btn'>
            { isLogin && isSeller &&
              <Link to='/posts/create'>판매하기</Link>
            }
          </div>
          <aside className='top-menu'>
            { isLogin ?  <HeaderSideMenu logstate={loginMenu[0]}/> : <HeaderSideMenu logstate={loginMenu[1]}/>}
          </aside>
        </div>
        <nav>
            <Category />
        </nav>
      </div>
    </header>
  )
}
