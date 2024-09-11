import axios from 'axios';

// const url = `http://localhost:8080`;
// // const url = process.env.REACT_APP_API_URL;
// const postRouter = `${url}/posts`;
const url = process.env.REACT_APP_API_URL;
const postRouter = `${url}/api/posts`;

const writePost = () =>
  axios.get(`${postRouter}/create`, {
    withCredentials: true,
  });

const insertPost = async (data) =>
  await axios.post(`${postRouter}/create`, data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const getPost = async (postId) =>
  await axios.get(`${postRouter}/page/${postId}`, { withCredentials: true });

const insertComplaint = async (data) =>
  await axios.post(`${url}/api/complaints`, data);

const getPostforEdit = async (postId) =>
  await axios.get(`${postRouter}/${postId}`, { withCredentials: true });

const patchPost = async (postId, data) =>
  await axios.patch(`${postRouter}/${postId}`, data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const deletePost = (id) => axios.patch(`${postRouter}/delete/${id}`);

export {
  insertPost,
  getPost,
  insertComplaint,
  getPostforEdit,
  patchPost,
  deletePost,
  writePost,
};
