import React from 'react';
import { NavLink } from 'react-router-dom';
import { categoryData } from '../data/categoryData';

// 카테고리 버튼 컴포넌트
export default function Category() {
  // 클릭한 버튼에 대한 표시 -> class="active" 클릭하면 exact 라는 속성 추가
  // 혹은 className={({isActive})=>isActive?'active':''}

  return (
    <ul className="">
      {categoryData.map((value) => (
        <li key={value.id}>
          <NavLink to={value.path}>{value.category}</NavLink>
        </li>
      ))}
    </ul>
  );
}
