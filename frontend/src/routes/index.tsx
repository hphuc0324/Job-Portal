import LoginPage from '@/pages/auth-pages/login';
import ProfilePage from '@/pages/personal-pages/profile';
import RegisterPage from '@/pages/auth-pages/register';
import SocialCallback from '@/pages/auth-pages/social-callback';
import PrivateRoute from '@/components/router-component/private-route';
import UnauthorizedRoute from '@/components/router-component/unauthrozied-route';
import DefaultLayout from '@/components/layouts/default-layout';
import JobDetailsPage from '@/pages/common-pages/job-details';
import SearchJobsPage from '@/pages/common-pages/search-jobs';
import PostJob from '@/pages/employer-pages/post-job';
import { Roles } from '@/types/schemas/register';
import SearchTalentsPage from '@/pages/common-pages/search-talents';
import EmployerDashboard from '@/pages/employer-pages/employer-dashboard';
import EmployerDashboardLayout from '@/components/layouts/employer-dashboard-layout';
import EmployerJobPage from '@/pages/employer-pages/employer-job-page';
import HomePage from '@/pages/common-pages/home-page';

export const publicRoutes = [
  {
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/search',
        children: [
          {
            path: 'jobs',
            element: <PrivateRoute allowedRoles={[Roles.CANDIDATE]} />,
            children: [
              {
                index: true,
                element: <SearchJobsPage />,
              },
            ],
          },
          {
            path: 'talents',
            element: <PrivateRoute allowedRoles={[Roles.EMPLOYER]} />,
            children: [
              {
                index: true,
                element: <SearchTalentsPage />,
              },
            ],
          },
        ],
      },
      {
        path: '/dashboard',
        children: [
          {
            path: 'employer',
            element: <EmployerDashboardLayout />,
            children: [
              {
                index: true,
                element: <EmployerDashboard />,
              },
              {
                path: ':slug',
                element: <EmployerJobPage />,
              },
            ],
          },
        ],
      },
      {
        path: '/job/:slug',
        element: <JobDetailsPage />,
      },
      {
        path: '/post-job/:slug?',
        element: <PrivateRoute allowedRoles={[Roles.EMPLOYER]} />,
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
