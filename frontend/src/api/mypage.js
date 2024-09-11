import axios from 'axios';

// const url = `http://localhost:8080`;
// // const url = process.env.REACT_APP_API_URL;
// const mypageRouter = `${url}/mypage`;
const url = process.env.REACT_APP_API_URL;
const mypageRouter = `${url}/api/mypage`;

const getMypageData = async () =>
  await axios.get(`${mypageRouter}/`, { withCredentials: true });

const getEditUserInfoPageDate = async () =>
  await axios.get(`${mypageRouter}/editUser`, { withCredentials: true });

const getOrderHistoryPageData = async () =>
  await axios.get(`${mypageRouter}/orderhistory`, { withCredentials: true });

const patchOrderHistoryConfirmData = async (orderId, postId) =>
  await axios.patch(
    `${mypageRouter}/confirm`,
    { orderId, postId },
    { withCredentials: true },
  );

const getSellHistoryPageData = async () =>
  await axios.get(`${mypageRouter}/saleHistory`, { withCredentials: true });

const patchSellHistoryInvoiceNumberData = async (data) =>
  await axios.patch(`${mypageRouter}/invoiceNumber`, data, {
    withCredentials: true,
  });

const getPostListPageData = async () =>
  await axios.get(`${mypageRouter}/postlist`, { withCredentials: true });

const getWishListPageData = async () =>
  await axios.get(`${mypageRouter}/wishlist`, { withCredentials: true });

export {
  getMypageData,
  getEditUserInfoPageDate,
  getOrderHistoryPageData,
  patchOrderHistoryConfirmData,
  getSellHistoryPageData,
  patchSellHistoryInvoiceNumberData,
  getPostListPageData,
  getWishListPageData,
};
