import axios from 'axios';

// const api_url = `http://localhost:8080`;
const api_url = process.env.REACT_APP_API_URL;
const url = `${api_url}/api/wishlist`;

// 찜등록
const insertWish = (wishData) => axios.post(`${url}`, wishData);

// 찜삭제
const deleteWish = (wishId) => axios.delete(`${url}/${wishId}`);

export { insertWish, deleteWish };
