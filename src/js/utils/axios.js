import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050',
});

api.interceptors.request.use(setAuthHeader)
api.interceptors.request.use(setHeader)
api.interceptors.response.use(serializeData)
api.interceptors.response.use(noop, handleOutdatedToken)

function setAuthHeader(config) {
  const token = localStorage.getItem('expense');
  if (token) {
    config.headers['Authorization'] = token;
  }

  return config
}

function serializeData(response) {
  return response.data
}

function handleOutdatedToken(err) {
  const { status } = err.response
  if (status === 401) {
    window.location = 'login.html';
    localStorage.removeItem('expense');
  }
  return Promise.reject(err);
}

function setHeader(config) {
  config.headers['Content-Type'] = 'application/json'
  return config
}

function noop(response) {
  return response
}

export default api;
