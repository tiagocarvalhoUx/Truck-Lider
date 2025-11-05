<template>
  <div class="text-center py-8">
    <div class="w-24 h-24 bg-green-600 rounded-lg mx-auto mb-6 flex items-center justify-center">
      <CheckCircle :size="64" class="text-white" />
    </div>

    <h2 class="text-2xl font-bold text-green-700 mb-6">
      Proposta Recebida com Sucesso!
    </h2>

    <div class="bg-gray-50 p-6 rounded-lg mb-6 text-left">
      <h3 class="font-bold text-orange-600 text-center mb-4">Resumo da Sua Proposta:</h3>

      <div class="space-y-2 text-sm">
        <p><strong>Nome:</strong> {{ formData.nome }}</p>
        <p><strong>WhatsApp:</strong> {{ formData.whatsapp }}</p>
        <p><strong>Estado:</strong> {{ formData.estado }}</p>
        <p><strong>Cidade:</strong> {{ formData.cidade }}</p>
        <p><strong>Veículo:</strong> {{ formData.tipoVeiculo }}</p>

        <hr class="my-3" />
        <p class="font-bold">ROTAS PREFERIDAS:</p>
        <p>1. {{ formData.origemPrincipal }} → {{ formData.destinoPrincipal }} ({{ distancias.principal }} km)</p>
        <p v-if="formData.valorKmTonelada" class="text-xs text-gray-600 mt-1">
          Valor KM/Ton: {{ formatCurrency(formData.valorKmTonelada) }} |
          Total da Rota: <span class="font-bold text-orange-600">{{ formatCurrency(calcularValorRota()) }}</span>
        </p>

        <hr class="my-3" />
        <p class="font-bold">VALORES PROPOSTOS:</p>
        <p>Por Tonelada: <span class="bg-yellow-200 px-2 py-1 rounded font-bold">{{ formatCurrency(formData.valorTonelada) }}</span></p>
        <p>Por M³: <span class="bg-yellow-200 px-2 py-1 rounded font-bold">{{ formatCurrency(formData.valorM3) }}</span></p>
        <p>Por KM: <span class="bg-yellow-200 px-2 py-1 rounded font-bold">{{ formatCurrency(formData.valorKM) }}</span></p>
        <p>Valor Fechado: <span class="bg-yellow-200 px-2 py-1 rounded font-bold">{{ formatCurrency(formData.valorFechado) }}</span></p>

        <hr class="my-3" />
        <p><strong>Pagamento:</strong> {{ formData.pagamento === 'entrega' ? '100% na entrega' : '70% antecipado + 30% na entrega' }}</p>
      </div>
    </div>

    <p class="text-gray-700 mb-6">
      <strong>Anderson Inside</strong> agradece sua parceria!<br />
      Analisaremos sua proposta e retornaremos em até 30 minutos.
    </p>

    <div class="space-y-3">
      <button
        @click="$emit('sendWhatsApp')"
        class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition flex items-center justify-center gap-2"
      >
        <Phone :size="20" />
        Enviar para Anderson via WhatsApp
      </button>

      <button
        @click="$emit('newProposal')"
        class="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 rounded-lg hover:from-green-700 hover:to-green-800 transition flex items-center justify-center gap-2"
      >
        <Package :size="20" />
        Nova Proposta
      </button>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, Phone, Package } from 'lucide-vue-next'
import { formatCurrency } from '@/utils/formatters'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  distancias: {
    type: Object,
    required: true
  }
})

defineEmits(['sendWhatsApp', 'newProposal'])

const calcularValorRota = () => {
  if (!props.formData.valorKmTonelada || !props.distancias.principal) return 0
  return props.distancias.principal * parseFloat(props.formData.valorKmTonelada || 0)
}
</script>
