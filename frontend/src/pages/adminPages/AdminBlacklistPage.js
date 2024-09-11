import React, { useEffect, useState } from 'react';
import { getBlacklist } from '../../api/admin';

export default function AdminBlacklistPage() {
  const [blacklist, setBlacklist] = useState(null);
  useEffect(() => {
    fetchBlacklist();
  }, []);

  const fetchBlacklist = async () => {
    try {
      const res = await getBlacklist();
      if (res.status === 200) {
        setBlacklist(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="admin-content">
      <h2 className="admin-title">블랙리스트 관리</h2>
      <table className="admin-blacklistTable">
        <thead>
          <tr>
            <th>아이디</th>
            <th>판매자명</th>
            <th>신고누적횟수</th>
          </tr>
        </thead>
        <tbody>
          {blacklist ? (
            blacklist.length > 0 && blacklist[0].userId ? (
              blacklist.map((list, idx) => (
                <tr key={idx}>
                  <td>{list.loginId}</td>
                  <td>{list.sellerName}</td>
                  <td>{list.complaintCount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">등록된 블랙리스트가 없습니다.</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="3">등록된 블랙리스트가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
