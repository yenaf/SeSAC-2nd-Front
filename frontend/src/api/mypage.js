import axios from 'axios';

const url = `http://localhost:8080`;
const mypageRouter = `${url}/mypage`;

const getMypageData = async () =>
  await axios.get(`${mypageRouter}/`, { withCredentials: true });

const getEditUserInfoPageDate = async () =>
  await axios.get(`${mypageRouter}/editUser`, { withCredentials: true });

export { getMypageData, getEditUserInfoPageDate };
