import axios from 'axios';

const url = `http://localhost:8080`;

// 로그인
const userLogin = (data) =>
  axios.post(`${url}/user/login`, data, {
    withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
  });

// 로그아웃
const userLogout = () =>
  axios.get(`${url}/user/logout`, {
    withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
  });

const checkNickAtServer = async (nickname) =>
  await axios.post(`${url}/user/checkNickname`, {
    nickname,
  });

const updateUserInfo = async (userId, data) =>
  await axios.patch(`${url}/user/${userId}`, data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export { userLogin, userLogout, checkNickAtServer, updateUserInfo };
