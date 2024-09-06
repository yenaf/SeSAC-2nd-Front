import React, { useEffect, useState } from 'react';
import ItemList from '../components/ItemList';
import '../styles/pages/ListPage.scss';
import listDataFn from '../data/fakedata/listData';
import { getPostLists, getSearchLists } from '../api/list';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import axios from 'axios';

// 검색 결과 목록 페이지
export default function SearchPage() {
  // 상품목록 임시데이터
  const listData = listDataFn();
  //  const [listData, setListData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const params = useParams();
  // 키워드
  const location = useLocation();
  const queryString = location.search;
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('postTitle');

  useEffect(() => {
    // fetchListData(keyword);
  }, []);

  const fetchListData = async (keyword) => {
    try {
      const res = await getSearchLists(1, 20, keyword);
    } catch (err) {
      console.error();
    }
  };

  const listLength = listData.length;
  const listPageCount = Math.ceil(listData.length / limit);
  return (
    <div className="post-list">
      <section className="list-title">
        <h2>&apos;{keyword}&apos; 검색결과</h2>
      </section>
      <section className="list-items">
        <ol>
          {listData.length > 0 ? (
            listData.map((item, idx) => (
              <ItemList key={item.postId} item={item} />
            ))
          ) : (
            <li>상품이 없습니다.</li>
          )}
        </ol>
      </section>
      <section className="list-page">
        <Pagination
          totalItems={listLength}
          itemCountPerPage={limit}
          pageCount={listPageCount}
          currentPage={page}
          pageLocation={queryString}
        />
      </section>
    </div>
  );
}
