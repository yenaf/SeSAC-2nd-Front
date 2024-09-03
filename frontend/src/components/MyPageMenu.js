import React from 'react';
import { Link } from 'react-router-dom';

export default function MyPageMenu() {
  return (
    <nav className="mypage-list-container">
      <ul>
        <li>전체보기</li>
        <li>구매내역</li>
        <li>판매내역</li>
        <li>판매글목록</li>
        <li>찜목록</li>
        <li>리블링머니</li>
        <li>
          회원정보수정
          <ul className="mypage-edit">
            <li>- 개인정보수정</li>
            <li>- 배송지관리</li>
            <Link to="/sellers">
              <li>- 판매자정보등록</li>
            </Link>
            <li>- 판매자정보수정</li>
            <li>- 회원탈퇴</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
