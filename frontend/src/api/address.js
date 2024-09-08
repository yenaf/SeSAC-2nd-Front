import axios from 'axios';

const url = `http://localhost:8080/addresses`;

// 회원 배송지 목록 조회
const getAddressList = () =>
  axios.get(`${url}/list`, { withCredentials: true });

// 배송지 등록
const insertAddress = (data) =>
  axios.post(`${url}`, data, { withCredentials: true });

export { getAddressList };
