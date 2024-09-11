import axios from 'axios';

const url = `http://localhost:8080/wishlist`;

// 찜등록
const insertWish = (wishData) => axios.post(`${url}`, wishData);

// 찜삭제
const deleteWish = (wishId) => axios.delete(`${url}/${wishId}`);

export { insertWish, deleteWish };
