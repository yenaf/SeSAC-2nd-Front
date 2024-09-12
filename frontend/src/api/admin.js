import axios from 'axios';

// const url = 'http://localhost:8080/api/admin';
// const api_url = process.env.REACT_APP_API_URL;
const api_url = process.env.REACT_APP_API_URL;
// const url = `${api_url}/admin`;
const url = `${api_url}/api/admin`;

// 회원 조회
const getUsers = () => axios.get(`${url}/allUser`, { withCredentials: true });

// 판매자 조회
const getSellers = () => axios.get(`${url}/seller`, { withCredentials: true });

// 신고글 조회 페이지 이동
const getComplaint = (sellId) =>
  axios.get(`${url}/complaint/${sellId}`, { withCredentials: true });

// 블랙리스트 관리 페이지 이동
const getBlacklist = () =>
  axios.get(`${url}/blacklist`, { withCredentials: true });

// 블랙리스트 추가
const updateBlacklist = (userId) =>
  axios.patch(`${url}/blacklist`, userId, { withCredentials: true });

// 거래내역 조회 페이지 이동
const getOrderLogs = () =>
  axios.get(`${url}/orderlogs`, { withCredentials: true });

export {
  getUsers,
  getSellers,
  getComplaint,
  getBlacklist,
  updateBlacklist,
  getOrderLogs,
};
