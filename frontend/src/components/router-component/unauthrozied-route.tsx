import useAuth from '@/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

function UnauthorizedRoute() {
  const auth = useAuth();

  if (auth?.user) {
    console.log(auth?.user);
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default UnauthorizedRoute;
