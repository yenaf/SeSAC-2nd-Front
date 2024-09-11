import React, { useEffect, useState } from 'react';
import MyPageMenu from '../components/MyPageMenu';
import '../styles/pages/MyPage.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getPostListPageData } from '../api/mypage';
// import MypageItems from '../components/MypageItems';

export default function SellPostListPage() {
  const imgUrl = 'https://lieblings-bucket.s3.ap-northeast-2.amazonaws.com/';
  const [postListData, setPostListData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPostListApi();
  }, []);

  // 판매글 목록 조회 API
  const getPostListApi = async () => {
    try {
      const res = await getPostListPageData();

      // 조회된 데이터 상태에 저장
      setPostListData(res.data.sellerPosts || []);
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
        <div className="mypage-content-container post-list">
          <div className="postList-title">
            <h2>판매글 목록</h2>
          </div>
          <div className="post-list-container">
            {errorMessage ? (
              <div className="error-message">{errorMessage}</div>
            ) : postListData.length > 0 ? (
              postListData.map((post) => (
                <div key={post.postId} className="post-list-content">
                  <Link to={`/posts/page/${post.postId}`}>
                    <div className="post-img">
                      <img
                        src={`${imgUrl}${post.Product_Images[0].imgName}`}
                        alt={post.postTitle}
                      />
                      {post.sellStatus === '판매 중' ? null : (
                        <div className="img-filter">
                          <div className="img-label">{post.sellStatus}</div>
                        </div>
                      )}
                    </div>
                    <div className="post-list-text">
                      <h2>{post.Category.categoryName}</h2>
                      <h2>{post.postTitle}</h2>
                      <h2>{post.productPrice.toLocaleString()} 원</h2>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="err-msg">판매글이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
