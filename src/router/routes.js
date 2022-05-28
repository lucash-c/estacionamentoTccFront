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
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/estacionamento',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Estacionamento.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
