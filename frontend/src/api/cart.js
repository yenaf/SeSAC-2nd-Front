import axios from 'axios';

//const url = process.env.REACT_APP_API_URL;
const url = 'http://localhost:8080';

const getCartData = () => axios.get(`${url}/cart`);
// const getCartData = async (userId) => await axios.get(`${url}/cart/${userId}`);

// const getOrderData = async () => await axios.get(`${url}/order`);
const getOrderData = () => axios.get(`${url}/order`);

const postOrderData = async (data) => await axios.post(`${url}/orders`, data);

const getOrderCompleteData = (allOrderId) =>
  axios.get(`${url}/order/complete/${allOrderId}`);

const deleteCartData = (targetId) => axios.delete(`${url}/cart/${targetId}`);

export {
  getCartData,
  deleteCartData,
  getOrderData,
  getOrderCompleteData,
  postOrderData,
};
