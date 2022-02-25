// routes
import { PATH_SUPERADMIN } from '../../../routes/paths';
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
    subheader: 'general',
    items: [
      { title: 'dashboard', path: PATH_SUPERADMIN.general.dashboard, icon: ICONS.dashboard },
      { title: 'Agent Approval', path: PATH_SUPERADMIN.general.customerapproval, icon: ICONS.approval },
      { title: 'Salesman Approval', path: PATH_SUPERADMIN.general.contractorapproval, icon: ICONS.approval },
    ],
  },

  // // MANAGEMENT
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // MANAGEMENT : USER
  //     {
  //       title: 'user',
  //       path: PATH_SUPERADMIN.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_SUPERADMIN.user.profile },
  //         { title: 'cards', path: PATH_SUPERADMIN.user.cards },
  //         { title: 'list', path: PATH_SUPERADMIN.user.list },
  //         { title: 'create', path: PATH_SUPERADMIN.user.newUser },
  //         { title: 'edit', path: PATH_SUPERADMIN.user.editById },
  //         { title: 'account', path: PATH_SUPERADMIN.user.account },
  //       ],
  //     },

  //     // MANAGEMENT : E-COMMERCE
  //     {
  //       title: 'e-commerce',
  //       path: PATH_SUPERADMIN.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_SUPERADMIN.eCommerce.shop },
  //         { title: 'product', path: PATH_SUPERADMIN.eCommerce.productById },
  //         { title: 'list', path: PATH_SUPERADMIN.eCommerce.list },
  //         { title: 'create', path: PATH_SUPERADMIN.eCommerce.newProduct },
  //         { title: 'edit', path: PATH_SUPERADMIN.eCommerce.editById },
  //         { title: 'checkout', path: PATH_SUPERADMIN.eCommerce.checkout },
  //         { title: 'invoice', path: PATH_SUPERADMIN.eCommerce.invoice },
  //       ],
  //     },

  //     // MANAGEMENT : BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_SUPERADMIN.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_SUPERADMIN.blog.posts },
  //         { title: 'post', path: PATH_SUPERADMIN.blog.postById },
  //         { title: 'new post', path: PATH_SUPERADMIN.blog.newPost },
  //       ],
  //     },
  //   ],
  // },

  // // APP
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_SUPERADMIN.mail.root,
  //       icon: ICONS.mail,
  //       info: (
  //         <Label variant="outlined" color="error">
  //           +32
  //         </Label>
  //       ),
  //     },
  //     { title: 'chat', path: PATH_SUPERADMIN.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_SUPERADMIN.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'kanban',
  //       path: PATH_SUPERADMIN.kanban,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },
];

export default navConfig;
