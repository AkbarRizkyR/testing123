// axios.js
import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'http://159.223.57.121:8090',
});

instance.interceptors.request.use((config) => {
  const token = store.state.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
