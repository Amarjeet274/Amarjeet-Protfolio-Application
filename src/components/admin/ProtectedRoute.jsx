import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');

  // No token - redirect to login
  if (!token) return <Navigate to="/admin/login" replace />;

  // Check if token is expired
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      // Token expired - remove it and redirect
      localStorage.removeItem('adminToken');
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    // Invalid token format - remove it and redirect
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}