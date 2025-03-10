import LoginPage from '@/pages/auth-pages/login';
import ProfilePage from '@/pages/personal-pages/profile';
import RegisterPage from '@/pages/auth-pages/register';
import SocialCallback from '@/pages/auth-pages/social-callback';
import { Outlet } from 'react-router-dom';
import PrivateRoute from '@/components/router-component/private-route';
import UnauthorizedRoute from '@/components/router-component/unauthrozied-route';
import DefaultLayout from '@/components/layouts/default-layout';
import JobDetailsPage from '@/pages/common-pages/job-details';
import SearchJobsPage from '@/pages/common-pages/search-jobs';
import PostJob from '@/pages/employer-pages/post-job';
import { Roles } from '@/types/schemas/register';

export const publicRoutes = [
  {
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <>home</>,
      },
      {
        path: '/search',
        children: [
          {
            path: 'jobs',
            element: <SearchJobsPage />,
          },
        ],
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
      {
        path: '/job/:slug',
        element: <JobDetailsPage />,
      },
      {
        path: '/post-job/:slug?',
        element: <PrivateRoute allowedRoles={[Roles.CANDIDATE]} />,
        children: [
          {
            index: true,
            element: <PostJob />,
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
