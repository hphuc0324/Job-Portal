import axiosClient, { CustomAxiosRequestConfig } from '@/apis/api-client';
import authApi from '@/apis/auth-api';
import { LoginFormSchemaType } from '@/types/schemas/login';
import { RegisterFormSchemaType, Roles } from '@/types/schemas/register';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useLayoutEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: Roles;
}

interface AuthError {
  status: number | null;
  message: string | null;
}

interface AuthContextType {
  user: User | null;
  error: AuthError | null;
  login: (data: LoginFormSchemaType) => void;
  register: (data: RegisterFormSchemaType) => void;
  socialCallback: (code: string, loginType: 'google' | 'github', role: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '{}') : null,
  );
  const [error, setError] = useState<AuthError | null>(null);

  const login = async (data: LoginFormSchemaType) => {
    try {
      const res = await authApi.login(data);

      const result = res.data;

      setUser(result.data.user);
      setError(null);

      localStorage.setItem('user', JSON.stringify(result.data.user));
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('refreshToken', result.data['refresh-token']);

      return true;
    } catch (error: AxiosError | any) {
      setError({ status: error.status, message: '' });
      if (error.response) {
        setError((prev) => ({ status: prev?.status ?? null, message: error.response.data?.message }));
      }

      return false;
    }
  };

  const register = async (data: RegisterFormSchemaType) => {
    try {
      await authApi.register(data);

      setError(null);

      return true;
    } catch (error: AxiosError | any) {
      setError({ status: error.status, message: '' });
      if (error.response) {
        setError((prev) => ({ status: prev?.status ?? null, message: error.response.data?.message }));
      }

      return false;
    }
  };

  const socialCallback = async (code: string, loginType: 'google' | 'github', role: string | null) => {
    try {
      const res = await authApi.socialCallback(code, loginType, role);

      const result = res.data;

      setUser(result.data.user);
      setError(null);

      localStorage.setItem('user', JSON.stringify(result.data.user));
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('refreshToken', result.data['refresh-token']);

      return true;
    } catch (error: AxiosError | any) {
      setError({ status: error.status, message: '' });
      if (error.response) {
        setError((prev) => ({ status: prev?.status ?? null, message: error.response.data?.message }));
      }

      return false;
    }
  };

  useLayoutEffect(() => {
    const authInterceptor = axiosClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      const customConfig = config as CustomAxiosRequestConfig;

      customConfig.headers.Authorization =
        !customConfig._retry && token ? `Bearer ${token}` : customConfig.headers.Authorization;

      return customConfig;
    });

    return () => {
      axiosClient.interceptors.request.eject(authInterceptor);
    };
  }, [user]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.status === 401 && error.response.data.message === 'Invalid JWT token') {
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const res = await axiosClient.post('/auth/refresh-token', {
              'refresh-token': refreshToken,
            });
            const result = res.data;

            localStorage.setItem('token', result.data.token);
            localStorage.setItem('refreshToken', result.data['refresh-token']);

            originalRequest.headers.Authorization = `Bearer ${result.data.token}`;
            originalRequest._retry = true;

            return axiosClient(originalRequest);
          } catch (error) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            setUser(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosClient.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, error, socialCallback }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
