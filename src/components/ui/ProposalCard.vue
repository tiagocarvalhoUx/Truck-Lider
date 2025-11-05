<template>
  <div class="bg-gradient-to-br from-green-50 to-gray-50 border-2 border-green-300 rounded-lg p-4 hover:shadow-lg transition">
    <div class="flex justify-between items-start mb-3">
      <div>
        <h4 class="font-bold text-lg text-gray-800">{{ proposal.nome }}</h4>
        <p class="text-sm text-gray-600">{{ proposal.cidade }} - {{ proposal.estado }}</p>
      </div>
      <span class="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
        #{{ number }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3 text-sm">
      <div>
        <p class="text-gray-600">📱 WhatsApp:</p>
        <p class="font-semibold">{{ proposal.whatsapp }}</p>
      </div>
      <div>
        <p class="text-gray-600">🚚 Veículo:</p>
        <p class="font-semibold">{{ proposal.tipoVeiculo }}</p>
      </div>
      <div class="col-span-2">
        <p class="text-gray-600">🛣️ Rota Principal:</p>
        <p class="font-semibold">{{ proposal.origemPrincipal }} → {{ proposal.destinoPrincipal }}</p>
      </div>
      <div>
        <p class="text-gray-600">💰 Valor/Tonelada:</p>
        <p class="font-bold text-green-700">{{ formatCurrency(proposal.valorTonelada) }}</p>
      </div>
      <div>
        <p class="text-gray-600">💰 Valor/KM:</p>
        <p class="font-bold text-green-700">{{ formatCurrency(proposal.valorKM) }}</p>
      </div>
    </div>

    <div class="mt-3 pt-3 border-t border-green-200 text-xs text-gray-500">
      📅 {{ formatDate(proposal.timestamp) }}
    </div>
  </div>
</template>

<script setup>
import { formatCurrency, formatDate } from '@/utils/formatters'

defineProps({
  proposal: {
    type: Object,
    required: true
  },
  number: {
    type: Number,
    required: true
  }
})
</script>
