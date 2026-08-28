import axios from 'axios';

export const api = axios.create({
    // URL base de la API
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => { // agrega el token a cada petición
  const token = sessionStorage.getItem('boxful_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) { // si el token expiró, cerramos la sesión
      sessionStorage.removeItem('boxful_token');
    }

    return Promise.reject(error);
  },
);