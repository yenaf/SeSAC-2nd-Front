import React from 'react';
import { Link } from 'react-router-dom';

// 관리자 페이지
export default function AdminPage() {
  const adminBtns = [
    { title: 'allUser', kor: '전체 회원 관리' },
    { title: 'seller', kor: '판매자 관리' },
    { title: 'blacklist', kor: '블랙리스트 관리' },
    { title: 'orderlogs', kor: '전체 거래 내역 조회' },
  ];
  return (
    <div className="admin-content">
      <h2 className="admin-title">어서오세요!</h2>
      <div className="admin-menuBtns">
        <ul>
          {adminBtns.map((ele, idx) => (
            <li key={idx}>
              <Link to={`/admin/${ele.title}`}>
                <figure>
                  <img src={`/img/${ele.title}.png`} alt={ele.kor} />
                  <figcaption>{ele.kor}</figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
