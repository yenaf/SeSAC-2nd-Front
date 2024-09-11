import axios from 'axios';

// const url = 'http://localhost:8080';
const url = `${process.env.REACT_APP_API_URL}/api`;

// 장바구니 조회
const getCartData = () => axios.get(`${url}/cart`, { withCredentials: true });

// 장바구니 아이템 등록
const insertCart = (postId, data) =>
  axios.post(`${url}/cart/${postId}`, data, { withCredentials: true });

// 결제하기 페이지 이동
const getOrderData = (data) =>
  axios.post(`${url}/order`, data, { withCredentials: true });

// 결제페이지에서 결제하기 눌렀을 때
const postOrderData = (data) =>
  axios.post(`${url}/orders`, data, { withCredentials: true });

// 결제 완료 페이지 이동
const getOrderCompleteData = (allOrderId) =>
  axios.get(`${url}/order/complete/${allOrderId}`, { withCredentials: true });

// 장바구니 아이템 삭제
const deleteCartData = (targetId) =>
  axios.delete(`${url}/cart/${targetId}`, { withCredentials: true });

export {
  getCartData,
  insertCart,
  deleteCartData,
  getOrderData,
  getOrderCompleteData,
  postOrderData,
};
