/**
 * api.ts
 * 统一封装axios实例，用于前端与后端RESTful接口通信
 */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001/api', // 根据实际后端接口地址调整
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器，可添加权限校验token
api.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器，统一错误处理
api.interceptors.response.use(
  response => response,
  error => {
    // 可以根据error.response.status做更细致的错误处理
    return Promise.reject(error);
  }
);

export default api;
