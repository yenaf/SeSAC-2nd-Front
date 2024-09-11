import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// 판매자가 등록한 이미지
const imageUrls = [];

export default function SwiperMagnify({ productImg, sellStatus }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (productImg && productImg.length > 0) {
      const urls = productImg.map(
        (img) =>
          'https://lieblings-bucket.s3.ap-northeast-2.amazonaws.com/' +
          img.imgName,
      );
      setImageUrls(urls);
    }
  }, [productImg]);
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`nature-${index + 1}`}
              className="swiper-img item-img"
            />
            {sellStatus === '판매 중' ? null : (
              <div className="img-filter">
                <div className="img-label">{sellStatus}</div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt={`nature-${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
