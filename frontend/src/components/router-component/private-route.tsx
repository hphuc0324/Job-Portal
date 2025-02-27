import useAuth from '@/hooks/use-auth';
import { Roles } from '@/types/schemas/register';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  allowedRoles?: Roles[];
}

function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const auth = useAuth();
  const path = window.location.pathname;

  if (!auth?.user) {
    console.log(auth?.user);
    const redirectUrl = encodeURIComponent(path);

    return <Navigate to={`/auth/login?redirect_url=${redirectUrl}`} />;
  } else {
    if (allowedRoles && !allowedRoles?.includes(auth.user?.role)) {
      return <Navigate to="/404" />;
    }
  }

  return <Outlet />;
}

export default PrivateRoute;
