import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/home/Home';
import NetWorks from './pages/netWorks/NetWorks';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/netWorks',
    element: <NetWorks />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin/social',
    element: <Admin />,
  },
]);

export { router };