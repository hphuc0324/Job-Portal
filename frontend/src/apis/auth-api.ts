import { LoginFormSchemaType } from '@/types/schemas/login';
import axiosClient from './api-client';
import { RegisterFormSchemaType } from '@/types/schemas/register';

const baseURL = '/auth';

const authApi = {
  login: (data: LoginFormSchemaType) => {
    return axiosClient.post(`${baseURL}/login`, data);
  },

  register: (data: RegisterFormSchemaType) => {
    return axiosClient.post(`${baseURL}/register`, data);
  },
};

export default authApi;
