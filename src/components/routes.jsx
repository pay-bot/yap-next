import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuthenticated = useSelector((state) => state.authReducer);
  return <>{isAuthenticated?.adminToken ? <Outlet /> : <Navigate to="/login" />};</>;
}
