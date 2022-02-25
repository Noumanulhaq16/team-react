import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  if (!isInitialized) {
    return <LoadingScreen />;
  }
  const UserRole = localStorage.getItem('userRole');
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    if (UserRole === 'superadmin') {
      return <Navigate to={'/superadmin/login'} />
    }
    if (UserRole === 'admin') {
      return <Navigate to={'/admin/login'} />
    }
    if (UserRole === 'customer') {
      return <Navigate to={'/agent/login'} />
    }
    if (UserRole === 'contractor') {
      return <Navigate to={'/agent/login'} />
    }
    if (UserRole === 'technician') {
      return <Navigate to={'/technician/login'} />
    }
    return <Navigate to={'/'} />
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
