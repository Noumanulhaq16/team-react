import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import SuperAdminLayout from '../layouts/superadmin';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import AdminLayout from '../layouts/admin';
import AgentLayout from '../layouts/agent';
import SalesManLayout from '../layouts/saleman';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
// import { PATH_AFTER_LOGIN } from '../config';
// eslint-disable-next-line import/named
import { PATH_AFTER_ADMIN_LOGIN, PATH_AFTER_AGENT_LOGIN, PATH_AFTER_CONTRACTOR_LOGIN, PATH_AFTER_SUPERADMIN_LOGIN, PATH_AFTER_TECHNICIAN_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <>
      <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard/dashboard')} />}>
        <Component {...props} />
      </Suspense>
    </>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'admin',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <AdminLogin />
            </GuestGuard>
          ),
        },
        // Admin Routes
        {
          path: 'panel',
          element: (
            <AuthGuard>
              <AdminLayout />
            </AuthGuard>
          ),
          children: [
            { element: <Navigate to={PATH_AFTER_ADMIN_LOGIN} replace />, index: true },
            { path: 'dashboard', element: <AdminDashboard /> },
          ],
        },
      ],
    },

    // Agent Auth
    {
      path: 'agent',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <CustomerLogin />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
        // Customer Routes
        {
          path: 'panel',
          element: (
            <AuthGuard>
              <AgentLayout />
            </AuthGuard>
          ),
          children: [
            { element: <Navigate to={PATH_AFTER_AGENT_LOGIN} replace />, index: true },
            { path: 'dashboard', element: <CustomerDashboard /> },
          ],
        },
      ],
    },

    // Contractor Auth
    {
      path: 'salesman',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <ContractorLogin />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <ConRegister />
            </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ConResetPassword /> },
        { path: 'new-password', element: <ConNewPassword /> },
        { path: 'verify', element: <ConVerifyCode /> },
        // Contractor Routes
        {
          path: 'panel',
          element: (
            <AuthGuard>
              <SalesManLayout />
            </AuthGuard>
          ),
          children: [
            { element: <Navigate to={PATH_AFTER_CONTRACTOR_LOGIN} replace />, index: true },
            { path: 'dashboard', element: <ContractorDashboard /> },
          ],
        },
      ],
    },

    // SuperAdmin Auth
    {
      path: 'superadmin',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <SuperAdminLogin />
            </GuestGuard>
          ),
        },
        // Super Admin Routes
        {
          path: 'panel',
          element: (
            <AuthGuard>
              <SuperAdminLayout />
            </AuthGuard>
          ),
          children: [
            { element: <Navigate to={PATH_AFTER_SUPERADMIN_LOGIN} replace />, index: true },
            { path: 'dashboard', element: <SuperDashboard /> },
            { path: 'agentapproval', element: <SACustomerApproval /> },
            { path: 'salemanapproval', element: <ContractorApproval /> },
          ],
        },
      ],
    },
    // SuperAdmin Routes


    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },

      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

//  Authentication
const AdminLogin = Loadable(lazy(() => import('../pages/auth/AdminLogin')));
const CustomerLogin = Loadable(lazy(() => import('../pages/auth/AgentLogin')));
const ContractorLogin = Loadable(lazy(() => import('../pages/auth/SaleManLogin')));
const SuperAdminLogin = Loadable(lazy(() => import('../pages/auth/SuperAdminLogin')));
const Register = Loadable(lazy(() => import('../pages/auth/AgentRegister')));
const ConRegister = Loadable(lazy(() => import('../pages/auth/SaleManRegister')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/AgentResetPassword')));
const ConResetPassword = Loadable(lazy(() => import('../pages/auth/SaleManrResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/AgentNewPassword')));
const ConNewPassword = Loadable(lazy(() => import('../pages/auth/SaleManNewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/AgentVerifyCode')));
const ConVerifyCode = Loadable(lazy(() => import('../pages/auth/SaleManVerifyCode')));
const HomePage = Loadable(lazy(() => import('../pages/Home')));

// Admin
const AdminDashboard = Loadable(lazy(() => import('../pages/admin/Dashboard')));

// Customer
const CustomerDashboard = Loadable(lazy(() => import('../pages/agents/Dashboard')));



// Contractor
const ContractorDashboard = Loadable(lazy(() => import('../pages/saleman/Dashboard')));

// Super Admin
const SuperDashboard = Loadable(lazy(() => import('../pages/superadmin/Dashboard')));
const SACustomerApproval = Loadable(lazy(() => import('../pages/superadmin/CustomerApproval')));
const ContractorApproval = Loadable(lazy(() => import('../pages/superadmin/ContractorApproval')));
// Main
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
