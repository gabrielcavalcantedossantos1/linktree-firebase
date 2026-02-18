import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/home/Home';
import NetWorks from './pages/netWorks/NetWorks';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';

import { Private } from './routes/Private';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin/social',
    element: (
      <Private>
        <NetWorks />
      </Private>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
]);

export { router };
