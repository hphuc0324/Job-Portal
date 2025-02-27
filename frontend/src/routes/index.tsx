import LoginPage from '@/pages/auth-pages/login';
import ProfilePage from '@/pages/personal-page/profile';
import RegisterPage from '@/pages/auth-pages/register';
import SocialCallback from '@/pages/auth-pages/social-callback';
import { Outlet } from 'react-router-dom';
import PrivateRoute from '@/components/router-component/private-route';
import UnauthorizedRoute from '@/components/router-component/unauthrozied-route';
import DefaultLayout from '@/components/layouts/default-layout';

export const publicRoutes = [
  {
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <>home</>,
      },
      {
        path: '/dashboard',
        element: (
          <>
            dashboard layout
            <Outlet />
          </>
        ),
        children: [
          {
            index: true,
            element: <>dashboard main</>,
          },
          {
            path: 'profile',
            element: <>profile</>,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <UnauthorizedRoute />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'google/callback',
        element: <SocialCallback />,
      },
    ],
  },
  {
    path: '/profile/:id',
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
    ],
  },
];

export const privateRoutes = [];
