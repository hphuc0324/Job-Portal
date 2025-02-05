import { LoginFormSchemaType } from '@/types/schemas/login';
import axiosClient from './api-client';

const baseURL = '/auth';

const authApi = {
  login: (data: LoginFormSchemaType) => {
    return axiosClient.post(`${baseURL}/login`, data);
  },
};

export default authApi;
