import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_ADMIN, PATH_AGENT, PATH_SALEMAN, PATH_SUPERADMIN } from '../routes/paths';
// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  // console.log(useAuth())
  // console.log('role', user)
  if (isAuthenticated) {
    if (user?.role === 'superadmin') {
      return <Navigate to={PATH_SUPERADMIN.root} />;
    }
    if (user?.role === 'admin') {
      return <Navigate to={PATH_ADMIN.root} />;
    }
    if (user?.role === 'customer') {
      return <Navigate to={PATH_AGENT.root} />;
    }
    if (user?.role === 'contractor') {
      return <Navigate to={PATH_SALEMAN.root} />;
    }
  }

  return <>{children}</>;
}
