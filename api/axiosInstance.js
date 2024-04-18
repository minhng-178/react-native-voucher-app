import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://20.243.125.223:3000/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  response => {
    if (response.config.url === '/login' && response.status === 200) {
      const tokens = response.data.tokens;

      //   console.log('Access token:', tokens.access.token);
      //   console.log('Refresh token:', tokens.refresh.token);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
