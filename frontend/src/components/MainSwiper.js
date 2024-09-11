import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// 메인페이지 스와이퍼 컴포넌트
export default function MainSwiper() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <div className="main-page-swiper">
        <Swiper
          aria-label="배너 슬라이더"
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/img/banner1.png" alt="분홍색 모자쓴 오리" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/banner2.png" alt="뉴진스 하니와 파워퍼프걸" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/banner3.png" alt="물 위에 떠있는 딸기" />
          </SwiperSlide>
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </>
  );
}
