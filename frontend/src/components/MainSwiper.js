import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function MainSwiper() {
  return (
    <>
      <div className="main-page-swiper">
        <Swiper
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
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/img/banner1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/banner2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/banner3.png" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
