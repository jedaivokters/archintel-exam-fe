import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  install(Vue) {
    Vue.prototype.$api = apiClient;

    // Optional: You can add interceptors here
    apiClient.interceptors.request.use(
      (config) => {
        // Modify request config before sending
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return error;
      }
    );
  },
};