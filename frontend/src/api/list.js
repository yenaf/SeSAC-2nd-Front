import axios from 'axios';
// const url = process.env.REACT_APP_API_URL;
const url = 'http://localhost:8080';

const getPostLists = (page, categoryId, order) => {
  return axios.get(`${url}/posts/list/${page}/${categoryId}?order=${order}`);
};

const getSearchLists = (page, keyword) => {
  return axios.get(`${url}/posts/list/${page}?postTitle=${keyword}`);
};

export { getPostLists, getSearchLists };
