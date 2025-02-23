import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('../App.vue'),
    // },
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
