/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line quotes
import { isValidToken } from "../services/auth"

const validationRoute = (to, from, next) => {
  if (!isValidToken()) {
    location.href = '/'
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/estacionamento',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Estacionamento.vue'),
        beforeEnter: validationRoute,
      }
    ]
  },
  {
    path: '/movimento',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Movimento.vue'),
        beforeEnter: validationRoute
      }
    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/clientes',
        component: () => import('pages/Clientes.vue'),
        beforeEnter: validationRoute
      }
    ]
  },
  {
    path: '/caixa',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Caixa.vue'),
        beforeEnter: validationRoute
      }
    ]
  },
  {
    path: '/entrada',
    component: () => import('pages/Entrada.vue'),
    beforeEnter: validationRoute,

  },
  {
    path: '/saida',
    component: () => import('pages/Saida.vue'),
    beforeEnter: validationRoute,

  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
