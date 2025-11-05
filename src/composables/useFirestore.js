import { ref } from 'vue'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore'
import { db } from '@/firebase/config'

export const useFirestore = (collectionName) => {
  const documents = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Adicionar documento
  const addDocument = async (data) => {
    loading.value = true
    error.value = null
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now()
      })
      loading.value = false
      return { success: true, id: docRef.id }
    } catch (err) {
      console.error('Erro ao adicionar documento:', err)
      error.value = err.message
      loading.value = false
      return { success: false, error: err.message }
    }
  }

  // Buscar todos os documentos
  const getDocuments = async (orderByField = 'createdAt', orderDirection = 'desc') => {
    loading.value = true
    error.value = null
    try {
      const q = query(
        collection(db, collectionName),
        orderBy(orderByField, orderDirection)
      )
      const querySnapshot = await getDocs(q)
      documents.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      loading.value = false
      return { success: true, data: documents.value }
    } catch (err) {
      console.error('Erro ao buscar documentos:', err)
      error.value = err.message
      loading.value = false
      return { success: false, error: err.message }
    }
  }

  // Buscar documentos com filtro
  const queryDocuments = async (field, operator, value) => {
    loading.value = true
    error.value = null
    try {
      const q = query(
        collection(db, collectionName),
        where(field, operator, value)
      )
      const querySnapshot = await getDocs(q)
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      loading.value = false
      return { success: true, data: results }
    } catch (err) {
      console.error('Erro ao buscar documentos:', err)
      error.value = err.message
      loading.value = false
      return { success: false, error: err.message }
    }
  }

  // Atualizar documento
  const updateDocument = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      })
      loading.value = false
      return { success: true }
    } catch (err) {
      console.error('Erro ao atualizar documento:', err)
      error.value = err.message
      loading.value = false
      return { success: false, error: err.message }
    }
  }

  // Deletar documento
  const deleteDocument = async (id) => {
    loading.value = true
    error.value = null
    try {
      await deleteDoc(doc(db, collectionName, id))
      loading.value = false
      return { success: true }
    } catch (err) {
      console.error('Erro ao deletar documento:', err)
      error.value = err.message
      loading.value = false
      return { success: false, error: err.message }
    }
  }

  return {
    documents,
    loading,
    error,
    addDocument,
    getDocuments,
    queryDocuments,
    updateDocument,
    deleteDocument
  }
}
