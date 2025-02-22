import axios, { InternalAxiosRequestConfig } from 'axios';

const endPoint = import.meta.env.VITE_API_END_POINT;

const axiosClient = axios.create({
  baseURL: endPoint,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export default axiosClient;
