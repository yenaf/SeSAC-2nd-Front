import React from 'react';
import userData from '../data/fakedata/userData';
import MyPageMenu from '../components/MyPageMenu'; // 컴포넌트
import '../styles/pages/MyPage.scss';

// 마이페이지
export default function MyPage() {
  return (
    <div className="mypage-container">
      <MyPageMenu />
      <div className="mypage-info-container">
        <div className="mypage-info-content">
          <h2>내정보</h2>
          <div className="mypage-info">
            <figure className="mypage-img">
              <img src="/img/cat.png" alt="사진임" />
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
              <img src="/img/cat.png" alt="사진임" />
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
