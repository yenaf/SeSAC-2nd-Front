import axios from 'axios';

const url = `http://localhost:8080`;
const postRouter = `${url}/posts`;

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
  await axios.post(`http://localhost:8080/complaints`, data);

const getPostforEdit = async (postId) =>
  await axios.get(`${postRouter}/${postId}`, { withCredentials: true });

const patchPost = async (postId, data) =>
  await axios.patch(`${postRouter}/${postId}`, data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export { insertPost, getPost, insertComplaint, getPostforEdit, patchPost };
