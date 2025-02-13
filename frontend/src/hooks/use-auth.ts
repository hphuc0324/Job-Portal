import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';

const useAuth = () => {
  if (!AuthContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const auth = useContext(AuthContext);

  return auth;
};

export default useAuth;
