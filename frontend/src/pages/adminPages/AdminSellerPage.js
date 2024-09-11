import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSellers, getComplaint, updateBlacklist } from '../../api/admin';

export default function AdminSellerPage() {
  const [sellerList, setSellerList] = useState(null);
  const [selectUser, setSelectUser] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);
  const [select, setSelect] = useState('loginId');
  const navigate = useNavigate();

  const searchRef = useRef();

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const res = await getSellers();
      if (res.status === 200) {
        setSellerList(res.data);
        setSellerCount(res.data.length);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComplaintList = async (e, sellerId, userId) => {
    e.preventDefault();
    try {
      const res = await getComplaint(sellerId);
      if (res.data.length < 1) {
        alert('신고된 내역이 없습니다.');
        return;
      }
      navigate(`/admin/complaint/${sellerId}`, { state: { userId } });
    } catch (err) {
      console.error(err);
      alert('신고된 내역이 없습니다.');
    }
  };

  // 판매자 검색
  const searchSeller = () => {
    const keyword = searchRef.current.value.trim();
    if (keyword === '') return alert('검색어를 입력해주세요');
    const result = sellerList.filter((seller) =>
      seller[select].includes(keyword),
    );
    setSellerList(result);
    setSellerCount(result.length);
  };

  const searchEnter = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing == false) {
      searchSeller();
    }
  };

  // 검색결과 초기화 및 전체 유저 조회
  const resetSearch = () => {
    fetchSellers();
  };

  // 블랙리스트 추가
  const addBlackList = async () => {
    try {
      const res = await updateBlacklist({ userId: selectUser });
      if (res.data.results) {
        const noBlacklist = sellerList.filter(
          (seller) => seller.userId !== selectUser,
        );
        setSellerList(noBlacklist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectBlackList = (e, userId) => {
    setSelectUser(userId);
  };

  return (
    <div className="admin-content">
      <h2 className="admin-title">판매자 관리</h2>
      <h3 className="admin-allUserCount">
        총 <span>{sellerCount}</span> 명
      </h3>
      <div className="admin-userSearch">
        <select
          onChange={(e) => {
            setSelect(e.target.value);
            fetchSellers();
          }}
        >
          <option value="loginId">아이디</option>
          <option value="sellerName">판매자명</option>
        </select>
        <input
          type="text"
          id="user-search"
          name="user-search"
          ref={searchRef}
          onKeyDown={searchEnter}
          onChange={fetchSellers}
        />
        <button onClick={searchSeller}>판매자 조회</button>
        <button onClick={resetSearch}>전체 판매자 조회</button>
      </div>
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
                    <input
                      type="radio"
                      name="blacklist"
                      onChange={(e) => selectBlackList(e, seller.userId)}
                    />
                  </td>
                  <td>
                    <Link
                      to={`/admin/complaint/${seller.sellerId}`}
                      onClick={(e) =>
                        fetchComplaintList(e, seller.sellerId, seller.userId)
                      }
                    >
                      {seller.loginId}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/admin/complaint/${seller.sellerId}`}
                      onClick={(e) =>
                        fetchComplaintList(e, seller.sellerId, seller.userId)
                      }
                    >
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
        <button onClick={addBlackList}>블랙리스트 추가</button>
      </div>
    </div>
  );
}
