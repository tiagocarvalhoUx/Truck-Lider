import { reactive } from 'vue'

export const useFormData = () => {
  const formData = reactive({
    whatsapp: '',
    nome: '',
    estado: '',
    cidade: '',
    tipoVeiculo: 'Truck (até 14ton)',
    origemPrincipal: '',
    destinoPrincipal: '',
    valorKmTonelada: '', // Valor por KM/Tonelada
    origem2: '',
    destino2: '',
    origem3: '',
    destino3: '',
    valorTonelada: '',
    valorM3: '',
    valorKM: '',
    valorFechado: '',
    pagamento: 'entrega'
  })

  const resetFormData = () => {
    Object.assign(formData, {
      whatsapp: '',
      nome: '',
      estado: '',
      cidade: '',
      tipoVeiculo: 'Truck (até 14ton)',
      origemPrincipal: '',
      destinoPrincipal: '',
      valorKmTonelada: '',
      origem2: '',
      destino2: '',
      origem3: '',
      destino3: '',
      valorTonelada: '',
      valorM3: '',
      valorKM: '',
      valorFechado: '',
      pagamento: 'entrega'
    })
  }

  return {
    formData,
    resetFormData
  }
}
