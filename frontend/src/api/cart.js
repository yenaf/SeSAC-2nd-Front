import axios from 'axios';

const loadCart = async (userId) =>
  await axios.get(`http://localhost:8080/cart/${userId}`);
