import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
