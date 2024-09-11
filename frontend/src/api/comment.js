import axios from 'axios';

// const api_url = process.env.REACT_APP_API_URL;
// // const url = `${url}/comments`;
// const url = 'http://localhost:8080/comments';
const url = `${process.env.REACT_APP_API_URL}/api/comments`;

// 댓글 조회
const getComment = (postId) =>
  axios.get(`${url}/list/${postId}`, { withCredentials: true });

// 댓글 등록
const submitComment = (postId, commentText, isSecret) =>
  axios.post(
    `${url}/${postId}`,
    { comContent: commentText, isSecret },
    { withCredentials: true },
  );

// 댓글 삭제
const deleteComment = (comId) =>
  axios.patch(`${url}/delete/${comId}`, { withCredentials: true });

// 댓글 수정
const updateComment = (comId, editingCommentText, isSecret) =>
  axios.patch(
    `${url}/update/${comId}`,
    { comContent: editingCommentText, isSecret: isSecret },
    {
      withCredentials: true,
    },
  );

// 대댓글 등록
const replyCommentSubmit = (comId, postId, replyText, isReSecret) =>
  axios.post(
    `${url}/reply/${comId}`,
    { postId: postId, comContent: replyText, isSecret: isReSecret },
    {
      withCredentials: true,
    },
  );

// 대댓글 삭제
const replyCommentDelete = (comId) =>
  axios.patch(`${url}/reply/delete/${comId}`, { withCredentials: true });

export {
  getComment,
  submitComment,
  deleteComment,
  updateComment,
  replyCommentSubmit,
  replyCommentDelete,
};
