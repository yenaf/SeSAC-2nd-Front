import axios from 'axios';

const url = 'http://localhost:8080/admin';

// 회원 조회
const getUsers = () => axios.get(`${url}/allUser`, { withCredentials: true });

// 판매자 조회
const getSellers = () => axios.get(`${url}/seller`, { withCredentials: true });

// 신고글 조회 페이지 이동
const getComplaint = (sellId) =>
  axios.get(`${url}/complaint/${sellId}`, { withCredentials: true });

export { getUsers, getSellers, getComplaint };
