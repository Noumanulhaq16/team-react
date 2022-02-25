// routes
import { PATH_ADMIN } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  company: getIcon('ic_company'),
  contact: getIcon('ic_contact'),
  location: getIcon('ic_location'),
  credential: getIcon('ic_credential'),
  asset: getIcon('ic_asset'),
  feedback: getIcon('ic_feedback'),
  approval: getIcon('ic_approval'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Dashboard', path: PATH_ADMIN.general.dashboard, icon: ICONS.dashboard },
    ],
  },
];

export default navConfig;
