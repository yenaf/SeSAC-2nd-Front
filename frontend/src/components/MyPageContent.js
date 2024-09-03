import React from 'react';
import '../styles/pages/MyPage.scss';
import '../styles/pages/SellerPage.scss';

export default function MyPageContent() {
  return (
    <div className="mypage-content-container">
      <div className="seller-container">
        <div className="seller-title">
          <h2>판매자 정보 등록</h2>
        </div>
        <form action="" id="seller">
          <div className="seller-input">
            <label htmlFor="">판매자명</label>
            <input type="text" />
            <div className="seller-img">
              <label htmlFor="">프로필 사진</label>
              <img src="/img/cat.png" alt="" />
            </div>
            <input type="file" className="file-box" />
            <label htmlFor="">판매자 설명</label>
            <input type="text" />
            <div className="drive">
              <label htmlFor="">배송사 선택</label>
              <div className="drive-choose">
                <input type="radio" name="" />
                <label htmlFor="">우체국</label>
                <input type="radio" name="" />
                <label htmlFor="">대한통운</label>
              </div>
            </div>
            <div className="seller-btn">
              <button>등록</button>
              <button>취소</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
