// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_SUPERADMIN = '/superadmin/panel';
const ROOTS_ADMIN_AUTH = '/admin';
const ROOTS_ADMIN = '/admin/panel';
const ROOTS_AGENTS_AUTH = '/agent';
const ROOTS_AGENTS = '/agent/panel';
const ROOTS_SALEMAN_AUTH = '/salesman';
const ROOTS_SALEMAN = '/salesman/panel';


// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_ADMIN_AUTH,
  login: path(ROOTS_ADMIN_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/comingSoon',
  maintenance: '/maintenance',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_ADMIN_AUTH = {
  root: ROOTS_ADMIN_AUTH,
  login: path(ROOTS_ADMIN_AUTH, '/login'),
};

export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  general: {
    dashboard: path(ROOTS_ADMIN, '/dashboard'),
    company: path(ROOTS_ADMIN, '/company'),
    contact: path(ROOTS_ADMIN, '/contact'),
    location: path(ROOTS_ADMIN, '/location'),
    credential: path(ROOTS_ADMIN, '/credential'),
    assets: path(ROOTS_ADMIN, '/assets'),
    customerfeedback: path(ROOTS_ADMIN, '/customerfeedback'),
    customerapproval: path(ROOTS_ADMIN, '/customerapproval'),
    contractorapproval: path(ROOTS_ADMIN, '/contractorapproval'),
  },
};

export const PATH_AGENT_AUTH = {
  root: ROOTS_AGENTS_AUTH,
  login: path(ROOTS_AGENTS_AUTH, '/login'),
  register: path(ROOTS_AGENTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AGENTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AGENTS_AUTH, '/new-password'),
  verify: path(ROOTS_AGENTS_AUTH, '/verify')
};


export const PATH_AGENT = {
  root: ROOTS_AGENTS,
  general: {
    dashboard: path(ROOTS_AGENTS, '/dashboard'),
  },
};

export const PATH_SALEMAN_AUTH = {
  root: ROOTS_SALEMAN_AUTH,
  login: path(ROOTS_SALEMAN_AUTH, '/login'),
  register: path(ROOTS_SALEMAN_AUTH, '/register'),
  resetPassword: path(ROOTS_SALEMAN_AUTH, '/reset-password'),
  newPassword: path(ROOTS_SALEMAN_AUTH, '/new-password'),
  verify: path(ROOTS_SALEMAN_AUTH, '/verify')
};

export const PATH_SALEMAN = {
  root: ROOTS_SALEMAN,
  general: {
    dashboard: path(ROOTS_SALEMAN, '/dashboard'),
    // company: path(ROOTS_SALEMAN, '/company'),
    // cuscompany: path(ROOTS_SALEMAN, '/cuscompany'),
    customer: path(ROOTS_SALEMAN, '/customer'),
    location: path(ROOTS_SALEMAN, '/location'),
    task: path(ROOTS_SALEMAN, '/task'),

  },

  // ourcompanyinfo: {
  //   root: path(ROOTS_SALEMAN, '/ourcompanyinfo'),
  //   ourcompany: path(ROOTS_SALEMAN, '/ourcompanyinfo/ourcompany'),
  //   // salelead: path(ROOTS_SALEMAN, '/ourtask/salelead'),

  //   // onboarding: path(ROOTS_SALEMAN, '/ourtask/onboarding'),

  //   // scheduleservice: path(ROOTS_SALEMAN, '/ourtask/scheduleservice'),
  //   // reviewuploads: path(ROOTS_SALEMAN, '/ourtask/reviewuploads'),

  // },

  ourtask: {
    root: path(ROOTS_SALEMAN, '/ourtask'),
    reviewdataupdates: path(ROOTS_SALEMAN, '/ourtask/reviewdataupdates'),
    salelead: path(ROOTS_SALEMAN, '/ourtask/salelead'),

    onboarding: path(ROOTS_SALEMAN, '/ourtask/onboarding'),

    scheduleservice: path(ROOTS_SALEMAN, '/ourtask/scheduleservice'),
    reviewuploads: path(ROOTS_SALEMAN, '/ourtask/reviewuploads'),
    // product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    // productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    // list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    // newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    // editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    // checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    // invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },

};


export const PATH_SUPERADMIN = {
  root: ROOTS_SUPERADMIN,
  general: {
    dashboard: path(ROOTS_SUPERADMIN, '/dashboard'),
    customerapproval: path(ROOTS_SUPERADMIN, '/agentapproval'),
    contractorapproval: path(ROOTS_SUPERADMIN, '/salemanapproval')
  },
};

export const PATH_DOCS = '#';
