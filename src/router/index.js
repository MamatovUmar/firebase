export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { auth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { auth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { auth: false },
  }
];
