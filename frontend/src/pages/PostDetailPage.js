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
import { deletePost, getPost } from '../api/post';
import { useSelector } from 'react-redux';
import CartBtn from '../components/CartBtn';
import elapsedTime from '../utils/elapsedTime';
import ReportModal from '../components/ReportModal';
import { deleteWish, insertWish } from '../api/wishlist';
import NotFound from './NotFountdPage';

export default function PostDetailPage() {
  const previousUrl = useSelector((state) => state.navigation.previousUrl);
  const { isLogin, isAdmin, isBlacklist } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [isDibbed, setIsDibbed] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const [postData, setPostData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const id = params.postId;

  // 상세페이지의 수정삭제버튼은 세션의 sellerId와 post의 sellerid가 같을때 보여준다
  // 찜, 장바구니,신고 구매하기 등 유저 아이디가 있어야 클릭가능
  // 유저아이디없으면 입력클릭 기타등등 로그인후 가능

  // 상세페이지 data호출
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await getPost(id);
        setPostData(res.data);
        setIsDibbed(res.data.isInWishlist);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        if (error.status === 404) {
          return <NotFound />;
        }
      }
    };
    fetchPostData();
  }, [id, wishlistId]);

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

  // 찜 추가, 해제
  const handleChangeDibs = async () => {
    if (isAdmin) {
      alert('관리자 계정은 찜 기능을 이용할 수 없습니다.');
      return;
    }
    if (!userId) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    const wishData = { userId: userId, postId: id };
    if (isDibbed === null) {
      // 찜등록
      const res = await insertWish(wishData);
      const newWishlistId = res.data.wishlistId;
      setWishlistId(newWishlistId);
    } else {
      // 찜 삭제
      const res = await deleteWish(isInWishlist.wishlistId);
    }
    setIsDibbed(!isDibbed); // 찜 상태 토글
  };

  // 신고
  const handleReportClick = () => {
    if (isAdmin) {
      alert('관리자 계정은 신고 기능을 이용할 수 없습니다.');
      return;
    }
    if (!userId) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    setIsModalOpen(true); // 모달 열기
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };
  const handleConfirmReport = () => {
    alert('신고가 완료되었습니다.');
    setIsModalOpen(false); // 신고 후 모달 닫기
  };

  // 게시물 삭제
  const handleDeletePost = async () => {
    if (sellStatus === '판매 중') {
      const confirmDelete = window.confirm(
        '정말로 이 게시물을 삭제하시겠습니까?',
      );
      if (confirmDelete) {
        try {
          const res = await deletePost(id);
          if (res.data.result) {
            alert('게시물이 삭제되었습니다.');
            navigate('/posts/list/1/0?order=latest'); // 목록 페이지로 리다이렉트
          }
        } catch (error) {
          console.error('게시물 삭제 중 오류 발생:', error);
          alert('게시물 삭제에 실패했습니다.');
        }
      }
    } else {
      alert(`${sellStatus}인 게시물은 삭제할 수 없습니다`);
      return;
    }
  };

  // 게시물 수정
  const editPost = async (e, id) => {
    e.preventDefault();
    if (sellStatus !== '판매 중') {
      alert(`${sellStatus}인 게시물은 수정할 수 없습니다.`);
      return;
    }
    navigate(`/posts/edit/${id}`);
  };

  if (!postData) {
    return <NotFound />;
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
                <SwiperMagnify
                  productImg={Product_Images}
                  sellStatus={sellStatus}
                />
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
                  <CartBtn
                    post={id}
                    sellStatus={sellStatus}
                    sellerId={sellerId}
                  />
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
                  <img
                    src={sellerImg || '/img/duck.jpg'}
                    className="seller-img"
                  />
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
                      onClick={(e) => editPost(e, id)}
                    >
                      수정
                    </Link>
                    <button className="btn delete" onClick={handleDeletePost}>
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
          {/* 댓글 */}
          <Comment
            postId={id}
            postSellerId={sellerId}
            postSellerImg={sellerImg}
            postSellerName={sellerName}
          />
        </div>
      )}
    </>
  );
}
