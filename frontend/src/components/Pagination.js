import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import handleScrollToTop from '../utils/handleScrollToTop';

// 상품목록페이지, 검색결과페이지의 페이지네이션 컴포넌트
export default function Pagination({ pageLocation }) {
  const { limit, totalPages, currentPage, totalItems } = useSelector(
    (state) => state.page,
  );

  const currenTotalPages = Math.ceil(totalItems / limit); // 총 페이지 갯수
  const [start, setStart] = useState(1); // 시작 페이지
  const noPrev = start === 1; // 이전 페이지가 없는 경우
  const noNext = start + totalPages - 1 >= currenTotalPages; // 다음 페이지가 없는 경우

  const url = (page) => {
    return `/posts/list/${page}`;
  };

  const pageArr = [...Array(totalPages)].map((_, index) => index + 1);

  useEffect(() => {
    if (currentPage === start + totalPages)
      setStart((prev) => prev + totalPages);
    if (currentPage < start) setStart((prev) => prev - totalPages);
  }, [currentPage, totalPages, start]);

  return (
    <div className="page-wrapper">
      <ul>
        <li className={`move ${noPrev && 'invisible'}`}>
          <Link
            to={`${url(start - 1)}${pageLocation}`}
            onClick={handleScrollToTop}
          >
            이전
          </Link>
        </li>
        {pageArr.map(
          (num, idx) =>
            start + idx <= currenTotalPages && (
              <li
                key={idx}
                className={`${currentPage === start + idx && 'active'}`}
              >
                <NavLink
                  to={`${url(start + idx)}${pageLocation}`}
                  onClick={() => {
                    handleScrollToTop();
                  }}
                >
                  {start + idx}
                </NavLink>
              </li>
            ),
        )}
        <li className={`move ${noNext && 'invisible'}`}>
          <Link
            to={`${url(start + totalPages)}${pageLocation}`}
            onClick={handleScrollToTop}
          >
            다음
          </Link>
        </li>
      </ul>
    </div>
  );
}
