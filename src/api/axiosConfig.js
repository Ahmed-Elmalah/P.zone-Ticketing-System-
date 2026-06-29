import axios from 'axios';
import qs from 'qs'; // Import qs library for nesting params
// ------------------------------------------------------------------
// axiosConfig.js
// ------------------------------------------------------------------
// This file sets up the base Axios instance for our application.
// It automatically attaches the JWT token to every request and 
// handles unauthorized (401) errors globally.
// ------------------------------------------------------------------

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { encodeValuesOnly: true });
  },
});

// Request Interceptor: Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('jwt-token') || localStorage.getItem('jwt-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global Errors (like 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      console.error("Unauthorized! Token might be expired.");
      // Optional: you can trigger a logout function here, e.g., redirect to /login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
