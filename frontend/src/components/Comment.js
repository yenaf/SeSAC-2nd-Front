import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faArrowTurnUp,
  faPenToSquare,
  faX,
  faCheck,
  faFaceSmile,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import formatDate from '../utils/formatDate';
import {
  deleteComment,
  getComment,
  submitComment,
  updateComment,
  replyCommentSubmit,
  replyCommentDelete,
} from '../api/comment';

// 댓글 컴포넌트
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
  const [isReSecret, setIsReSecret] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [replyVisible, setReplyVisible] = useState({}); // 각 댓글에 대한 대댓글 입력창 표시 여부
  const { isLogin, isAdmin, isBlacklist } = useSelector((state) => state.login);

  // 댓글 목록 조회
  async function getCommentList() {
    try {
      const res = await getComment(postId);
      const { commentList } = res.data;
      const { session } = res.data;
      setComments(commentList);
      setSession(session);
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
    if (!commentText) {
      alert('1자 이상 입력해주세요');
      return;
    }
    try {
      const res = await submitComment(postId, commentText, isSecret);
      getCommentList();
      setCommentText('');
      setIsSecret(false);
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
      const res = await deleteComment(comId);
      getCommentList();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  }

  // 해당 댓글의 대댓글 입력창 토글
  const handleEditComment = (comId, currentContent) => {
    setEditingCommentText(currentContent);
    setIsEditing(comId);
  };

  // 댓글 수정
  async function handleUpdateComment(comId) {
    if (!editingCommentText) {
      alert('1자 이상 입력해주세요');
      return;
    }
    try {
      const res = await updateComment(comId, editingCommentText, isSecret);
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
  // 비밀 댓글 토글
  const toggleReSecret = () => {
    setIsReSecret(!isReSecret);
  };

  // userId가 있을때만 댓글에 접근가능
  const userCheck = () => {
    if (isAdmin) {
      alert('관리자 계정은 댓글 기능을 이용할 수 없습니다.');
      return;
    }
    if (!userId) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
  };

  // 해당 댓글의 대댓글 입력창 토글
  const handleReplyToggle = (commentId) => {
    setReplyVisible((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // 대댓글 등록
  async function handleReplySubmit(comId) {
    if (!replyText) {
      alert('1자 이상 입력해주세요');
      return;
    }
    try {
      const res = await replyCommentSubmit(
        comId,
        postId,
        replyText,
        isReSecret,
      );
      getCommentList();
      setReplyText('');
      setIsEditing(null);
      setReplyVisible('');
      setIsSecret(false);
    } catch (error) {
      console.error('대댓글 등록 실패:', error);
    }
  }

  // 대댓글 삭제
  async function handleReplyDelete(comId) {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      return;
    }
    try {
      const res = await replyCommentDelete(comId);
      getCommentList();
    } catch (error) {
      console.error('대댓글 삭제 실패:', error);
    }
  }

  useEffect(() => {
    getCommentList();
  }, [postId]);

  return (
    <section className="comment-container">
      <h2>댓글쓰기</h2>
      {/* 댓글등록 */}
      <div className="comment-wrap" onMouseDown={userCheck}>
        <div className="user-wrap">
          <img src={profileImg || '/img/user.jpg'} className="user-img" />
          <h3 className="nickname">{nickname}</h3>
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
      <ul onMouseDown={userCheck}>
        {comments.map((comment, index) => (
          <li key={index}>
            <div className="comment-item">
              <div className="user-wrap">
                <img
                  src={comment.User.profileImg || '/img/user.jpg'}
                  className="user-img"
                />
                <h3 className="nickname">
                  {/* 만약 postSellerId와 sellerId 가 같으면 comment.User.neckname 대신 comment에서 sellerName을 보내줘야함 마찬가지로 seller의 프로필이미지도 보내줘야함*/}
                  {comment.User.nickname}
                  {comment.isSecret && (
                    <FontAwesomeIcon icon={faLock} className="lock-icon" />
                  )}
                </h3>
              </div>
              <div className="text-box">
                <textarea
                  className="comment-text"
                  defaultValue={
                    isEditing === comment.comId
                      ? editingCommentText // 수정 중인 댓글의 내용은 별도 상태 사용
                      : comment.isSecret &&
                          userId !== comment.User.userId &&
                          postSellerId !== sellerId
                        ? '비밀 댓글입니다.' // 비밀 댓글일 경우
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
                  onClick={() => handleReplyToggle(comment.comId)}
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
            {/* 대댓글 입력창 */}
            {replyVisible[comment.comId] && (
              <div>
                <ul className="replt-list">
                  <li className="reply-input-wrap">
                    <div className="comment-wrap" onMouseDown={userCheck}>
                      <div className="user-wrap">
                        <img
                          src={profileImg || '/img/duck.jpg'}
                          className="user-img"
                        />
                        <h3 className="nickname">{nickname}</h3>
                      </div>
                      <div className="textarea-box">
                        <textarea
                          className="comment-text"
                          placeholder={
                            isReSecret
                              ? '비밀댓글 입니다'
                              : '댓글을 입력해주세요.'
                          }
                          value={replyText}
                          onChange={handleReplyChange}
                        />
                        <span className="char-count">{reCharCount} / 100</span>
                      </div>
                      <div className="comment-btn-wrap">
                        <label
                          className={`lock-comment ${isReSecret ? 'active' : ''}`}
                          htmlFor="reSecret"
                        >
                          <FontAwesomeIcon
                            icon={faLock}
                            className="lock-icon"
                          />
                          <input
                            type="checkbox"
                            id="reSecret"
                            checked={isReSecret}
                            onChange={toggleReSecret}
                          />
                          비밀 댓글
                        </label>
                        <button
                          className="comment-btn"
                          onClick={() => {
                            handleReplySubmit(comment.comId);
                          }}
                        >
                          등록
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}
            {/* 대댓글 등록 완료 */}
            <ul className="replies-wrap">
              {comment.replies.map((reply, replyIndex) => (
                <li key={replyIndex} className="reply-item">
                  <FontAwesomeIcon
                    icon={faArrowTurnUp}
                    className="re-reply-icon"
                  />
                  <div className="comment-item">
                    <div className="user-wrap">
                      <img
                        src={reply.User.profileImg || '/img/user.jpg'}
                        className="user-img"
                      />
                      <h3 className="nickname">
                        {reply.User.nickname}{' '}
                        {reply.isSecret && (
                          <FontAwesomeIcon
                            icon={faLock}
                            className="lock-icon"
                          />
                        )}
                      </h3>
                    </div>
                    <div className="text-box">
                      <textarea
                        className="comment-text"
                        value={
                          isEditing === reply.comId
                            ? editingCommentText // 수정 중인 댓글의 내용은 별도 상태 사용
                            : reply.isSecret &&
                                userId !== reply.User.userId &&
                                postSellerId !== sellerId
                              ? '비밀 댓글입니다.' // 비밀 댓글일 경우
                              : reply.comContent
                        }
                        onChange={(e) => setEditingCommentText(e.target.value)} // 수정 중인 댓글의 내용 변경
                        readOnly={isEditing !== reply.comId} // 수정 중인 댓글만 수정 가능하게
                        onKeyDown={(e) => handleKeyDown(e, comment.comId)}
                      />
                      <time>{formatDate(reply.createdAt)}</time>
                    </div>
                    <div className="comment-complete-btn">
                      {userId === reply.User.userId && (
                        <div className="comment-edit-wrap">
                          {isEditing === reply.comId ? (
                            <button
                              title="저장"
                              className="comment-edit-icon"
                              onClick={() => handleUpdateComment(reply.comId)}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                          ) : (
                            <>
                              <button
                                title="수정"
                                onClick={() =>
                                  handleEditComment(
                                    reply.comId,
                                    reply.comContent,
                                  )
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
                                  handleReplyDelete(reply.comId);
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
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
