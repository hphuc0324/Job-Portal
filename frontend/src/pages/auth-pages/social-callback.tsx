import useAuth from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SocialCallback() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleCallback = async () => {
    const path = location.pathname;
    const search = new URLSearchParams(location.search);

    if (path === '/auth/google/callback') {
      const code = search.get('code');
      const role = search.get('state');

      if (!code) {
        navigate('/auth/login');
      }

      const success = await auth?.socialCallback(code ?? '', 'google', role);
      if (!success) {
        if (auth?.error?.status === 400) {
          navigate('/auth/login');
        } else {
          navigate('/auth/register');
        }
      } else {
        const search = new URLSearchParams(location.search);
        const redirectUrl = search.get('redirect');

        navigate(redirectUrl ? decodeURIComponent(redirectUrl) : '/');
      }
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

  return <Loader2 className="animate-spin" />;
}

export default SocialCallback;
