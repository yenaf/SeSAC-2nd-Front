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

export { userLogin, userLogout };
