import axios from 'axios';

// const url = `http://localhost:8080`;
const url = process.env.REACT_APP_API_URL;
const sellerRouter = `${url}/api/sellers`;

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
