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
        title: '首页',
      },
      component: () => import('@/components/layout/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/views/IndexView.vue'),
          meta: {
            title: '默认页',
          },
        },
        {
          path: 'menus',
          name: 'menus',
          component: () => import('@/views/menu/MenuView.vue'),
          meta: {
            title: '菜单管理',
          },
        },
        {
          path: 'menus/create',
          name: 'menus-create',
          component: () => import('@/views/menu/CreateEdit.vue'),
          meta: {
            title: '创建菜单',
          },
        },
        {
          path: 'menus/:id/edit',
          name: 'menus-edit',
          component: () => import('@/views/menu/CreateEdit.vue'),
          meta: {
            title: '编辑菜单',
          },
        },
        {
          path: 'resource-category',
          name: 'resource-category',
          component: () => import('@/views/resource-categories/ResourceCategoryView.vue'),
          meta: {
            title: '资源分类',
          },
        },
        {
          path: 'resources',
          name: 'resources',
          component: () => import('@/views/resources/ResourcesView.vue'),
          meta: {
            title: '资源管理',
          },
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import('@/views/roles/RolesView.vue'),
          meta: {
            title: '角色管理',
          },
        },
        {
          path: 'roles/:roleId/alloc-menu',
          name: 'alloc-menu',
          component: () => import('@/views/roles/AllocMenuView.vue'),
          props: true,
          meta: {
            title: '分配菜单',
          },
        },
        {
          path: 'roles/:roleId/alloc-resources',
          name: 'alloc-resources',
          component: () => import('@/views/roles/AllocResourcesView.vue'),
          props: true,
          meta: {
            title: '分配资源',
          },
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/users/UsersView.vue'),
          meta: {
            title: '用户管理',
          },
        },
        {
          path: 'courses',
          name: 'courses',
          component: () => import('@/views/courses/CoursesView.vue'),
          meta: {
            title: '课程管理',
          },
        },
        {
          path: 'courses/create',
          name: 'courses-create',
          component: () => import('@/views/courses/CreateEdit.vue'),
          meta: {
            layoutStyle: { alignItems: 'flex-start' },
            title: '创建课程',
          },
        },
        {
          path: 'courses/:courseId/edit',
          name: 'courses-edit',
          component: () => import('@/views/courses/CreateEdit.vue'),
          props: true,
          meta: {
            layoutStyle: { alignItems: 'flex-start' },
            title: '编辑课程',
          },
        },
        {
          path: 'courses/:courseId/content',
          name: 'courses-content',
          component: () => import('@/views/courses/CourseContent.vue'),
          props: true,
          meta: {
            layoutStyle: { alignItems: 'flex-start' },
            title: '课程内容',
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
