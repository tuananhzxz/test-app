import axios from "axios"

export const API_URL = "http://localhost:8080"

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('sellerToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Handle response errors globally
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('sellerToken');
        delete api.defaults.headers.common['Authorization'];
      }
      return Promise.reject(error);
    }
  );