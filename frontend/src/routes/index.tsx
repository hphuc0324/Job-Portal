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
];

export const privateRoutes = [];
