import React, { useContext, useRef } from 'react';
import '../styles/layout/Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import HeaderSideMenu from '../components/HeaderSideMenu';
import Category from '../components/Category';
import Search from '../components/Search';
import Login from '../components/Login';
import { UserContext } from '../hooks/useAuth';
import { userLogout } from '../api/user';
import { writePost } from '../api/post';

// header 컴포넌트
export default function Header() {
  // 로그인 상태 리덕스
  const { isLogin, isAdmin, isSeller, isBlackList, headerMenu } = useSelector(
    (state) => state.login,
  );

  const navigate = useNavigate();

  // 로그아웃 불러오기
  const { logout } = useContext(UserContext);

  // 모바일 요소 useRef
  const headerRef = useRef([]);
  const backBtnRef = useRef();

  // 햄버거 버튼 클릭(메뉴 열림)
  const openMenu = (e) => {
    const hambtn = e.currentTarget;
    hambtn.style.display = 'none';
    hambtn.nextElementSibling.style.display = 'inline-block';
    const moveElement = headerRef.current;
    moveElement.forEach((ele) => ele.classList.add('on'));
  };

  // 뒤로가기 버튼 클릭(메뉴 닫힘)
  const closeMenu = (e) => {
    const backbtn = e.currentTarget;
    backbtn.style.display = 'none';
    backbtn.previousElementSibling.style.display = 'inline-block';
    const moveElement = headerRef.current;
    moveElement.forEach((ele) => ele.classList.remove('on'));
  };

  const headerBtnFn = async (e) => {
    e.preventDefault();
    const moveElement = headerRef.current;
    moveElement.forEach((ele) => ele.classList.remove('on'));
    const backbtn = backBtnRef.current;
    backbtn.style.display = 'none';
    backbtn.previousElementSibling.style.display = 'inline-block';
    const path = e.currentTarget.getAttribute('href');
    const loginContainer = document.querySelector('.login-container');
    if (path.includes('login')) {
      // 로그인
      if (loginContainer) {
        loginContainer.style.display = 'block';
      }
    } else if (path.includes('register')) {
      // 회원가입 페이지 이동
      navigate('/user/register');
    } else if (path.includes('logout')) {
      if (!confirm('로그아웃 하시겠습니까?')) return;

      // 로그아웃
      const res = await userLogout();
      if (res.status === 200) {
        // 세션에 저장되어 있는 정보 지우기
        logout();
        // 메인페이지로 이동
        navigate('/');
      }
    } else if (path.includes('cart')) {
      // 장바구니
      if (!isLogin) {
        alert('로그인 후에 이용 가능합니다.');
        return (loginContainer.style.display = 'block');
      } else if (isAdmin) {
        alert('관리자 계정은 장바구니를 이용할 수 없습니다.');
        return;
      }
      navigate('/cart');
    } else if (path.includes('mypage')) {
      // 마이페이지 이동
      navigate('/mypage');
    } else if (path.includes('admin')) {
      // 관리자페이지 이동
      navigate('/admin');
    }
  };

  const createPost = async (e) => {
    const moveElement = headerRef.current;
    moveElement.forEach((ele) => ele.classList.remove('on'));
    const backbtn = backBtnRef.current;
    backbtn.style.display = 'none';
    backbtn.previousElementSibling.style.display = 'inline-block';
    try {
      const res = await writePost();

      // 판매자 정보 없으면
      if (res.data.isSeller === false && res.data.isBlacklist === false) {
        const confirmSellerRegi = window.confirm(res.data.message);
        if (confirmSellerRegi) {
          navigate('/sellers');
        } else {
          return;
        }
      }
      // 블랙리스트 여부 확인
      if (
        (res.data.isSeller === false && res.data.isBlacklist === true) ||
        (res.data.isSeller === true && res.data.isBlacklist === true)
      ) {
        alert(res.data.message);
      }

      if (res.data.isSeller === true && res.data.isBlacklist === false) {
        navigate('/posts/create');
      }
    } catch (error) {
      console.error('오류 발생:', error);
      alert('문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const closeMobileSideMenu = () => {
    // 모바일 메뉴 버튼
    const backbtn = document.querySelector('.back-btn');
    backbtn.style.display = 'none';
    backbtn.previousElementSibling.style.display = 'inline-block';

    // 모바일 메뉴 검색창
    const headerTopBx = document.querySelector('.header-top');
    headerTopBx.classList.remove('on');

    // 모바일 카테고리 메뉴
    const gnbMenu = document.querySelector('.gnb');
    gnbMenu.classList.remove('on');
  };

  return (
    <header>
      <div className="inner">
        {/* 메인로고 */}
        <h1 className="header-logo">
          <Link to="/" onClick={closeMobileSideMenu}>
            리블링스
          </Link>
        </h1>
        <div className="header-top" ref={(el) => (headerRef.current[0] = el)}>
          {/* 검색창 */}
          <div className="header-search">
            <Search />
          </div>
          <div className="side-menu">
            {/* 판매하기 버튼 */}
            <div className="sales-btn">
              {/* 판매자일때만 판매하기 버튼 출력 */}
              {/* 블랙리스트일때는 판매하기 버튼 눌러도 판매하기로 이동 X */}
              {isLogin && !isAdmin && (
                <Link onClick={createPost}>판매하기</Link>
              )}
            </div>
            {/* 회원정보 버튼들 */}
            <aside className="side-menubtn">
              {/* 로그인 : 장바구니/마이페이지/로그아웃, 로그아웃 : 장바구니(로그인으로이동)/회원가입/로그인, 관리자 : 장바구니/관리자페이지/로그아웃 */}
              {isLogin ? (
                isAdmin ? (
                  // 관리자
                  <HeaderSideMenu
                    logstate={headerMenu}
                    headerBtnFn={headerBtnFn}
                  />
                ) : (
                  // 로그인
                  <HeaderSideMenu
                    logstate={headerMenu}
                    headerBtnFn={headerBtnFn}
                  />
                )
              ) : (
                // 로그아웃
                <HeaderSideMenu
                  logstate={headerMenu}
                  headerBtnFn={headerBtnFn}
                />
              )}
            </aside>
          </div>
        </div>
        {/* 카테고리 버튼들 */}
        <nav className="gnb" ref={(el) => (headerRef.current[1] = el)}>
          <Category />
        </nav>
        {/* 햄버거 버튼 - 모바일뷰 */}
        <div className="ham-btnbx">
          <button className="ham-btn" onClick={openMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <button className="back-btn" onClick={closeMenu} ref={backBtnRef}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
      </div>
      {/* 로그인 창 띄우기 */}
      {isLogin ? null : <Login />}
    </header>
  );
}
