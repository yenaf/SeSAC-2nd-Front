import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Pagination({
  totalItems, // 데이터 총 갯수
  itemCountPerPage, // 페이지 당 보여줄 데이터 개수
  pageCount, // 보여줄 페이지 개수
  currentPage, // 현재 페이지
  pageLocation, // 페이지 이름
}) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage); // 총 페이지 갯수
  const [start, setStart] = useState(1); // 시작 페이지
  const noPrev = start === 1; // 이전 페이지가 없는 경우
  const noNext = start + pageCount - 1 >= totalPages; // 다음 페이지가 없는 경우

  const url = (page) => {
    return `/posts/list/${page}`;
  };

  //const url = `/posts/lists/${currentPage}/${itemCountPerPage}`;
  const pageArr = [...Array(pageCount)].map((_, index) => index + 1);

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div className="page-wrapper">
      <ul>
        <li className={`move ${noPrev && 'invisible'}`}>
          <Link to={`${url(start - 1)}${pageLocation}`}>이전</Link>
        </li>
        {pageArr.map(
          (num, idx) =>
            start + idx <= totalPages && (
              <li
                key={idx}
                className={`${currentPage === start + idx && 'active'}`}
              >
                <NavLink to={`${url(start + idx)}${pageLocation}`}>
                  {start + idx}
                </NavLink>
              </li>
            ),
        )}
        <li className={`move ${noNext && 'invisible'}`}>
          <Link to={`${url(start + pageCount)}${pageLocation}`}>다음</Link>
        </li>
      </ul>
    </div>
  );
}
