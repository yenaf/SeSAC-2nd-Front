import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faArrowTurnUp,
  faEraser,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import formatDate from '../components/common/formatDate';

export default function Comment({
  postId,
  userId,
  sessionSellerId,
  nickname,
  profileImg,
  Comments,
}) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [reCharCount, setReCharCount] = useState(0);
  const [isSecret, setIsSecret] = useState(false);
  const [activeReplyIndex, setActiveReplyIndex] = useState(null);

  // 상세페이지에서 뿌려주는 댓글데이터 담기
  useEffect(() => {
    if (Comments) {
      setComments(Comments);
    }
  }, [Comments]);

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

  // 비밀 댓글 토글
  const toggleSecret = () => {
    setIsSecret(!isSecret);
  };

  // 댓글 등록
  const handleSubmit = (e) => {
    axios({
      method: 'post',
      url: `http://localhost:8080/comments/${postId}`,
      data: {
        comContent: commentText,
        isSecret: isSecret,
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      if (commentText.trim()) {
        setComments([
          {
            User: {
              nickname: res.data.User.nickname,
              profileImg: res.data.User.profileImg || '/img/cat.png',
            },
            comContent: res.data.comContent,
            isDeleted: res.data.isDeleted,
            isSecret: res.data.isSecret,
            createdAt: res.data.createdAt,
            comId: res.data.comId,
            replies: [],
          },
          ...comments,
        ]);
        setCommentText('');
        setCharCount(0);
        setIsSecret(false);
      }
    });
  };

  const handleDeleteComment = async (comId) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      return;
    }
    try {
      const response = await axios({
        method: 'patch',
        url: `http://localhost:8080/comments/delete/${comId}`,
      });
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comId !== comId),
      );
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  // console.log(comments);

  // 대댓글 등록
  const handleReplySubmit = (index, comId) => {
    console.log(index, comId);

    if (replyText.trim()) {
      axios({
        method: 'post',
        url: `http://localhost:8080/comments/reply/${comId}`,
        data: {
          postId,
          userId,
          comContent: replyText,
          isSecret: false,
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          // comContent: '놉';
          // comId: 50;
          // createdAt: '2024-09-08T10:57:50.072Z';
          // isDeleted: false;
          // isSecret: false;
          // parentComId: '42';
          // postId: '4';
          // updatedAt: '2024-09-08T10:57:50.072Z';
          // userId: 1;

          // 서버에서 응답받은 대댓글 데이터 처리
          const updatedComments = [...comments];
          updatedComments[index].replies.push(res.data); // 서버에서 받은 대댓글 내용을 추가
          setComments(updatedComments);
          console.log(updatedComments);

          // setComments([
          //   {
          //     replies: [],
          //   },
          //   ...updatedComments,
          // ]);

          setReplyText('');
          setActiveReplyIndex(null);
        })
        .catch((error) => {
          console.error('대댓글 등록 실패:', error);
        });
    }
  };

  // postId, comContent, isSecret, userId
  // /reply/:comId
  const handleInputReply = (index) => {
    setActiveReplyIndex(index === activeReplyIndex ? null : index);
  };

  return (
    <section className="comment-container">
      <h2>댓글쓰기</h2>
      {/* 댓글등록 */}
      <div className="comment-wrap">
        <div className="user-wrap">
          <img src={profileImg || '/img/cat.png'} className="user-img" />
          <h3 className="nickname">{nickname}</h3>
        </div>
        <div className="textarea-box">
          <textarea
            className="comment-text"
            placeholder="댓글을 입력해주세요."
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
          <button className="comment-btn" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
      {/* <p>판매자와 소비자 보호를 위해 댓글 수정 또는 삭제는 불가합니다.</p> */}
      {/* 등록완료된 댓글 */}
      <div>
        <ul className="comment-complete-wrap">
          {comments
            .filter((comment) => !comment.isDeleted)
            .map((comment, index) => (
              <li key={index}>
                <div className="comment-item">
                  <div className="user-wrap">
                    <img src="/img/cat.png" className="user-img" />
                    <h3 className="nickname">{comment.User.nickname}</h3>
                  </div>
                  <div className="text-box">
                    <textarea
                      className="comment-text"
                      placeholder={comment.comContent}
                      readOnly
                    ></textarea>
                    {/* <p className="comment-text">{comment.comContent}</p> */}
                    <time>{formatDate(comment.createdAt)}</time>
                  </div>
                  <div className="comment-complete-btn">
                    <button
                      className="reply-btn"
                      onClick={() => handleInputReply(index, comment.comId)}
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
                      <button title="수정">
                        <FontAwesomeIcon
                          icon={faEraser}
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
                    </div>
                  )}
                </div>
                {/* 대댓글 입력창*/}
                <ul className="replt-list">
                  <li className="reply-input-wrap">
                    {activeReplyIndex === index && (
                      <div className="comment-wrap">
                        <div className="user-wrap">
                          <img src="/img/cat.png" className="user-img" />
                          <h3 className="nickname">{nickname}</h3>
                        </div>
                        <div className="textarea-box">
                          <textarea
                            className="comment-text"
                            placeholder="답글을 입력해주세요."
                            value={replyText}
                            onChange={handleReplyChange}
                          />
                          <span className="char-count">
                            {reCharCount} / 100
                          </span>
                        </div>
                        <div className="comment-btn-wrap">
                          <label className="lock-comment" htmlFor="secret">
                            <FontAwesomeIcon
                              icon={faLock}
                              className="lock-icon"
                            />
                            <input type="checkbox" id="secret" />
                            비밀 댓글
                          </label>
                          <button
                            className="comment-btn"
                            onClick={() =>
                              handleReplySubmit(index, comment.comId)
                            }
                          >
                            답글 등록
                          </button>
                        </div>
                      </div>
                    )}
                    {/* 대댓글 등록완료 */}
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
                                src={
                                  reply.User
                                    ? reply.User.profileImg || '/img/cat.png'
                                    : '/img/cat.png'
                                }
                                className="user-img"
                              />
                              <h3 className="nickname">
                                {reply.User ? reply.User.userName : 'Unknown'}
                              </h3>
                            </div>
                            <div className="text-box">
                              <p className="comment-text">{reply.comContent}</p>
                              <time>{formatDate(reply.createdAt)}</time>
                            </div>
                            <div className="comment-complete-btn"></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
