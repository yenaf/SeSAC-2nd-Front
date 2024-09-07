import React, { useEffect, useState } from 'react';
import '../styles/pages/PostDetailPage.scss';
import SwiperMagnify from '../components/SwiperMagnify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faAngleLeft,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';
import priceToString from '../utils/priceMethods';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import { getPost } from '../api/post';
import { useSelector } from 'react-redux';
import CartBtn from '../components/CartBtn';
import elapsedTime from '../utils/elapsedTime';
import ReportModal from '../components/ReportModal';
import axios from 'axios';

export default function PostDetailPage() {
  const previousUrl = useSelector((state) => state.navigation.previousUrl);
  const navigate = useNavigate();
  const [isDibbed, setIsDibbed] = useState(false);
  const [postData, setPostData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const id = params.postId;

  // 세션에 userId, sellerId 저장되고 그값을 가져온다고 가정
  // const sessionSellerId = sessionStorage.getItem('sellerId');
  // const session = { user: { userId: 5, nickName: '로미' } };
  // 상세페이지의 수정삭제버튼은 세션의 sellerId와 post의 sellerid가 같을때 보여준다

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await getPost(id);
        setPostData(res.data);
        setIsDibbed(res.data.isInWishlist);
        // console.log('상세페이지api', res.data);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
    };
    fetchPostData();
  }, [id]);

  // 뒤로가기
  const handleBackPage = () => {
    if (previousUrl === '/posts/create') {
      const goBackConfirm = confirm('메인페이지로 가시겠습니까?');
      if (goBackConfirm) {
        navigate('/');
      }
    } else {
      navigate(-1);
    }
  };

  // 찜 삭제하려면 wishlistId 필요함
  const handleChangeDibs = async () => {
    const wishData = { userId: userId, postId: id };
    if (isDibbed) {
      // 찜 해제
      // const res = await axios.delete(
      //   `http://localhost:8080/wishlist/${wishlistId}`,
      // );
      // console.log(res);
    } else {
      // 찜 추가
      const res = await axios.post('http://localhost:8080/wishlist', wishData);
      console.log(res);
    }
    setIsDibbed(!isDibbed); // 찜 상태 토글
  };

  const handleReportClick = () => {
    setIsModalOpen(true); // 모달 열기
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleConfirmReport = () => {
    alert('신고가 완료되었습니다.');
    setIsModalOpen(false); // 신고 후 모달 닫기
  };

  if (!postData) {
    return <div>로딩 중...</div>;
  }

  const {
    getPost: {
      createdAt,
      postTitle,
      postId,
      productPrice,
      productType,
      productStatus,
      postContent,
      Category: { categoryName },
      Product_Images,
      sellStatus,
      Seller: {
        Delivery: { deliveryFee, deliveryName },
        sellerId,
        sellerImg,
        // sellerImg가 안옴
        sellerName,
      },
      Comments,
    },
    isInWishlist,
    session: { nickname, profileImg, sellerId: sessionSellerId, userId },
  } = postData;

  return (
    <>
      {isModalOpen && (
        <ReportModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmReport}
          userId={userId}
          sellerId={sellerId}
          postId={postId}
        />
      )}
      {!postData ? (
        <div>로딩 중...</div>
      ) : (
        <div>
          <section className="post-desc">
            {/* 상품이미지 */}
            <div className="post-top">
              <div className="product-img">
                <SwiperMagnify productImg={Product_Images} />
              </div>
              {/* 우측 나열될 정보 */}
              <div className="product-info">
                <time>{elapsedTime(createdAt)}</time>
                <strong>{categoryName}</strong>
                <h2 title="">{postTitle}</h2>
                <h3>{priceToString(`${productPrice}`)} 원</h3>
                <div className="info-box">
                  <div>
                    <span>배송사</span>
                    <span>{deliveryName}</span>
                  </div>
                  <div>
                    <span>배송비</span>
                    <span>{priceToString(deliveryFee)}</span>
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
                icon={faFlag}
                className="report-icon"
                title="신고하기"
                onClick={handleReportClick}
              />
              {/* 판매자 img+nickname */}
              <div className="seller-info">
                <div className="seller-profile">
                  <img src="/img/cat.png" className="seller-img" />
                </div>
                <h3>{sellerName}</h3>
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
                {/* <button className="btn list"> */}
                <Link
                  to={'/posts/list/1/0?order=latest'}
                  className="btn list-link"
                >
                  목록
                </Link>
                {/* </button> */}
              </div>
              <div className="ud-btn">
                {sessionSellerId === sellerId && (
                  <>
                    <Link
                      // posts/edit 어진님이 백쪽 만들어주기로함
                      to={`/posts/edit/${id}`}
                      className="btn correction"
                      post={id}
                    >
                      수정
                    </Link>
                    <button className="btn delete">삭제</button>
                  </>
                )}
              </div>
            </div>
          </section>
          {/* 댓글 */}
          <Comment
            postId={id}
            sessionSellerId={sessionSellerId}
            userId={userId}
            nickname={nickname}
            profileImg={profileImg}
            Comments={Comments}
          />
        </div>
      )}
    </>
  );
}
