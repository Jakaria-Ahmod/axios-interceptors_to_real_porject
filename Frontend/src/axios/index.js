import axios from 'axios';

// main api instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/v1',
  withCredentials: true, // cookie পাঠানোর জন্য
});

// refresh api instance
const refreshApi = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/v1',
  withCredentials: true,
});

// Request interceptor → সব request এর সাথে access token যাবে
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    console.log('Interceptor token:', token);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor → 401 আসলে auto refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh API call
        const res = await refreshApi.post('/refresh');
        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          // save token in localStorage
          localStorage.setItem('accessToken', newAccessToken);

          // retry original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.error('Refresh token failed:', err);
        localStorage.removeItem('accessToken');
        // window.location.href = "/login"; // optional
      }
    }

    return Promise.reject(error);
  }
);

export default api;
