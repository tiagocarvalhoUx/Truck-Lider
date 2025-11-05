<template>
  <div class="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-2 mb-4">
          <span class="text-5xl">🌲</span>
          <h1 class="text-4xl font-bold text-white">ANDERSON INSIDE</h1>
        </div>
        <p class="text-green-100 text-lg">Painel Administrativo</p>
      </div>

      <div class="bg-white rounded-lg shadow-2xl p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p class="text-red-700 text-sm">{{ errorMessage }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              v-model="email"
              required
              placeholder="admin@andersoninside.com"
              class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              v-model="password"
              required
              placeholder="••••••••"
              class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">Entrar</span>
            <span v-else>Entrando...</span>
          </button>
        </form>

        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-xs text-blue-800 font-semibold mb-2">🔐 Primeiro Acesso:</p>
          <p class="text-xs text-blue-700">
            Para criar sua conta de administrador, use o console do Firebase Authentication.
          </p>
          <p class="text-xs text-blue-700 mt-2">
            Ou altere o código em <code class="bg-blue-100 px-1">LoginView.vue</code> para permitir registro.
          </p>
        </div>
      </div>

      <div class="text-center mt-6 text-white text-sm">
        <p>© 2024 Anderson Inside - Todos os direitos reservados</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  const result = await login(email.value, password.value)

  if (result.success) {
    router.push('/admin')
  } else {
    errorMessage.value = result.error
  }

  loading.value = false
}
</script>
