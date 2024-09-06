import React from 'react';
import '../styles/pages/MainPage.scss';
import MainSwiper from '../components/MainSwiper';

// 메인 페이지
export default function MainPage() {
  return (
    <>
      <section className="main-page">
        <MainSwiper />
        <div>
          <h3>방금 등록된 상품</h3>
        </div>
        <div>
          <h3>인기순</h3>
        </div>
      </section>
    </>
  );
}
