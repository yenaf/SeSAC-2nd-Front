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
  await axios.get(`${postRouter}/page/${postId}`);

const insertComplaint = async (data) =>
  await axios.post(`http://localhost:8080/complaints`, data);

export { insertPost, getPost, insertComplaint };
