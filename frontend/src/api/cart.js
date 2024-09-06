import axios from 'axios';

//const url = process.env.REACT_APP_API_URL;
const url = 'http://localhost:8080';

// 장바구니 조회
const getCartData = (userId) => axios.get(`${url}/cart/${userId}`);
// const getCartData = async (userId) => await axios.get(`${url}/cart/${userId}`);

// 장바구니 아이템 등록
// const insertCart = (postId) => axios.post(`${url}/cart/${postId}`);
const insertCart = (postId, data) =>
  axios.post(`${url}/cart/${postId}`, { userId: data });

// const getOrderData = async () => await axios.get(`${url}/order`);
// 결제하기 페이지
const getOrderData = () => axios.post(`${url}/order`);

// 결제페이지에서 결제하기 눌렀을 때
const postOrderData = async (data) => await axios.post(`${url}/orders`, data);

// 결제 완료 페이지 이동
const getOrderCompleteData = (allOrderId) =>
  axios.get(`${url}/order/complete/${allOrderId}`);

// 장바구니 아이템 삭제
const deleteCartData = (targetId) => axios.delete(`${url}/cart/${targetId}`);

export {
  getCartData,
  insertCart,
  deleteCartData,
  getOrderData,
  getOrderCompleteData,
  postOrderData,
};
