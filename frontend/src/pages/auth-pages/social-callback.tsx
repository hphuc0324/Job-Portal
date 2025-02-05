import authApi from '@/apis/auth-api';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SocialCallback() {
  const navigate = useNavigate();

  const handleCallback = async () => {
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    try {
      if (path === '/auth/google/callback') {
        const code = search.get('code');

        if (!code) {
          navigate('/auth/login');
        }

        const res = await authApi.socialCallback(code ?? '', 'google');
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

  return (
    <>
      <Loader2 className="animate-spin" />
    </>
  );
}

export default SocialCallback;
