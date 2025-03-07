import axios from 'axios';

const apiAxios = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/api`
    : '/api',
  withCredentials: true,
});

export default apiAxios;
