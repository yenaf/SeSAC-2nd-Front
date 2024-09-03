import React from 'react';
import MyPageMenu from '../components/MyPageMenu';
import MyPageContent from '../components/MyPageContent';
import '../styles/pages/MyPage.scss';

export default function SellersPage() {
  return (
    <div className="mypage-container">
      <MyPageMenu />
      <div className="mypage-info-container">
        <MyPageContent />
      </div>
    </div>
  );
}
