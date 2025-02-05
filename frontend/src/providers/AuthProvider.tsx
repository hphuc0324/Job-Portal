import authApi from '@/apis/auth-api';
import { LoginFormSchemaType } from '@/types/schemas/login';
import { RegisterFormSchemaType } from '@/types/schemas/register';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
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
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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

  return <AuthContext.Provider value={{ user, login, register, error }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
