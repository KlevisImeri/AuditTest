import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'validate',
      component: () => import('../views/Validate.vue'),
    },
    {
      path: '/houses',
      name: 'home',
      component: () => import('../views/Houses.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignUp.vue'), 
    },
    {
      path: '/houses/:houseId',
      name: 'houses',
      component: () => import('../views/Book.vue'),
    }
  ],
})

export default router
