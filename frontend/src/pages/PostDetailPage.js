import React from 'react';
import '../styles/pages/PostDetailPage.scss';
import SwiperMagnify from '../components/SwiperMagnify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import priceToString from '../utils/priceMethods';
import { Link, useNavigate } from 'react-router-dom';

export default function PostDetailPage() {
  const navigate = useNavigate();

  const handleBackPage = () => {
    // 만약에 이전페이지가 게시글작성이라면 메인페이지로가야한다
    navigate(-1);
  };
  return (
    <>
      <section className="post-desc">
        {/* 상품이미지 */}
        <div className="post-top">
          <div className="product-img">
            <SwiperMagnify />
          </div>
          {/* 우측 나열될 정보 */}
          <div className="product-info">
            <strong>애니메이션</strong>
            <h2 title="">
              쿠로미 인형 상태좋아요 진짜
              올롤로로로ddddddddddddddddddddddddddddddddddd
            </h2>
            <h3>{priceToString('10000')} 원</h3>
            {/* <time>작성시간</time> */}
            <div className="info-box">
              <div>
                <span>배송사</span>
                <span>우체국</span>
              </div>
              <div>
                <span>배송비</span>
                <span>{priceToString('3000')}</span>
              </div>
              <div>
                <span>상품유형</span>
                <span>공식</span>
              </div>
              <div>
                <span>상품상태</span>
                <span>새상품</span>
              </div>
            </div>

            <div className="btn-group">
              <button className="dibs-container">
                <FontAwesomeIcon icon={faHeart} className="dibs" />
              </button>
              <span className="link-container">
                <button className="btn shopping">
                  <Link to={'/cart/:userId'}>장바구니</Link>
                </button>
                <button className="btn buy">
                  <Link to={'/order'}>구매하기</Link>
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* 하단 상품설명 */}
        <div className="post-botton">
          {/* 판매자 배너 */}
          <div className="seller-info">
            <div className="seller-profile">
              <img src="/img/cat.png" className="seller-img" />
            </div>
            <h3>판매자명</h3>
          </div>
          <div className="product-content">
            <p>설명글postContent 어쩌고저쩌고</p>
          </div>
        </div>
        <div className="btn-bottom-group">
          <div className="histoty-btn">
            <button className="btn back" onClick={handleBackPage}>
              <FontAwesomeIcon icon={faAngleLeft} className="back-icon" />
              돌아가기
            </button>
            <button className="btn list">
              <Link to={'/posts/list/:page/:limit/:categoryId'}>목록</Link>
            </button>
          </div>
          <div className="ud-btn">
            <button className="btn correction">수정</button>
            <button className="btn delete">삭제</button>
          </div>
        </div>
      </section>
      {/* 댓글 */}
      {/* <section className="comment">comment</section> */}
    </>
  );
}
