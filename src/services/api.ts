import axios from 'axios';

const api = axios.create({
  baseURL: '', // Handled by Vite proxy during dev
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('linq_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('linq_admin_token');
      localStorage.removeItem('linq_admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
