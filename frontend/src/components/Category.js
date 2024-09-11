import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { categoryData } from '../data/categoryData';
import handleScrollToTop from '../utils/handleScrollToTop';

// 카테고리 버튼 컴포넌트
export default function Category() {
  const params = useParams();
  const categoryId = Number(params.categoryId);

  return (
    <ul className="category-container">
      <li>
        <NavLink to="/about" onClick={handleScrollToTop}>
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
            onClick={handleScrollToTop}
            end
          >
            {value.category}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
