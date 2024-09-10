import axios from 'axios';

const url = `http://localhost:8080`;
const sellerRouter = `${url}/sellers`;

const postSellerData = async (formData) =>
  await axios.post(`${sellerRouter}/`, formData, {
    withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const patchSellerData = async (formData, sellerId) =>
  await axios.patch(`${sellerRouter}/${sellerId}`, formData, {
    withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const getSellerData = async (sellerId) =>
  await axios.get(`${sellerRouter}/${sellerId}`, {
    withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
  });

export { postSellerData, patchSellerData, getSellerData };
