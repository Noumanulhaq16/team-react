// routes
import { PATH_SALEMAN } from '../../../routes/paths';
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
  banking: getIcon('ic_kanban'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_banking'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  company: getIcon('ic_company'),
  location: getIcon('ic_location'),
  task: getIcon('ic_ourtask'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Dashboard', path: PATH_SALEMAN.general.dashboard, icon: ICONS.dashboard },

    

    ],
  },
];

export default navConfig;
