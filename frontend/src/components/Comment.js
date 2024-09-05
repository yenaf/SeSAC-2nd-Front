import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [activeReplyIndex, setActiveReplyIndex] = useState(null);

  useEffect(() => {
    setCharCount(commentText.length);
    if (commentText.length > 100) {
      setCommentText(commentText.slice(0, 100));
    }
  }, [commentText]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSubmit = () => {
    if (commentText.trim()) {
      setComments([...comments, { text: commentText, replies: [] }]);
      setCommentText('');
      setCharCount(0);
    }
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = (index) => {
    if (replyText.trim()) {
      const updatedComments = [...comments];
      updatedComments[index].replies.push(replyText);
      setComments(updatedComments);
      setReplyText('');
      setActiveReplyIndex(null);
    }
  };

  const handleInputReply = (index) => {
    setActiveReplyIndex(index === activeReplyIndex ? null : index);
  };

  return (
    <section className="comment-container">
      <h2>댓글쓰기</h2>
      {/* 댓글등록 */}
      <div className="comment-wrap">
        <div className="user-wrap">
          <img src="/img/cat.png" className="user-img" />
          <h3 className="nickname">닉네임유저아이디{''}</h3>
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
          <button className="lock-comment">
            <FontAwesomeIcon icon={faLock} className="lock-icon" />
            비밀 댓글
          </button>
          <button className="comment-btn" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
      {/* <p>판매자와 소비자 보호를 위해 댓글 수정 또는 삭제는 불가합니다.</p> */}
      {/* 등록완료된 댓글 */}
      <div>
        <ul className="comment-complete-wrap">
          {comments.map((comment, index) => (
            <li key={index}>
              <div className="comment-item">
                <div className="user-wrap">
                  <img src="/img/cat.png" className="user-img" />
                  <h3 className="nickname">닉네임유저아이디</h3>
                </div>
                <div className="text-box">
                  <p className="comment-text">{comment.text}</p>
                  <time>2024.09.05 15:08</time>
                </div>
                <div className="comment-complete-btn">
                  <button
                    className="reply-btn"
                    onClick={() => handleInputReply(index)}
                  >
                    <FontAwesomeIcon
                      icon={faArrowTurnUp}
                      className="reply-icon"
                    />
                    답글
                  </button>
                </div>
              </div>
              {/* 대댓글 입력창*/}
              <ul className="replt-list">
                <li className="reply-input-wrap">
                  {activeReplyIndex === index && (
                    <div className="comment-wrap">
                      <div className="user-wrap">
                        <img src="/img/cat.png" className="user-img" />
                        <h3 className="nickname">닉네임유저아이디{''}</h3>
                      </div>
                      <div className="textarea-box">
                        <textarea
                          className="comment-text"
                          placeholder="답글을 입력해주세요."
                          value={replyText}
                          onChange={handleReplyChange}
                        />
                        <span className="char-count">{charCount} / 100</span>
                      </div>
                      <div className="comment-btn-wrap">
                        <button className="lock-comment">
                          <FontAwesomeIcon
                            icon={faLock}
                            className="lock-icon"
                          />
                          비밀 댓글
                        </button>
                        <button
                          className="comment-btn"
                          onClick={() => handleReplySubmit(index)}
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
                            <img src="/img/cat.png" className="user-img" />
                            <h3 className="nickname">닉네임유저아이디</h3>
                          </div>
                          <div className="text-box">
                            <p className="comment-text">{reply}</p>
                            <time>2024.09.05 15:08</time>
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
