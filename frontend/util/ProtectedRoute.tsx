import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';
import { Role } from 'Frontend/models/Role';

interface ProtectedRouteProps {
  rolesAllowed?: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rolesAllowed = [] }) => {
  const { state } = useAuth();
  const { initializing, user } = state;

  if (initializing) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (rolesAllowed.length > 0 && !rolesAllowed.some(role => user.roles.includes(role))) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
