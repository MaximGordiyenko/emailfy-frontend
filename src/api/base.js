import axios from 'axios';
import { getRefreshToken } from './auth/auth.js';
import store from '../store/store.ts';

const BASE_URL = 'http://localhost:4001';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios
authApi.defaults.headers.common['Content-Type'] = 'application/json';

// Add a request interceptor to attach the access token to every request
authApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle expired tokens
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await store?.dispatch(getRefreshToken());
      const newToken = sessionStorage.getItem('accessToken');
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }
    return Promise.reject(error);
  },
);
