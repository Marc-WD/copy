// src/services/api.js
import axios from 'axios';
import { useAuth } from '@/stores/auth';

// Vite env uses import.meta.env.VITE_*
// If VITE_API_URL is set (e.g. http://localhost:5000/api), use it; else default to '/api'
const baseURL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) 
  ? import.meta.env.VITE_API_URL 
  : '/api';

const api = axios.create({ baseURL });

// Attach token from reactive store on each request so it's always current
api.interceptors.request.use((config) => {
  try {
    const { state } = useAuth();
    if (state.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${state.token}`;
    }
  } catch (e) { /* ignore */ }
  return config;
}, (err) => Promise.reject(err));

export default api;
