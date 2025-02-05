import LoginPage from '@/pages/auth-pages/login';
import RegisterPage from '@/pages/auth-pages/register';
import SocialCallback from '@/pages/auth-pages/social-callback';
import { Outlet } from 'react-router-dom';

export const publicRoutes = [
  {
    element: (
      <>
        default layout <Outlet />
      </>
    ),
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
];

export const privateRoutes = [];
