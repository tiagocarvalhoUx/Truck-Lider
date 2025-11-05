import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/DashboardView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegação para rotas protegidas
router.beforeEach((to, from, next) => {
  const { isAuthenticated, loading } = useAuth()

  if (to.meta.requiresAuth) {
    // Aguardar o carregamento do estado de autenticação
    if (loading.value) {
      // Pode adicionar um loading screen aqui
      setTimeout(() => {
        if (isAuthenticated.value) {
          next()
        } else {
          next('/login')
        }
      }, 100)
    } else {
      if (isAuthenticated.value) {
        next()
      } else {
        next('/login')
      }
    }
  } else {
    next()
  }
})

export default router
