import React, { useEffect, useState } from 'react';
import '../styles/pages/PostDetailPage.scss';
import SwiperMagnify from '../components/SwiperMagnify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faAngleLeft,
  faVolumeOff,
} from '@fortawesome/free-solid-svg-icons';
import priceToString from '../utils/priceMethods';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import axios from 'axios';
import { formatDate } from '../components/common/formatDate';
import { getPost } from '../api/post';
import { useSelector } from 'react-redux';
import CartBtn from '../components/CartBtn';

// 상세게시글에 들어오려면 판매글작성후 또는 게시글을 눌렀을때

export default function PostDetailPage() {
  const previousUrl = useSelector((state) => state.navigation.previousUrl);
  const navigate = useNavigate();
  const [isDibbed, setIsDibbed] = useState(false);
  const [postData, setPostData] = useState(null);
  const params = useParams();
  const id = Number(params.postId);

  console.log(params.postId);

  useEffect(() => {
    // url에서 postId 가져옴
    // const currentUrl = window.location.href;
    // const id = currentUrl.split('/').pop();
    const res = getPost(params.postId);

    res
      .then((res) => {
        setPostData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, []);

  // 뒤로가기
  const handleBackPage = () => {
    if (previousUrl === '/posts/create') {
      const goBackConfirm = confirm('메인페이지로 가시겠습니까?');
      if (goBackConfirm) {
        navigate('/'); // 메인 페이지로 이동
      }
    } else {
      navigate(-1); // 이전 페이지로 이동
    }
  };

  // 찜
  const handleChangeDibs = () => {
    setIsDibbed(!isDibbed); // 찜 상태 토글
  };

  const {
    postTitle,
    Product_Images: productImg,
    categoryId,
    postContent,
    productPrice,
    productStatus,
    productType,
    createdAt: time,
    Seller: seller,
  } = postData || {};

  const createdAt = formatDate(time);

  const getCategoryLabel = (id) => {
    switch (Number(id)) {
      case 1:
        return 'K-POP';
      case 2:
        return '영화/드라마';
      case 3:
        return '애니메이션';
      case 4:
        return '게임';
      case 5:
        return '스포츠';
      case 6:
        return '기타';
      default:
        return '알 수 없는 카테고리';
    }
  };

  return (
    <>
      {!postData ? (
        <div>로딩 중...</div>
      ) : (
        <div>
          <section className="post-desc">
            {/* 상품이미지 */}
            <div className="post-top">
              <div className="product-img">
                <SwiperMagnify productImg={productImg} />
              </div>
              {/* 우측 나열될 정보 */}
              <div className="product-info">
                <time>{createdAt}</time>
                <strong>{getCategoryLabel(`${categoryId}`)}</strong>
                <h2 title="">{postTitle}</h2>
                <h3>{priceToString(`${productPrice}`)} 원</h3>
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
                    <span>{productType}</span>
                  </div>
                  <div>
                    <span>상품상태</span>
                    <span>{productStatus}</span>
                  </div>
                </div>
                <div className="btn-group">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="dibs"
                    onClick={handleChangeDibs}
                    style={{ color: isDibbed ? '#ba357e' : '#c9c9c9' }}
                  />
                  <CartBtn post={id} />
                </div>
              </div>
            </div>
            {/* 하단 상품설명 */}
            <div className="post-botton">
              <FontAwesomeIcon
                icon={faVolumeOff}
                className="report-icon"
                title="신고하기"
              />
              {/* 판매자 배너 */}
              <div className="seller-info">
                <div className="seller-profile">
                  <img src="/img/cat.png" className="seller-img" />
                </div>
                <h3>{seller.sellerName}</h3>
              </div>
              <div className="product-content">
                <p>{postContent}</p>
              </div>
            </div>
            <div className="btn-bottom-group">
              <div className="histoty-btn">
                <button className="btn back" onClick={handleBackPage}>
                  <FontAwesomeIcon icon={faAngleLeft} className="back-icon" />
                  돌아가기
                </button>
                <button className="btn list">
                  <Link
                    to={'/posts/list/:page/:limit/:categoryId'}
                    className="list-link"
                  >
                    목록
                  </Link>
                </button>
              </div>
              <div className="ud-btn">
                <button className="btn correction">수정</button>
                <button className="btn delete">삭제</button>
              </div>
            </div>
          </section>
          {/* 댓글 */}
          <Comment />
        </div>
      )}
    </>
  );
}
