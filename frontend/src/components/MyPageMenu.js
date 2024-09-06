import React from 'react';
import { Link } from 'react-router-dom';

export default function MyPageMenu() {
  return (
    <nav className="mypage-list-container display-big">
      <ul>
        <li>
          <Link to="/mypage">전체보기</Link>
        </li>
        <li>구매내역</li>
        {/* 판매자의 주문번호 별로 */}
        <li>
          <Link to="/mypage/salehistory">판매내역</Link>
        </li>
        {/* 판매자의 postId 별로 */}
        <li>판매글목록</li>
        <li>찜목록</li>
        <li>리블링머니</li>
        <li>
          회원정보수정
          <ul className="mypage-edit">
            <li>- 개인정보수정</li>
            <li>- 배송지관리</li>
            <li>
              <Link to="/sellers">판매자정보등록</Link>
            </li>
            <li>- 판매자정보수정</li>
            <li>- 회원탈퇴</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
