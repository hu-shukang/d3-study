import Page1 from '@/pages/page1';
import Page2 from '@/pages/page2';
import Page3 from '@/pages/page3';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '',
    element: <Navigate to={'/3'} />,
  },
  {
    path: '/1',
    element: <Page1 />,
  },
  {
    path: '/2',
    element: <Page2 />,
  },
  {
    path: '/3',
    element: <Page3 />,
  },
];

const Router = () => {
  const router = useRoutes(routes);
  return router;
};

export default Router;
