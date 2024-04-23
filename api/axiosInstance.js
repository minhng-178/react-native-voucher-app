import axios from 'axios';
import { asyncStorage } from '../utils/asyncStorage';
import { baseURL, refreshTokenPath } from './endpoint';

const defaultHeader = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: defaultHeader,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Add a request interceptor
instance.interceptors.request.use(
  async config => {
    const token = await asyncStorage.getAccessToken();

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async response => {
    if (response.config.url === '/login' && response.status === 200) {
      const tokens = response.data.tokens;

      await asyncStorage.setToken(tokens.access.token);
      await asyncStorage.setRefreshToken(tokens.refresh.token);
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(function (token) {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosClient.request(originalRequest);
          })
          .catch(function (err) {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = await asyncStorage.getRefreshToken();

      return new Promise(function (resolve, reject) {
        console.log('post refresh token');
        axios
          .post(
            baseURL + refreshTokenPath,
            { refreshToken: refreshToken },
            {
              headers: defaultHeader,
            },
          )
          .then(async function (res) {
            const tokens = res.data.tokens;

            // 1) put token to LocalStorage
            await asyncStorage.setToken(tokens.access.token);
            if (tokens && tokens.refresh.token) {
              await asyncStorage.setRefreshToken(tokens.refresh.token);
            }

            // 2) Change Authorization header
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + data.accessToken;
            originalRequest.headers['Authorization'] =
              'Bearer ' + data.accessToken;

            processQueue(null, tokens.access.token);

            // 3) return originalRequest object with Axios
            resolve(instance.request(originalRequest));
          })
          .catch(function (err) {
            const status = err.response.status;
            const data = err.response.data;

            if (status === 404) {
              clearAuthToken();
            }
            if (data && data.error.errorCode === 'REFRESH_TOKEN_INVALID') {
              clearAuthToken();
            }

            processQueue(err, null);
            reject(err);
          })
          .finally(function () {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(handleError(error));
  },
);

const handleError = error => {
  const { data } = error.response;

  console.error(error);
  return data;
};

const clearAuthToken = async () => {
  await asyncStorage.clearToken();
};

export default instance;
