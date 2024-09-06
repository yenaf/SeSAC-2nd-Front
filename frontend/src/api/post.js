import axios from 'axios';

const postRouter = `http://localhost:8080/posts`;

const insertPost = async (data) =>
  await axios.post(`${postRouter}/create`, data);

const getPost = async (postId) =>
  await axios.get(`http://localhost:8080/posts/${postId}`);

export { insertPost, getPost };
