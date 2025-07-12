import axios from 'axios';

// Create Axios instance
const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://lol-ijabdk6qs-rajat-kashyaps-projects.vercel.app/api'
    : 'http://localhost:5000/api'
});

// Add Authorization token to each request if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or get from Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global error handler (for alerts/logging)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can use toast here if needed: toast.error(error.response?.data?.message)
    console.error('❌ API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
