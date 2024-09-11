import React, { useState } from 'react';
import '../styles/pages/PostDetailPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { insertComplaint } from '../api/post';

// 신고 모달 컴포넌트
const ReportModal = ({
  isOpen,
  onClose,
  onConfirm,
  userId,
  sellerId,
  postId,
}) => {
  const [selectedReason, setSelectedReason] = useState('');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (selectedReason) {
      try {
        const complaintsData = {
          userId: userId, // 세션에서 사용자 ID를 가져오기
          postId: postId, // 신고할 게시글 ID
          sellerId: sellerId, // 판매자 ID
          complaintContent: selectedReason,
        };
        const res = insertComplaint(complaintsData);
        res.then((res) => {
          if (res.status === 200) {
            onConfirm();
          }
        });
      } catch (error) {
        console.error('신고 등록 실패', error);
      }
    }
  };

  return (
    <div className="report-modal-overlay">
      <div className="report-modal-content">
        <h2>
          <FontAwesomeIcon icon={faFlag} className="report-icon" />
          신고하기
        </h2>
        <p>신고사유 선택</p>
        <label htmlFor="1" className="report-label">
          <input
            type="radio"
            id="1"
            name="reports"
            value="욕설, 비방, 차별, 혐오"
            onChange={() => setSelectedReason('욕설, 비방, 차별, 혐오')}
          />
          욕설, 비방, 차별, 혐오
        </label>
        <label htmlFor="2" className="report-label">
          <input
            type="radio"
            id="2"
            name="reports"
            value="불법정보"
            onChange={() => setSelectedReason('불법정보')}
          />
          불법정보
        </label>
        <label htmlFor="3" className="report-label">
          <input
            type="radio"
            id="3"
            name="reports"
            value="음란, 청소년 유해"
            onChange={() => setSelectedReason('음란, 청소년 유해')}
          />
          음란, 청소년 유해
        </label>
        <label htmlFor="4" className="report-label">
          <input
            type="radio"
            id="4"
            name="reports"
            value="도배, 스팸"
            onChange={() => setSelectedReason('도배, 스팸')}
          />
          도배, 스팸
        </label>
        <label htmlFor="5" className="report-label">
          <input
            type="radio"
            id="5"
            name="reports"
            value="기타"
            onChange={() => setSelectedReason('기타')}
          />
          기타
        </label>
        <p>이 게시글을 신고하시겠습니까?</p>
        <div className="reports-btn">
          <button onClick={handleConfirm}>확인</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
