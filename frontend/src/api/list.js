import axios from 'axios';

// const url = process.env.REACT_APP_API_URL;
// const url = 'http://localhost:8080';
const url = `${process.env.REACT_APP_API_URL}/api`;

const getMainList = () => {
  return axios.get(`${url}/main`);
};

// 상품 목록 페이지
const getPostLists = (page, categoryId, order) => {
  return axios.get(`${url}/posts/list/${page}/${categoryId}?order=${order}`);
};

// 검색 결과 페이지
const getSearchLists = (page, keyword) => {
  return axios.get(`${url}/posts/list/${page}?postTitle=${keyword}`);
};

export { getMainList, getPostLists, getSearchLists };
