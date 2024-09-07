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
          <h2>방금 등록된 상품</h2>
          <ul>
            <li></li>
          </ul>
        </div>
        <div>
          <h2>인기순</h2>
        </div>
      </section>
    </>
  );
}
