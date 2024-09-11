import React, { useEffect, useState } from 'react';
import MyPageMenu from '../components/MyPageMenu';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getWishListPageData } from '../api/mypage';

export default function WishListPage() {
  const imgUrl = 'https://lieblings-bucket.s3.ap-northeast-2.amazonaws.com/';
  const [wishListData, setWishListData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getWishListApi();
  }, []);

  // 찜 목록 조회 API
  const getWishListApi = async () => {
    try {
      const res = await getWishListPageData();

      // res로 받아온 데이터 상태에 저장하기
      setWishListData(res.data.wishlist || []);
    } catch (error) {
      console.error('Server Error: ', error);
      setErrorMessage(
        error.response?.data?.error || '알 수 없는 오류가 발생했습니다.',
      );
    }
  };

  return (
    <div className="mypage-container">
      <MyPageMenu />
      <div className="mypage-info-container">
        <div className="mypage-content-container wish-list">
          <div className="wishList-title">
            <h2>찜 목록</h2>
          </div>
          <div className="wish-list-container">
            {errorMessage ? (
              <div className="error-message">{errorMessage}</div>
            ) : wishListData.length > 0 ? (
              wishListData.map((wish) => (
                <div key={wish.postId} className="wish-list-content">
                  <Link to={`/posts/page/${wish.postId}`}>
                    <div className="wish-img">
                      <img
                        src={`${imgUrl}${wish.Post.Product_Images[0].imgName}`}
                        alt=""
                      />
                      {wish.Post.sellStatus === '판매 중' ? null : (
                        <div className="img-filter">
                          <div className="img-label">
                            {wish.Post.sellStatus}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="wish-list-text">
                      <h2>{wish.Post.Category.categoryName}</h2>
                      <h2>{wish.Post.postTitle}</h2>
                      <h2>{wish.Post.productPrice.toLocaleString()} 원</h2>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="err-msg">찜 목록이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
