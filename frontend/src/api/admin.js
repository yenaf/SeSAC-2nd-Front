import axios from 'axios';

const url = 'http://localhost:8080/admin';

// 회원 조회
const getUsers = () => axios.get(`${url}/users`, { withCredentials: true });

export { getUsers };
