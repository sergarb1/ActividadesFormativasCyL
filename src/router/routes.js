
const routes = [
  {
    path: '/',
    component: () => import('layouts/Plantilla.vue'),
    children: [
      { path: '', component: () => import('pages/ActividadesOnline.vue') },
      { path: '/actonline', component: () => import('pages/ActividadesOnline.vue') },
      { path: '/actprescharlas', component: () => import('pages/ActividadesPresencialesCharlas.vue') },
      { path: '/actprescursos', component: () => import('pages/ActividadesPresencialesCursos.vue') },
      { path: '/actprestalleres', component: () => import('pages/ActividadesPresencialesTalleres.vue') },
      { path: '/suscripciones', component: () => import('pages/Suscripciones.vue') },
      { path: '/acercade', component: () => import('pages/AcercaDe.vue') },
      { path: '/favoritos', component: () => import('pages/Favoritos.vue') }
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
