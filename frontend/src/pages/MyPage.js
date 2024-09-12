import React, { useEffect, useState } from 'react';
import MyPageMenu from '../components/MyPageMenu';
import { getMypageData } from '../api/mypage';
import '../styles/pages/MyPage.scss';

import MypageItems from '../components/MypageItems';

export default function MyPage() {
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    const getMypageInit = async () => {
      try {
        const res = await getMypageData();
        setInitData(res.data);
      } catch (error) {
        console.error('마이페이지 데이터 가져오기 실패:', error);
      }
    };
    getMypageInit();
  }, []);

  // initData가 로드되었는지 확인
  if (!initData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mypage-container">
      <MyPageMenu />
      <div className="mypage-info-container">
        <div className="mypage-info-content">
          <h2>내 정보</h2>
          <div className="mypage-info mypage-main">
            <div className="user-info main">
              <p>회원 정보</p>
              <div className="info-content">
                <div className="info-content main">
                  <figure className="mypage-img">
                    <img
                      src={initData.user?.profileImg || '/img/user.jpg'}
                      alt="사용자 프로필"
                    />
                  </figure>
                  <div className="mypage-profile main">
                    <div className="mypage-name main">
                      <span className="info-txt-main">
                        {initData.user.nickname}
                      </span>{' '}
                      님
                    </div>
                    <div className="mypage-money">
                      <div className="money-balance">
                        <span className="info-txt-main">
                          {initData.user.balance.toLocaleString()}
                        </span>{' '}
                        원
                      </div>
                      {/* <button type="button" className="money-btn">
                        충전
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="seller-info main">
              {initData.seller?.sellerId ? (
                <div>
                  <p>판매자 정보</p>
                  <div className="info-content main">
                    <figure className="mypage-img">
                      <img
                        src={initData.seller?.sellerImg || '/img/duck.jpg'}
                        alt="판매자 프로필"
                      />
                    </figure>
                    <div className="mypage-profile">
                      <div className="mypage-name">
                        <span className="info-txt-main">
                          {initData.seller?.sellerName}
                        </span>{' '}
                        님
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className="mypage-buy-content">
          <h2>구매내역</h2>
          {/* <span className="more">더보기</span> */}
          {initData.purchasedPosts.length === 0 ? (
            <p>{initData.purchaseMessage}</p>
          ) : (
            <section className="mypage-buy-list">
              <ol>
                {initData.purchasedPosts.map((purchasedPost, index) => (
                  <MypageItems
                    key={purchasedPost.postId || index}
                    item={purchasedPost}
                  />
                ))}
              </ol>
            </section>
          )}
        </div>
        <div className="mypage-seller-content">
          <h2>판매글 목록</h2>
          {initData.sellerPosts.length === 0 ? (
            <p>{initData.sellerMessage}</p>
          ) : (
            <section className="seller-list">
              <ol>
                {initData.sellerPosts.map((sellerPost, index) => (
                  <MypageItems
                    key={sellerPost.postId || index}
                    item={sellerPost}
                  />
                ))}
              </ol>
            </section>
          )}
          <div className="seller-info">
            <div className="seller-list">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
