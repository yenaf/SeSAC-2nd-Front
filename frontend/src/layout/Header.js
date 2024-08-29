import React, { useState } from 'react';
import '../styles/layout/Header.scss';
import { Link } from 'react-router-dom';
import HeaderSideMenu from '../components/HeaderSideMenu';
import { loginMenu } from '../data/loginData';
import Category from '../components/Category';
import Search from '../components/Search';

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
        <div className='header-top'>
          {/* 메인로고 */}
          <h1 className='header-logo'>
            <Link to='/'>리블링스</Link>
          </h1>
          {/* 검색창 */}
          <Search />
          <div className='side-menu'> 
            {/* 판매하기 버튼 */}
            <div className='sales-btn'>
              {/* 판매자일때만 판매하기 버튼 출력 */}
              {/* 블랙리스트일때는 판매하기 버튼 눌러도 판매하기로 이동 X */}
              { isLogin && isSeller && !isAdmin &&
                <Link to='/posts/create'>판매하기</Link>
              }
            </div>
            {/* 회원정보 버튼들 */}
            <aside className='side-menubtn'>
              {/* 로그인 : 장바구니/마이페이지/로그아웃, 로그아웃 : 장바구니(로그인으로이동)/회원가입/로그인, 관리자 : 장바구니/관리자페이지/로그아웃 */}
              { isLogin ?  (isAdmin? <HeaderSideMenu logstate={loginMenu[2]}/> :<HeaderSideMenu logstate={loginMenu[0]}/>) 
              : <HeaderSideMenu logstate={loginMenu[1]}/>}
            </aside>
          </div>
        </div>
        {/* 카테고리 버튼들 */}
        <nav className='gnb'>
            <Category />
        </nav>
      </div>
    </header>
  )
}
