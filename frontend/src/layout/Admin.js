import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/pages/AdminPage.scss';

// 관리자 페이지
export default function AdminPage() {
  return (
    <div className="admin-wrapper">
      <aside className="admin-navigation">
        <ul>
          <li className="admin-naviMenu">
            회원 관리
            <ul>
              <li className="admin-subMenu">
                <NavLink to="/admin/allUser">전체 회원 관리</NavLink>
              </li>
              <li className="admin-subMenu">
                <NavLink to="/admin/seller">판매자 관리</NavLink>
              </li>
            </ul>
          </li>
          <li className="admin-naviMenu">
            <NavLink to="/admin/blacklist">블랙리스트 관리</NavLink>
          </li>
          <li className="admin-naviMenu">
            <NavLink to="/admin/orderlogs">전체 거래 내역 조회</NavLink>
          </li>
        </ul>
      </aside>
      <section className="admin-container">
        <Outlet />
      </section>
      <div className="admin-display">
        관리자 페이지는 웹 환경에서 사용 가능합니다.
      </div>
    </div>
  );
}
