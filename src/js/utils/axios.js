import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050',
});

api.interceptors.request.use(setAuthHeader)

function setAuthHeader(config) {
  const token = localStorage.getItem('expense');
  if (token) {
    config.headers['Authorization'] = token;
  }

  return config
}

export default api;
