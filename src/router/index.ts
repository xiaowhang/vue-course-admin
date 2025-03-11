import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
    },
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/components/layout/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/views/IndexView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record?.meta?.requiresAuth)
  if (requiresAuth) {
    const authStore = useAuthStore()
    if (!authStore.token.access_token) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }

  next()
})

export default router
