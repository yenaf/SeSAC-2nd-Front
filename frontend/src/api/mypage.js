import axios from 'axios';

const url = `http://localhost:8080`;
const mypageRouter = `${url}/mypage`;

const getMypageData = async () =>
  await axios.get(`${mypageRouter}/`, { withCredentials: true });

const getEditUserInfoPageDate = async () =>
  await axios.get(`${mypageRouter}/editUser`, { withCredentials: true });

const getOrderHistoryPageData = async () =>
  await axios.get(`${mypageRouter}/orderhistory`, { withCredentials: true });

const patchOrderHistoryConfirmData = async () =>
  await axios.patch(`${mypageRouter}/confirm`, { withCredentials: true });

const getSellHistoryPageData = async () =>
  await axios.get(`${mypageRouter}/saleHistory`, { withCredentials: true });

const patchSellHistoryInvoiceNumberData = async () =>
  await axios.patch(`${mypageRouter}/invoiceNumber`, { withCredentials: true });

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
