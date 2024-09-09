import React from 'react';
import { Link, Outlet } from 'react-router-dom';
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
                <Link to="/admin/allUser">전체 회원 관리</Link>
              </li>
              <li className="admin-subMenu">
                <Link to="/admin/seller">판매자 관리</Link>
              </li>
            </ul>
          </li>
          <li className="admin-naviMenu">
            <Link to="/admin/blacklist">블랙리스트 관리</Link>
          </li>
          <li className="admin-naviMenu">
            <Link to="/admin/orderlogs">전체 거래 내역 조회</Link>
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
