// import axios from 'axios';
// import { authStore } from '@/stores/authStore';
 
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
//   headers: {
//     Accept: 'application/json',
    
//   },
// });
// //Interceptor – chặn request trước khi gửi đi
// api.interceptors.request.use(config => {
//   const token = authStore.getState().token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
import axios from 'axios';
import { authStore } from '@/stores/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

// Danh sách API KHÔNG cần token
const PUBLIC_ENDPOINTS = [
  '/api/products',
  '/api/categories',
];

api.interceptors.request.use(config => {
  const token = authStore.getState().token;
  const url = config.url || '';

  const isPublic = PUBLIC_ENDPOINTS.some(endpoint =>
    url.startsWith(endpoint)
  );

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
