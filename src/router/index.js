import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingPageFretes.vue')
  },
  {
    path: '/formulario',
    name: 'formulario',
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Sempre rola para o topo ao navegar
    return { top: 0, behavior: 'smooth' }
  }
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
