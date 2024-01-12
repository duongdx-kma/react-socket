export const listRouter = [
  {
    key: 1,
    path: '/',
    path_redirect: '/sign-in',
    component: 'home',
    auth: true,
    admin: false
  },
  {
    key: 2,
    path: '/users',
    path_redirect: '/sign-in',
    component: 'list',
    auth: true,
    admin: false
  },
  {
    key: 3,
    path: '/users/:id',
    path_redirect: '/sign-in',
    component: 'detail',
    auth: true,
    admin: false
  },
  {
    key: 4,
    path: '/users/edit/:id',
    path_redirect: '/',
    component: 'update',
    auth: true,
    admin: true
  },
  {
    key: 5,
    path: '/users/create',
    path_redirect: '/sign-in',
    component: 'create',
    auth: true,
    admin: false
  },
  {
    key: 6,
    path: '/sign-in',
    path_redirect: '/',
    component: 'login',
    auth: false,
    admin: false
  },
  {
    key: 7,
    path: '/projects',
    path_redirect: '/',
    component: 'project',
    auth: true,
    admin: false
  },
  {
    key: 8,
    path: '/tasks',
    path_redirect: '/',
    component: 'task',
    auth: true,
    admin: false
  },
];

export const STYLE_LOADER = {
  minHeight: '100vh',
  justifyContent: "center",
  display: 'flex',
  alignItems:'center',
  margin: 'auto'
}

export const COLOR_LOADER = 'linear-gradient(#0259af,rgb(144 205 228 / 80%))'