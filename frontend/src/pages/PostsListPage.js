import React, { useEffect, useState } from 'react';
import ItemList from '../components/ItemList';
import '../styles/pages/ListPage.scss';
import listDataFn from '../data/fakedata/listData';
import { getPostLists } from '../api/list';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { categoryData } from '../data/categoryData';
import axios from 'axios';

export default function PostsListPage() {
  const btns = ['최신순', '인기순', '가격 높은순', '가격 낮은순'];
  // 상품목록 임시데이터
  const listData = listDataFn();
  //  const [listData, setListData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  // 카테고리 아이디
  const params = useParams();
  const categoryId = Number(params.categoryId);

  useEffect(() => {
    // fetchListData(true, categoryId);
  }, []);

  // axios 연결
  const fetchListData = async (isFirstFetch, categoryId) => {
    try {
      // const offsetValue = isFirstFetch ? 0 : offset + limit;
      const res = await getPostLists(1, 20, categoryId);
      // setListData([res.data.results])
      // const res = await axios.get(
      //   // `http://localhost:8080/posts/list/${page}/${limit}/${categoryId}`,
      // );
    } catch (err) {
      console.error(err);
    }
  };

  // 정렬
  const sortData = (e) => {
    console.log(e.target.innerText);
  };

  const listLength = listData.length;
  const listPageCount = Math.ceil(listData.length / limit);

  return (
    <div className="post-list">
      <section className="list-title">
        <h2>{categoryData[categoryId + 1].category}</h2>
      </section>
      <section className="list-btns">
        <ul>
          {btns.map((ele, idx) => (
            <li key={idx} className="list-btn" onClick={sortData}>
              {ele}&nbsp;
            </li>
          ))}
        </ul>
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
          pageLocation={`/${categoryId}`}
        />
      </section>
    </div>
  );
}
