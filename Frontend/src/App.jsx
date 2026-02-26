import { createBrowserRouter, RouterProvider } from 'react-router';
import Rootcomponents from './RooComponents';
import AllUser from './pages/AllUser';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Hadith from './pages/Hadith';
import Collections from './pages/Collections';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Rootcomponents />,
      children: [
        // ✅ Public Routes - সবাই দেখতে পারবে
        // Login/Register শুধু logged out users দেখতে পারবে
        {
          element: <PublicRoute />,
          children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/contact', element: <Contact /> },
          ],
        },

        // ✅ Auth Routes - শুধু logged out users দেখতে পারবে
        // Login এবং Register শুধু logged out users দেখতে পারবে
        {
          element: <PublicRoute onlyLoggedOut />,
          children: [
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
          ],
        },

        // ✅ Protected Routes - শুধু login করা users দেখতে পারবে
        {
          element: <PrivateRoute />,
          children: [
            { path: '/user', element: <AllUser /> },
            { path: '/hadith', element: <Hadith /> },
            { path: '/collections', element: <Collections /> },
            { path: '/profile', element: <Profile /> },
          ],
        },

        // ✅ User Dashboard - শুধু user role
        {
          element: <PrivateRoute allowedRoles={['user']} />,
          children: [{ path: '/user-dashboard', element: <UserDashboard /> }],
        },

        // ✅ Admin Dashboard - শুধু admin role
        {
          element: <PrivateRoute allowedRoles={['admin']} />,
          children: [
            { path: '/admin-dashboard', element: <AdminDashboard /> },
            { path: '/admin/users', element: <AllUser /> },
            { path: '/admin/analytics', element: <div>Analytics Page</div> },
          ],
        },

        // 404 Page
        {
          path: '*',
          element: (
            <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-gray-600">
              404 - Page Not Found
            </div>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
