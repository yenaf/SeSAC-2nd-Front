import axios from 'axios';

// const url = `http://localhost:8080/api/addresses`;
const api_url = process.env.REACT_APP_API_URL;
const url = `${api_url}/api/addresses`;

// 회원 배송지 목록 조회
const getAddressList = () =>
  axios.get(`${url}/list`, { withCredentials: true });

// 배송지 등록
const insertAddress = (data) =>
  axios.post(`${url}`, data, { withCredentials: true });

// 배송지 조회
const getAddress = (addId) =>
  axios.get(`${url}/${addId}`, { withCredentials: true });

// 배송지 수정
const updateAddress = (addId, data) =>
  axios.patch(`${url}/${addId}`, data, { withCredentials: true });

// 배송지 삭제
const deleteAddress = (addId) =>
  axios.delete(`${url}/${addId}`, { withCredentials: true });

export {
  getAddressList,
  insertAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
