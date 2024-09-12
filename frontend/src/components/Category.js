import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { categoryData } from '../data/categoryData';
import handleScrollToTop from '../utils/handleScrollToTop';

// 카테고리 버튼 컴포넌트
export default function Category() {
  const params = useParams();
  const categoryId = Number(params.categoryId);

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
    <ul className="category-container">
      <li>
        <NavLink
          to="/about"
          onClick={() => {
            handleScrollToTop();
            closeMobileSideMenu();
          }}
        >
          서비스소개
        </NavLink>
      </li>
      {categoryData.map((value) => (
        <li key={value.id}>
          <NavLink
            to={value.path}
            className={() => {
              return categoryId === value.id ? 'active' : '';
            }}
            onClick={() => {
              handleScrollToTop();
              closeMobileSideMenu();
            }}
            end
          >
            {value.category}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
