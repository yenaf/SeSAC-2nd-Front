import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faArrowTurnUp,
  faPenToSquare,
  faX,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import formatDate from '../components/common/formatDate';

export default function Comment({
  postId,
  postSellerId,
  postSellerImg,
  postSellerName,
}) {
  const [comments, setComments] = useState([]);
  const [session, setSession] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [reCharCount, setReCharCount] = useState(0);
  const [isSecret, setIsSecret] = useState(false);
  const [activeReplyIndex, setActiveReplyIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  // 댓글 목록 조회
  async function getCommentList() {
    try {
      const res = await axios.get(
        `http://localhost:8080/comments/list/${postId}`,
        {
          withCredentials: true,
        },
      );
      const { commentList } = res.data;
      const { session } = res.data;
      setComments(commentList);
      setSession(session);
      console.log('댓글목록조회', res.data);
    } catch (error) {
      console.error('댓글 목록을 가져오는 데 실패했습니다:', error);
    }
  }
  const { nickname, profileImg, sellerId, userId } = session;

  // 댓글 글자수
  useEffect(() => {
    setCharCount(commentText.length);
    setReCharCount(replyText.length);
    if (commentText.length > 100) {
      setCommentText(commentText.slice(0, 100));
    }
    if (replyText.length > 100) {
      setReplyText(replyText.slice(0, 100));
    }
  }, [commentText, replyText]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
    setCharCount(e.target.value.length);
  };
  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
    setCharCount(e.target.value.length);
  };

  // 댓글 등록
  async function handleCommentSubmit() {
    try {
      const res = await axios.post(
        `http://localhost:8080/comments/${postId}`,
        {
          comContent: commentText,
          isSecret: isSecret,
        },
        {
          withCredentials: true,
        },
      );
      getCommentList();
      setCommentText('');
    } catch (error) {
      console.error('댓글 등록에 실패했습니다:', error);
    }
  }

  // 댓글 삭제
  async function handleDeleteComment(comId) {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      return;
    }
    try {
      const res = await axios.patch(
        `http://localhost:8080/comments/delete/${comId}`,
      );
      console.log(res.data); //{deleteComm: 1, deleteReply: 1}

      getCommentList();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  }

  const handleEditComment = (comId, currentContent) => {
    setEditingCommentText(currentContent);
    setIsEditing(comId);
  };

  // 댓글 수정
  async function handleUpdateComment(comId) {
    try {
      const res = await axios.patch(
        `http://localhost:8080/comments/update/${comId}`,
        { comContent: editingCommentText, isSecret: isSecret },
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      getCommentList();
      setIsEditing(null);
      setEditingCommentText('');
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  }

  // Enter 키로 댓글 수정 완료
  const handleKeyDown = (e, comId) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 Enter 동작(줄바꿈) 방지
      handleUpdateComment(comId); // 댓글 수정 API 호출
    }
  };

  // 비밀 댓글 토글
  const toggleSecret = () => {
    setIsSecret(!isSecret);
  };

  // userId가 있을때만 댓글에 접근가능
  const userCheck = () => {
    if (!userId) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
  };
  // 판매자 자신이 작성한 글에서 작성한 댓글에서는 판매자 정보(이름, 프로필 사진)가 보여야 한다.
  // postSellerId === sellerId

  useEffect(() => {
    getCommentList();
  }, [postId]);

  return (
    <section className="comment-container">
      <h2>댓글쓰기</h2>
      {/* 댓글등록 */}
      <div className="comment-wrap" onMouseDown={userCheck}>
        <div className="user-wrap">
          <img
            src={
              postSellerId === sellerId
                ? postSellerImg
                : profileImg || '/img/duck.jpg'
            }
            className="user-img"
          />
          <h3 className="nickname">
            {postSellerId === sellerId ? postSellerName : nickname}
          </h3>
        </div>
        <div className="textarea-box">
          <textarea
            className="comment-text"
            placeholder={isSecret ? '비밀댓글 입니다' : '댓글을 입력해주세요.'}
            value={commentText}
            onChange={handleCommentChange}
          />
          <span className="char-count">{charCount} / 100</span>
        </div>
        <div className="comment-btn-wrap">
          <label
            className={`lock-comment ${isSecret ? 'active' : ''}`}
            htmlFor="secret"
          >
            <FontAwesomeIcon icon={faLock} className="lock-icon" />
            <input
              type="checkbox"
              id="secret"
              checked={isSecret}
              onChange={toggleSecret}
            />
            비밀 댓글
          </label>
          <button className="comment-btn" onClick={handleCommentSubmit}>
            등록
          </button>
        </div>
      </div>
      {/* 댓글 등록 완료 */}
      <div onMouseDown={userCheck}>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <div className="comment-item">
                <div className="user-wrap">
                  <img
                    src={comment.User.profileImg || '/img/duck.jpg'}
                    className="user-img"
                  />
                  <h3 className="nickname">
                    {comment.User.nickname}
                    {comment.isSecret && (
                      <FontAwesomeIcon icon={faLock} className="lock-icon" />
                    )}
                  </h3>
                </div>
                <div className="text-box">
                  <textarea
                    className="comment-text"
                    value={
                      isEditing === comment.comId
                        ? editingCommentText // 수정 중인 댓글의 내용은 별도 상태 사용
                        : comment.isSecret && userId !== comment.User.userId
                          ? '🔒 비밀 댓글입니다' // 비밀 댓글일 경우
                          : comment.comContent
                    }
                    onChange={(e) => setEditingCommentText(e.target.value)} // 수정 중인 댓글의 내용 변경
                    readOnly={isEditing !== comment.comId} // 수정 중인 댓글만 수정 가능하게
                    onKeyDown={(e) => handleKeyDown(e, comment.comId)}
                  />
                  <time>{formatDate(comment.createdAt)}</time>
                </div>
                <div className="comment-complete-btn">
                  <button
                    className="reply-btn"
                    // onClick={() => handleInputReply(index, comment.comId)}
                  >
                    <FontAwesomeIcon
                      icon={faArrowTurnUp}
                      className="reply-icon"
                    />
                    답글
                  </button>
                </div>
                {userId === comment.User.userId && (
                  <div className="comment-edit-wrap">
                    {isEditing === comment.comId ? (
                      <button
                        title="저장"
                        className="comment-edit-icon"
                        onClick={() => handleUpdateComment(comment.comId)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    ) : (
                      <>
                        <button
                          title="수정"
                          onClick={() =>
                            handleEditComment(comment.comId, comment.comContent)
                          }
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="comment-edit-icon"
                          />
                        </button>
                        <button
                          title="삭제"
                          onClick={() => {
                            handleDeleteComment(comment.comId);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faX}
                            className="comment-edit-icon"
                          />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
