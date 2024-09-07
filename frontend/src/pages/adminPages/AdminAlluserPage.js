import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/admin';
import { adminAllUserData } from '../../data/fakedata/adminData';

export default function AdminAlluserPage() {
  // const [userList, setUserList] = useState();
  // 임시데이터
  const userList = adminAllUserData;

  useEffect(() => {
    // fetchAllUser();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await getUsers();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="admin-content">
      <h2 className="admin-title">전체 회원 관리</h2>
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
                  <td>{user.nickName}</td>
                  <td>{user.sellerId ? 'Y' : 'N'}</td>
                  <td>{user.Terms_Agree.isRequiredAgreed ? 'Y' : 'N'}</td>
                  <td>{user.Terms_Agree.isOptionalAgreed ? 'Y' : 'N'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>회원 정보가 없습니다.</td>
              </tr>
            )
          ) : (
            <tr>
              <td>회원 정보가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
