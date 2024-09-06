import React from 'react';
import '../styles/pages/PostDetailPage.scss';

const ReportModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="report-modal-overlay">
      <div className="report-modal-content">
        <h2>신고하기</h2>
        <p>신고사유 선택</p>
        <label htmlFor="1" className="report-label">
          <input type="radio" id="1" name="reports" />
          욕설, 비방, 차별, 혐오
        </label>
        <label htmlFor="2" className="report-label">
          <input type="radio" id="2" name="reports" />
          불법정보
        </label>
        <label htmlFor="3" className="report-label">
          <input type="radio" id="3" name="reports" />
          음란, 청소년 유해
        </label>
        <label htmlFor="4" className="report-label">
          <input type="radio" id="4" name="reports" />
          도배, 스팸
        </label>
        <label htmlFor="5" className="report-label">
          <input type="radio" id="5" name="reports" />
          기타
        </label>
        <p>이 게시글을 신고하시겠습니까?</p>
        <button onClick={onConfirm}>확인</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default ReportModal;
