import axios from 'axios';
// const url = process.env.REACT_APP_API_URL;
const url = 'http://localhost:8080';

const getPostLists = (page, limit, categoryId) => {
  return axios.get(`${url}/posts/list/${page}/${limit}/${categoryId}`);
};

const getSearchLists = (page, limit, keyword) => {
  return axios.get(`${url}/posts/list/${page}/${limit}?postTitle=${keyword}`);
};

export { getPostLists, getSearchLists };
