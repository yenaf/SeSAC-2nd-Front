import axios from 'axios';

// const api_url = `http://localhost:8080`;
const api_url = process.env.REACT_APP_API_URL;
const url = `${api_url}/api/wishlist`;

// 찜등록
const insertWish = (wishData) =>
  axios.post(`${url}`, wishData, {
    withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
  });

// 찜삭제
const deleteWish = (wishId) =>
  axios.delete(`${url}/${wishId}`, {
    withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
  });

export { insertWish, deleteWish };
