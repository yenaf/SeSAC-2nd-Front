import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getComplaint } from '../../api/admin';

export default function AdminSellerComplaintPage() {
  const [complaintUser, setComplaintUser] = useState('');
  const [complaintList, setComplaintList] = useState(null);

  const navigate = useNavigate();

  const params = useParams();
  const sellerId = Number(params.sellerId);

  useEffect(() => {
    fetchComplaintList(sellerId);
  }, []);

  const fetchComplaintList = async (sellerId) => {
    try {
      const res = await getComplaint(sellerId);
      console.log(res.data);
      setComplaintUser(res.data[0].Seller.sellerName);
      setComplaintList(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="admin-content">
      <h2 className="admin-title">판매자 관리(신고된 글)</h2>
      <h3 className="admin-complaintUser">
        <div>
          <span>&apos;{complaintUser}&rsquo;</span>
          님의 신고된 글
        </div>
        <div className="admin-addBlackList">
          <button>블랙리스트 추가</button>
        </div>
      </h3>
      <table className="admin-complaintTable">
        <thead>
          <tr>
            <th>상품명</th>
            <th>상품정보</th>
            <th>신고사유</th>
          </tr>
        </thead>
        <tbody>
          {complaintList ? (
            complaintList.length > 0 ? (
              complaintList.map((complaint, idx) => (
                <tr key={idx}>
                  <td>
                    <Link to={`/posts/page/${complaint.Post.postId}`}>
                      {complaint.Post.postTitle}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/posts/page/${complaint.Post.postId}`}>
                      {complaint.Post.postContent}
                    </Link>
                  </td>
                  <td>{complaint.complaintContent}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">신고 내역이 없습니다</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="3">신고 내역이 없습니다</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
