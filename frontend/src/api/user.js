import axios from 'axios';

// const url = `http://localhost:8080`;
const url = `${process.env.REACT_APP_API_URL}/api`;

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

// 닉네임 중복체크
const checkNickAtServer = async (nickname) =>
  await axios.post(`${url}/user/checkNickname`, {
    nickname,
  });

// 회원정보 수정
const updateUserInfo = async (userId, data) =>
  await axios.patch(`${url}/user/${userId}`, data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// 회원가입
const userRegister = (data) => axios.post(`${url}/user/register`, data);

// 아이디 중복 체크
const checkId = (loginId) =>
  axios.post(`${url}/user/checkLoginid`, { loginId });

export {
  userLogin,
  userLogout,
  checkNickAtServer,
  updateUserInfo,
  checkId,
  userRegister,
};
