import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/admin';

export default function AdminAlluserPage() {
  const [userList, setUserList] = useState(null);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await getUsers();
      if (res.status === 200) {
        setUserCount(res.data.userCount);
        setUserList(res.data.allUser);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="admin-content">
      <h2 className="admin-title">전체 회원 관리</h2>
      <h3 className="admin-allUserCount">
        총 <span>{userCount}</span> 명
      </h3>
      <table className="admin-allUserTable">
        <thead>
          <tr>
            <th>아이디</th>
            <th>닉네임</th>
            <th>판매자여부</th>
            <th>약관동의(필수)</th>
            <th>약관동의(선택)</th>
          </tr>
        </thead>
        <tbody>
          {userList ? (
            userList.length > 0 ? (
              userList.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.loginId}</td>
                  <td>{user.nickname}</td>
                  <td>{user.Seller ? 'Y' : 'N'}</td>
                  <td>{user.Terms_Agree.isRequiredAgreed ? 'Y' : 'N'}</td>
                  <td>{user.Terms_Agree.isOptionalAgreed ? 'Y' : 'N'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">회원 정보가 없습니다.</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="3">회원 정보가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
