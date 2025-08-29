import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import Owner from '../views/Owner.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Restaurant',
      },
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
    {
      path: '/owner',
      name: 'Owner',
      component: Owner,
      meta: { requiresAuth: true, layout: 'owner' },
      children: [
        {
          path: 'combo',
          name: 'Combo',
          component: () => import('@/views/Combos/combo.vue'),
        },
        {
          path: 'add-modify-combo/:id?',
          name: 'AddNewCombo',
          component: () => import('@/views/Combos/AddNewCombo.vue'),
        },
        {
          path: 'category',
          name: 'Category',
          component: () => import('@/views/Category/Category.vue'),
        },
        {
          path: 'items',
          name: 'Items',
          component: () => import('@/views/Items/Items.vue'),
        },
      ],
    },
    {
      path: '/restaurant',
      name: 'Restaurant',
      component: () => import('@/views/Restaurant/RestaurantList.vue'),
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/restaurant/:id',
      name: 'RestaurantMenu',
      component: () => import('@/views/Restaurant/RestaurantMenu.vue'),
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/cart/Cart.vue'),
      meta: { requiresAuth: true, layout: 'default' },
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
