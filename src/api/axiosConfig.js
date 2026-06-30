import axios from 'axios';
import qs from 'qs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress (no spinner, just the top bar)
NProgress.configure({ showSpinner: false, minimum: 0.2 });

// Use relative path '/api' in production so Vercel's rewrite rules catch it
// Otherwise use localhost for local development if VITE_API_URL isn't set
const isProd = import.meta.env.PROD;
const BASE_URL = import.meta.env.VITE_API_URL || (isProd ? '/api' : 'http://localhost:1337/api');

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { encodeValuesOnly: true });
  },
});

// Counter to handle concurrent requests
let activeRequests = 0;

// Request Interceptor: Attach Token & Start Progress
axiosInstance.interceptors.request.use(
  (config) => {
    if (activeRequests === 0) {
      NProgress.start();
    }
    activeRequests++;

    const token = sessionStorage.getItem('jwt-token') || localStorage.getItem('jwt-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) {
      NProgress.done();
    }
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global Errors & Stop Progress
axiosInstance.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) {
      NProgress.done();
    }
    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) {
      NProgress.done();
    }
    
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Token might be expired.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
