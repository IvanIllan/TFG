import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default httpClient;