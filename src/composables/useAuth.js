import { ref, computed } from 'vue'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '@/firebase/config'

const user = ref(null)
const loading = ref(true)

// Monitorar estado de autenticação
onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser
  loading.value = false
})

export const useAuth = () => {
  const isAuthenticated = computed(() => !!user.value)

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return { success: true }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return {
        success: false,
        error: getErrorMessage(error.code)
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      return { success: true }
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      return { success: false, error: error.message }
    }
  }

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return { success: true }
    } catch (error) {
      console.error('Erro ao registrar:', error)
      return {
        success: false,
        error: getErrorMessage(error.code)
      }
    }
  }

  const getErrorMessage = (code) => {
    const errors = {
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/email-already-in-use': 'Email já está em uso',
      'auth/weak-password': 'Senha muito fraca',
      'auth/invalid-email': 'Email inválido',
      'auth/invalid-credential': 'Credenciais inválidas'
    }
    return errors[code] || 'Erro ao autenticar'
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register
  }
}
