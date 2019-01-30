
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/actonline.vue') },
      { path: '/actonline', component: () => import('pages/actonline.vue') },
      { path: '/actpresencial', component: () => import('pages/actpresencial.vue') },
      { path: '/suscripcion', component: () => import('pages/suscripcion.vue') },
      { path: '/acercade', component: () => import('pages/acercade.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
