import React, { useCallback, useEffect, useState } from 'react';
import ItemList from '../components/ItemList';
import '../styles/pages/ListPage.scss';
import { getSearchLists } from '../api/list';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { setPages } from '../store/pageSlice';
import { useDispatch, useSelector } from 'react-redux';

// 검색 결과 목록 페이지
export default function SearchPage() {
  const [listData, setListData] = useState([]);

  // 페이지 세팅
  const params = useParams();
  const pageNum = Number(params.page);

  // 키워드
  const location = useLocation();
  const queryString = location.search;
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('postTitle');

  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.page);

  useEffect(() => {
    fetchListData(keyword);
  }, [pageNum, keyword]);

  const fetchListData = useCallback(
    async (keyword) => {
      try {
        const res = await getSearchLists(pageNum, keyword);
        const { postList, postCount, pageSize, totalPages, currentPage } =
          res.data;

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
      }
    },
    [pageNum, keyword],
  );

  return (
    <div className="post-list">
      <section className="list-title">
        <h2>
          <span>&apos;{keyword}&apos;</span> 검색결과
        </h2>
        <div className="list-resultNum">
          총 <span>{totalItems}</span>개
        </div>
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
        <Pagination pageLocation={queryString} />
      </section>
    </div>
  );
}
