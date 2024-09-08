import React, { useCallback, useEffect, useRef, useState } from 'react';
import ItemList from '../components/ItemList';
import '../styles/pages/ListPage.scss';
import { getPostLists } from '../api/list';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { categoryData } from '../data/categoryData';
import { useDispatch } from 'react-redux';
import { setPages } from '../store/pageSlice';

// 상품 목록 페이지
export default function PostsListPage() {
  const btns = [
    { title: '최신순', order: 'latest' },
    { title: '낮은가격순', order: 'priceLow' },
    { title: '높은가격순', order: 'priceHigh' },
  ];

  const btnRef = useRef([]);

  const [listData, setListData] = useState([]); // 상품들 데이터

  const dispatch = useDispatch();

  // 카테고리 아이디
  const params = useParams();
  const categoryId = Number(params.categoryId);
  const pageNum = Number(params.page);

  // 쿼리 스트링(정렬순)
  const location = useLocation();
  const queryString = location.search;
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('order');

  useEffect(() => {
    fetchListData(categoryId, order);
    // 정렬 버튼 색깔
    btnRef.current.forEach((el, idx, arr) => {
      el.classList.remove('active');
      if (order === 'latest') arr[0].classList.add('active');
      else if (order === 'priceLow') arr[1].classList.add('active');
      else if (order === 'priceHigh') arr[2].classList.add('active');
    });
  }, [categoryId, pageNum, order]);

  // axios 연결
  const fetchListData = useCallback(
    async (categoryId, order) => {
      try {
        const res = await getPostLists(pageNum, categoryId, order);
        const { postList, postCount, pageSize, totalPages, currentPage } =
          res.data;

        // 상품들 데이터
        setListData([...postList]);
        // 페이지네이션 세팅
        dispatch(
          setPages({
            totalItems: postCount,
            limit: pageSize,
            totalPages,
            currentPage,
          }),
        );
      } catch (err) {
        console.error(err);
        alert('페이지를 불러 올 수 없습니다.');
      }
    },
    [categoryId, order, pageNum],
  );

  // 클릭 시 정렬 기능
  const sortData = (e) => {
    const orderName = e.target.getAttribute('data-order');
    setSearchParams({ order: orderName });
  };

  return (
    <div className="post-list">
      <section className="list-title">
        <h2>{categoryData[categoryId].category}</h2>
      </section>
      <section className="list-btns">
        <ul>
          {btns.map((ele, idx) => (
            <li
              key={idx}
              className={`list-btn ${idx === 0 ? 'active' : ''}`}
              onClick={sortData}
              data-order={ele.order}
              ref={(el) => (btnRef.current[idx] = el)}
            >
              {ele.title}&nbsp;
            </li>
          ))}
        </ul>
      </section>
      <section className="list-items">
        <ol>
          {listData ? (
            listData.length > 0 ? (
              listData.map((item, idx) => (
                <ItemList key={item.postId} item={item} />
              ))
            ) : (
              <li className="no-item">상품이 없습니다.</li>
            )
          ) : (
            <li className="no-item">상품이 없습니다.</li>
          )}
        </ol>
      </section>
      <section className="list-page">
        {listData && (
          <Pagination pageLocation={`/${categoryId}${queryString}`} />
        )}
      </section>
    </div>
  );
}
