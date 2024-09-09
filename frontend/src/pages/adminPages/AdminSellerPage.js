import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSellers } from '../../api/admin';

export default function AdminSellerPage() {
  const [sellerList, setSellerList] = useState(null);
  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const res = await getSellers();
      if (res.status === 200) {
        setSellerList(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="admin-content">
      <h2 className="admin-title">판매자 관리</h2>
      <table className="admin-sellersTable">
        <thead>
          <tr>
            <th>선택</th>
            <th>아이디</th>
            <th>판매자명</th>
            <th>신고누적횟수</th>
          </tr>
        </thead>
        <tbody>
          {sellerList ? (
            sellerList.length > 0 ? (
              sellerList.map((seller, idx) => (
                <tr key={idx}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <Link to={`/admin/complaint/${seller.sellerId}`}>
                      {seller.loginId}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/complaint/${seller.sellerId}`}>
                      {seller.sellerName}
                    </Link>
                  </td>
                  <td>{seller.complaintCount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">등록된 판매자가 없습니다.</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="3">등록된 판매자가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="admin-addBlackList">
        <button>블랙리스트 추가</button>
      </div>
    </div>
  );
}
