import axios from 'axios';

const api = process.env.REACT_APP_API_URL;

const getCartData = (userId) => axios.get(`${api}/cart/${userId}`);
// const getCartData = async (userId) => await axios.get(`${api}/cart/${userId}`);

// const getOrderData = async () => await axios.get(`${api}/order`);
const getOrderData = () => axios.get(`${api}/order`);

const postOrderData = async (data) => await axios.post(`${api}/orders`, data);

const getOrderCompleteData = (allOrderId) =>
  axios.get(`${api}/order/complete/${allOrderId}`);

const deleteCartData = async (targetId) =>
  await axios.delete(`${api}/cart/${targetId}`);

export {
  getCartData,
  deleteCartData,
  getOrderData,
  getOrderCompleteData,
  postOrderData,
};
