import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home',
      },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('../views/Auth/SignUp.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Auth/Login.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (authStore.token && authStore.isUserLoggedIn) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    if (to.name === 'Login' || to.name === 'signUp') {
      if (authStore.token && authStore.isUserLoggedIn) {
        next('/')
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
