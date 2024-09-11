import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyPageMenu() {
  const [sellerId, setSellerId] = useState();
  useEffect(() => {
    const userString = window.sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setSellerId(user.sellerId);
    } else {
      console.log('세션스토리지에 접근하는 중 오류가 발생했습니다.');
    }
  }, [sellerId]);

  return (
    <nav className="mypage-list-container display-big">
      <ul>
        <li>
          <Link to="/mypage">전체보기</Link>
        </li>
        <li>
          <Link to="/mypage/orderhistory">구매내역</Link>
        </li>
        {/* 판매자의 주문번호 별로 */}
        <li>
          <Link to="/mypage/salehistory">판매내역</Link>
        </li>
        {/* 판매자의 postId 별로 */}
        <li>
          <Link to="/mypage/postlist">판매글목록</Link>
        </li>
        <li>
          <Link to="/mypage/wishlist">찜목록</Link>
        </li>
        <li>
          회원정보
          <ul className="mypage-edit">
            <li>
              <Link to="/mypage/editUser">- 개인정보수정</Link>
            </li>
            {sellerId ? (
              ''
            ) : (
              <li>
                <Link to="/sellers">- 판매자정보등록</Link>
              </li>
            )}
            {!sellerId ? (
              ''
            ) : (
              <li>
                <Link to="/sellers/editSeller">- 판매자정보수정</Link>
              </li>
            )}
            <li>
              <Link to="/mypage/address">- 배송지관리</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
