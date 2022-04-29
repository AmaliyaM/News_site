const axios = require('axios');

const getInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

getInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    const configToken = config;
    if (token) {
      configToken.headers.Authorization = `Bearer ${token}`;
    }
    return configToken;
  },
  (error) => {
    Promise.reject(error);
  },
);

module.exports = getInstance;
