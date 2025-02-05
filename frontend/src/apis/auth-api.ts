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

  socialLoginUrl: (loginType: 'google' | 'github') => {
    return axiosClient.get(`${baseURL}/social-login?login_type=${loginType}`);
  },

  socialCallback: (code: string, loginType: 'google' | 'githube') => {
    return axiosClient.get(`${baseURL}/social/callback?code=${code}&login_type=${loginType}`);
  },
};

export default authApi;
