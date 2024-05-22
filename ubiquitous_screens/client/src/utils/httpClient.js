import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default httpClient;