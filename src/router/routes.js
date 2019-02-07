const routes = [{
  path: '/',
  component: () => import('layouts/Plantilla.vue'),
  children: [{
      path: '',
      component: () => import('pages/ActividadesPresenciales.vue')
    },
    {
      path: '/actonline',
      component: () => import('pages/ActividadesOnline.vue')
    },
    {
      path: '/actpresenciales',
      component: () => import('pages/ActividadesPresenciales.vue')
    },
    {
      path: '/suscripciones',
      component: () => import('pages/Suscripciones.vue')
    },
    {
      path: '/acercade',
      component: () => import('pages/AcercaDe.vue')
    },
    {
      path: '/favoritos',
      component: () => import('pages/Favoritos.vue')
    },
    {
      path: '/recomendaciones',
      component: () => import('pages/Recomendaciones.vue')
    },
    {
      path: '/ayuda',
      component: () => import('pages/Ayuda.vue')
    },
    {
      path: '/buscador',
      component: () => import('pages/Buscador.vue')
    },
    {
      path: '/resultadobusqueda',
      component: () => import('pages/ResultadosBusqueda.vue')
    },
    {
      path: '/descargas',
      component: () => import('pages/Descargas.vue')
    }
  ]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
