import { Navigate, Outlet } from 'react-router';

const PublicRoute = ({ onlyLoggedOut = false }) => {
  const accessToken = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user'));

  // ✅ If route is only for logged out users (login/register)
  if (onlyLoggedOut) {
    // If user is logged in, redirect to appropriate dashboard
    if (accessToken && user) {
      if (user.role === 'admin') {
        return <Navigate to="/admin-dashboard" replace />;
      }
      return <Navigate to="/user-dashboard" replace />;
    }
    // If not logged in, show login/register page
    return <Outlet />;
  }

  // ✅ For regular public routes (home, about, contact)
  // These are accessible to everyone regardless of login status
  return <Outlet />;
};

export default PublicRoute;
