<template>
  <div>
    <StepHeader :step="3" title="Sua Proposta de Valores" />

    <div class="bg-green-50 p-4 rounded-lg mb-6">
      <h3 class="font-bold text-center mb-4 flex items-center justify-center gap-2">
        📊 TABELA DE REFERÊNCIA - ANDERSON INSIDE
      </h3>
      <table class="w-full text-sm">
        <thead class="bg-green-700 text-white">
          <tr>
            <th class="p-2">Tipo Veículo</th>
            <th class="p-2">R$/km</th>
            <th class="p-2">R$/ton</th>
            <th class="p-2">R$/m³</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="border-b">
            <td class="p-2 font-semibold">Carreta</td>
            <td class="p-2">R$ 3,10</td>
            <td class="p-2">R$ 95,00</td>
            <td class="p-2">R$ 140,00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-400 p-6 rounded-lg mb-6">
      <div class="text-center mb-4">
        <span class="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
          💰 PROPOSTA COMERCIAL
        </span>
      </div>

      <h3 class="font-bold text-center mb-4 text-orange-800 flex items-center justify-center gap-2">
        📋 FAÇA SUA PROPOSTA DE VALORES
      </h3>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold mb-2">Valor por TONELADA</label>
          <input
            type="number"
            v-model="formData.valorTonelada"
            placeholder="0,00"
            class="w-full p-3 border-2 border-orange-300 rounded-lg text-center text-lg font-bold"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2">Valor por M³</label>
          <input
            type="number"
            v-model="formData.valorM3"
            placeholder="0,00"
            class="w-full p-3 border-2 border-orange-300 rounded-lg text-center text-lg font-bold"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2">Valor por KM</label>
          <input
            type="number"
            v-model="formData.valorKM"
            placeholder="0,00"
            class="w-full p-3 border-2 border-orange-300 rounded-lg text-center text-lg font-bold"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2">Valor FECHADO</label>
          <input
            type="number"
            v-model="formData.valorFechado"
            placeholder="0,00"
            class="w-full p-3 border-2 border-orange-300 rounded-lg text-center text-lg font-bold"
          />
        </div>
      </div>

      <p class="text-center text-sm text-gray-600 mt-4">
        💡 Analisamos cada proposta individualmente
      </p>
    </div>

    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-400 p-6 rounded-lg mb-6">
      <h3 class="font-bold text-orange-800 flex items-center gap-2 mb-4">
        💳 Forma de Pagamento
      </h3>

      <div class="space-y-3">
        <label class="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-orange-300 cursor-pointer hover:bg-orange-50">
          <input
            type="radio"
            v-model="formData.pagamento"
            value="entrega"
            class="mt-1"
          />
          <div>
            <div class="font-bold">⭕ Pagamento na Entrega</div>
            <div class="text-sm text-gray-600">100% após conclusão do frete</div>
          </div>
        </label>

        <label class="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-orange-50">
          <input
            type="radio"
            v-model="formData.pagamento"
            value="adiantamento"
            class="mt-1"
          />
          <div>
            <div class="font-bold">⭕ Com Adiantamento (70%)</div>
            <div class="text-sm text-gray-600">70% antecipado + 30% na entrega</div>
          </div>
        </label>
      </div>
    </div>

    <button
      @click="$emit('submit')"
      class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition"
    >
      ENVIAR PROPOSTA →
    </button>
  </div>
</template>

<script setup>
import StepHeader from '@/components/ui/StepHeader.vue'

defineProps({
  formData: {
    type: Object,
    required: true
  }
})

defineEmits(['submit'])
</script>
