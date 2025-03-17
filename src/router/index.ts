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
        {
          path: 'menus',
          name: 'menus',
          component: () => import('@/views/menu/MenuView.vue'),
        },
        {
          path: 'menus/create',
          name: 'menus-create',
          component: () => import('@/views/menu/CreateEdit.vue'),
        },
        {
          path: 'menus/:id/edit',
          name: 'menus-edit',
          component: () => import('@/views/menu/CreateEdit.vue'),
        },
        {
          path: 'resource-category',
          name: 'resource-category',
          component: () => import('@/views/resource-category/ResourceCategoryView.vue'),
        },
        {
          path: 'resources',
          name: 'resources',
          component: () => import('@/views/resources/ResourcesView.vue'),
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import('@/views/roles/RolesView.vue'),
        },
        {
          path: 'roles/:roleId/alloc-menu',
          name: 'alloc-menu',
          component: () => import('@/views/roles/AllocMenuView.vue'),
          props: true,
        },
        {
          path: 'roles/:roleId/alloc-resources',
          name: 'alloc-resources',
          component: () => import('@/views/roles/AllocResourcesView.vue'),
          props: true,
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/users/UsersView.vue'),
        },
        {
          path: 'courses',
          name: 'courses',
          component: () => import('@/views/courses/CoursesView.vue'),
        },
        {
          path: 'courses/create',
          name: 'courses-create',
          component: () => import('@/views/courses/CreateEdit.vue'),
          meta: {
            layoutStyle: { alignItems: 'flex-start' },
          },
        },
        {
          path: 'courses/:courseId/edit',
          name: 'courses-edit',
          component: () => import('@/views/courses/CreateEdit.vue'),
          props: true,
          meta: {
            layoutStyle: { alignItems: 'flex-start' },
          },
        },
        {
          path: 'courses/:courseId/content',
          name: 'courses-content',
          component: () => import('@/views/courses/CourseContent.vue'),
          props: true,
          meta: {
            layoutStyle: { alignItems: 'flex-start' },
          },
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
    if (!authStore.token?.access_token) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }

  next()
})

export default router
