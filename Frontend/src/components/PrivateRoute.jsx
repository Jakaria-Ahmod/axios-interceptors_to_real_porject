import { Navigate, Outlet } from 'react-router';

const PrivateRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = localStorage.getItem('accessToken');

  // Console log for debugging
  console.log('PrivateRoute - User:', user);
  console.log('PrivateRoute - Token:', accessToken);

  // Check if user is authenticated
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role (if roles are specified)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Unauthorized হলে home এ পাঠাবে
  }

  // User is authorized
  return <Outlet />;
};

export default PrivateRoute;
