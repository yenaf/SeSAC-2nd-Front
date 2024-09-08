import React from 'react';
import MyPageMenu from '../components/MyPageMenu';
import '../styles/pages/MyPage.scss';

export default function EditUserPage() {
  return (
    <div className="mypage-container">
      <MyPageMenu />
      <div className="mypage-info-container">
        <div className="mypage-content-container">
          <div className="edit-container">
            <div className="edit-title">
              <h2>내 정보 수정</h2>
            </div>
            <form action="" id="edit"></form>
          </div>
        </div>
      </div>
    </div>
  );
}
