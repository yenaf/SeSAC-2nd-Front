import React from 'react';
import '../styles/pages/MyPage.scss';
import image from './cat.png';
import userData from '../data/fakedata/userData';
import { Link } from 'react-router-dom';

// 마이페이지
export default function MyPage() {
  return (
    <div className="mypage-container">
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
      <div className="mypage-info-container">
        <div className="mypage-info-content">
          <h2>내정보</h2>
          <div className="mypage-info">
            <figure className="mypage-img">
              <img src={image} alt="사진임" />
            </figure>
            <div className="mypage-profile">
              <div className="mypage-name">{userData[0].userName} 님</div>
              {/* 설정 Icon */}
              <div className="mypage-money">
                <div className="money-balance">
                  리블링머니 : 1,000,000,000원
                </div>
                <button type="button" className="money-btn">
                  충전
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mypage-buy-content">
          <h2>구매내역</h2>
          <span className="more">더보기</span>
          <div className="buy-info">
            <figure className="buy-img">
              <img src={image} alt="사진임" />
            </figure>
            <div className="buy-text">
              <p>상품명 : </p>
              <p>상품가격 : </p>
            </div>
          </div>
        </div>
        <div className="mypage-seller-content">
          <h2>판매글 목록</h2>
          <div className="seller-info">
            <div className="seller-list">
              <ul>
                <li>판매글임</li>
                <li>판매글임</li>
                <li>판매글임</li>
                <li>판매글임</li>
                <li>판매글임</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
