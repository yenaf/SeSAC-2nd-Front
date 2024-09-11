import React, { useEffect, useState } from 'react';
import '../styles/pages/MainPage.scss';
import MainSwiper from '../components/MainSwiper';
import ItemList from '../components/ItemList';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWonSign,
  faHeart,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { getMainList } from '../api/list';

// 메인 페이지
export default function MainPage() {
  const [recentListData, setRecentListData] = useState([]);
  const [tenThousandListData, setTenThousandListData] = useState([]);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const res = await getMainList();
      const { newPostList, lowPriceList } = res.data;

      const randomItems = getRandomItems(lowPriceList, 8);

      setRecentListData(newPostList);
      setTenThousandListData(randomItems);
    } catch (err) {
      console.error(err);
      alert('상품 목록을 불러올 수 없습니다.');
    }
  };
  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random()); // 배열 섞기
    return shuffled.slice(0, count); // 랜덤하게 8개 선택
  };
  return (
    <>
      <section className="main-page">
        <MainSwiper />
        <section className="list-items" id="content">
          <div>
            <h2>
              <FontAwesomeIcon icon={faHeart} className="heart" />
              방금 등록된 상품
              <FontAwesomeIcon icon={faHeart} className="heart" />
            </h2>
            <Link to="/posts/list/1/0?order=latest" className="load-more">
              더보기
              <FontAwesomeIcon icon={faChevronRight} className="more-icon" />
            </Link>
          </div>
          <ul>
            {recentListData ? (
              recentListData.length > 0 ? (
                recentListData.map((item, idx) => (
                  <ItemList key={item.postId} item={item} />
                ))
              ) : (
                <li className="no-item">상품이 없습니다.</li>
              )
            ) : (
              <li className="no-item">상품이 없습니다.</li>
            )}
          </ul>
        </section>
        <section className="list-items">
          <div>
            <h2>
              <FontAwesomeIcon icon={faWonSign} className="won" />
              만원의 행복
              <FontAwesomeIcon icon={faWonSign} className="won" />
            </h2>
            <Link to="/posts/list/1/0?order=priceLow" className="load-more">
              더보기
              <FontAwesomeIcon icon={faChevronRight} className="more-icon" />
            </Link>
          </div>
          <ul>
            {tenThousandListData ? (
              tenThousandListData.length > 0 ? (
                tenThousandListData.map((item, idx) => (
                  <ItemList key={item.postId} item={item} />
                ))
              ) : (
                <li className="no-item">상품이 없습니다.</li>
              )
            ) : (
              <li className="no-item">상품이 없습니다.</li>
            )}
          </ul>
        </section>
      </section>
    </>
  );
}
