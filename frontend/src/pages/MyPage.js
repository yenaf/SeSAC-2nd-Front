import React from 'react';
import '../styles/pages/MyPage.scss';
import image from './cat.png';

// 마이페이지
export default function MyPage() {
  return (
    <div className="mypage-container">
      <div className="mypage-list-container">
        <ul>
          <li>전체보기</li>
          <li>구매내역</li>
          <li>판매내역</li>
          <li>판매글목록</li>
          <li>찜목록</li>
          <li>리블링머니</li>
          <li>
            회원정보수정
            <ul className="edit">
              <li>- 개인정보수정</li>
              <li>- 배송지관리</li>
              <li>- 판매자정보등록</li>
              <li>- 판매자정보수정</li>
              <li>- 회원탈퇴</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="mypage-info-container">
        <h2>내정보</h2>
        <div className="mypage-info">
          <img src={image} alt="사진임" />
          <div className="mypage-profile">
            <span>쿠로미님</span>
            {/* 설정 Icon */}
            <div className="mypage-money">
              <span>리블링머니 : 10,000원</span>
              <button type="button">충전</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
