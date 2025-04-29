import axios from 'axios';
import { refreshAccessToken } from './auth/auth.js';

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BACKEND_URL,
  withCredentials: true,
});

export const getToken = (keyToken) => sessionStorage.getItem(keyToken);
export const setToken = (keyToken, valueToken) => sessionStorage.setItem(keyToken, valueToken);
export const removeToken = (keyToken) => sessionStorage.removeItem(keyToken);

// https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios
API.defaults.headers.common['Content-Type'] = 'application/json';

// Request interceptor to include access token in headers
API.interceptors.request.use(
  (config) => {
    const accessToken = getToken('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle token expiration and refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 403 &&
      error.response?.data?.error === 'Token expired' &&
      !error.config.__isRetryRequest
    ) {
      error.config.__isRetryRequest = true;

      try {
        const newAccessToken = await refreshAccessToken();
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error('Token refresh failed');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
