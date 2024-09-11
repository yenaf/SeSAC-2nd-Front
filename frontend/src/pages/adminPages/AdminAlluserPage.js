import React, { useState, useEffect, useRef } from 'react';
import { getUsers } from '../../api/admin';

export default function AdminAlluserPage() {
  const [userList, setUserList] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [select, setSelect] = useState('loginId');

  const searchRef = useRef();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await getUsers();
      if (res.status === 200) {
        setUserList(res.data);
        setUserCount(res.data.length);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 유저 검색
  const searchUser = () => {
    const keyword = searchRef.current.value.trim();
    if (keyword === '') return alert('검색어를 입력해주세요');
    const result = userList.filter((user) => user[select].includes(keyword));
    setUserList(result);
    setUserCount(result.length);
  };

  const searchEnter = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing == false) {
      searchUser();
    }
  };

  // 검색결과 초기화 및 전체 유저 조회
  const resetSearch = () => {
    fetchAllUsers();
  };

  return (
    <div className="admin-content">
      <h2 className="admin-title">전체 회원 관리</h2>
      <h3 className="admin-allUserCount">
        총 <span>{userCount}</span> 명
      </h3>
      <div className="admin-userSearch">
        <select
          onChange={(e) => {
            setSelect(e.target.value);
            fetchAllUsers();
          }}
        >
          <option value="loginId">아이디</option>
          <option value="nickname">닉네임</option>
        </select>
        <input
          type="text"
          id="user-search"
          name="user-search"
          ref={searchRef}
          onKeyDown={searchEnter}
          onChange={fetchAllUsers}
        />
        <button onClick={searchUser}>회원 조회</button>
        <button onClick={resetSearch}>전체 회원 조회</button>
      </div>
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
                <td colSpan="5">회원 정보가 없습니다.</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="5">회원 정보가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
