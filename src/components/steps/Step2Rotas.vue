<template>
  <div>
    <StepHeader :step="2" title="Suas Rotas Preferidas" />

    <div class="bg-green-50 p-4 rounded-lg mb-6">
      <h3 class="font-bold text-red-700 flex items-center gap-2 mb-4">
        📍 ROTA PRINCIPAL
      </h3>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center mb-3">
        <input
          type="text"
          v-model="formData.origemPrincipal"
          @blur="calcularRotaPrincipal"
          placeholder="Ex: São Paulo, SP"
          class="flex-1 p-3 border-2 border-green-400 rounded-lg text-sm sm:text-base"
        />
        <span class="text-2xl text-center sm:text-left">→</span>
        <input
          type="text"
          v-model="formData.destinoPrincipal"
          @blur="calcularRotaPrincipal"
          placeholder="Ex: Rio de Janeiro, RJ"
          class="flex-1 p-3 border-2 border-green-400 rounded-lg text-sm sm:text-base"
        />
        <button
          v-if="formData.origemPrincipal && formData.destinoPrincipal"
          @click="calcularRotaPrincipal"
          :disabled="calculando"
          class="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
          title="Calcular distância real"
        >
          <RefreshCw :size="18" :class="{ 'animate-spin': calculando }" />
          <span class="sm:hidden">Calcular Rota</span>
        </button>
      </div>

      <!-- Campo Valor por KM/Tonelada -->
      <div class="mt-3">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          💰 Valor por KM/Tonelada (R$)
        </label>
        <input
          type="number"
          v-model="formData.valorKmTonelada"
          placeholder="Ex: 3.10"
          step="0.01"
          class="w-full p-3 border-2 border-green-400 rounded-lg text-center text-lg font-bold"
        />
      </div>

      <!-- Exibir Distância e Cálculo -->
      <div v-if="rotaCalculada || (formData.origemPrincipal && formData.destinoPrincipal)" class="mt-3 space-y-2">
        <!-- Loading -->
        <div v-if="calculando" class="p-4 bg-blue-50 rounded-lg border-2 border-blue-400 text-center">
          <RefreshCw :size="32" class="animate-spin mx-auto mb-2 text-blue-600" />
          <p class="text-sm text-blue-700 font-semibold">Calculando rota real...</p>
        </div>

        <!-- Erro -->
        <div v-else-if="erroCalculo" class="p-4 bg-red-50 rounded-lg border-2 border-red-400">
          <p class="text-sm text-red-700 font-semibold mb-2">⚠️ Erro ao calcular rota</p>
          <p class="text-xs text-red-600">{{ erroCalculo }}</p>
          <button
            @click="calcularRotaPrincipal"
            class="mt-2 text-xs text-blue-600 underline hover:text-blue-800"
          >
            Tentar novamente
          </button>
        </div>

        <!-- Resultado -->
        <div v-else class="p-3 bg-white rounded-lg border-2 border-green-400">
          <div class="flex justify-between items-center mb-2">
            <p class="text-sm text-gray-600">{{ metodoCalculo }}</p>
            <span v-if="tempoEstimado" class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              ⏱️ {{ tempoEstimado }}h
            </span>
          </div>
          <p class="text-2xl font-bold text-green-700 text-center">
            {{ distanciaPrincipal }} km
          </p>
        </div>

        <!-- Cálculo Automático -->
        <div v-if="formData.valorKmTonelada" class="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-400 rounded-lg">
          <p class="text-sm font-semibold text-orange-800 text-center mb-2">📊 CÁLCULO DA ROTA</p>
          <div class="grid grid-cols-3 gap-2 text-center mb-3">
            <div>
              <p class="text-xs text-gray-600">Distância</p>
              <p class="text-lg font-bold text-gray-800">{{ distanciaPrincipal }} km</p>
            </div>
            <div>
              <p class="text-xs text-gray-600">×</p>
              <p class="text-lg font-bold text-gray-800">×</p>
            </div>
            <div>
              <p class="text-xs text-gray-600">R$/km</p>
              <p class="text-lg font-bold text-gray-800">{{ formatCurrency(formData.valorKmTonelada) }}</p>
            </div>
          </div>
          <div class="pt-3 border-t-2 border-orange-300">
            <p class="text-xs text-gray-600 text-center">VALOR TOTAL DA ROTA</p>
            <p class="text-3xl font-bold text-orange-600 text-center">
              {{ formatCurrency(valorTotalRota) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 class="font-bold text-red-700 flex items-center gap-2 mb-4">
        📍 ROTAS ALTERNATIVAS
      </h3>

      <div class="space-y-3">
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
          <input
            type="text"
            v-model="formData.origem2"
            placeholder="Origem 2 (Opcional)"
            class="flex-1 p-3 border-2 border-gray-300 rounded-lg text-sm sm:text-base"
          />
          <span class="text-2xl text-center sm:text-left">→</span>
          <input
            type="text"
            v-model="formData.destino2"
            placeholder="Destino 2 (Opcional)"
            class="flex-1 p-3 border-2 border-gray-300 rounded-lg text-sm sm:text-base"
          />
        </div>

        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
          <input
            type="text"
            v-model="formData.origem3"
            placeholder="Origem 3 (Opcional)"
            class="flex-1 p-3 border-2 border-gray-300 rounded-lg text-sm sm:text-base"
          />
          <span class="text-2xl text-center sm:text-left">→</span>
          <input
            type="text"
            v-model="formData.destino3"
            placeholder="Destino 3 (Opcional)"
            class="flex-1 p-3 border-2 border-gray-300 rounded-lg text-sm sm:text-base"
          />
        </div>
      </div>
    </div>

    <button
      @click="$emit('next')"
      :disabled="!formData.origemPrincipal || !formData.destinoPrincipal"
      class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50"
    >
      DEFINIR VALORES →
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RefreshCw } from 'lucide-vue-next'
import StepHeader from '@/components/ui/StepHeader.vue'
import { calcularDistanciaRota } from '@/services/routingService'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

defineEmits(['next'])

// Estados para cálculo de rota
const calculando = ref(false)
const rotaCalculada = ref(false)
const erroCalculo = ref('')
const distanciaReal = ref(0)
const tempoEstimado = ref(0)
const metodoCalculo = ref('Digite origem e destino')

// Calcular distância da rota principal usando API
const calcularRotaPrincipal = async () => {
  if (!props.formData.origemPrincipal || !props.formData.destinoPrincipal) {
    return
  }

  if (props.formData.origemPrincipal.trim() === '' || props.formData.destinoPrincipal.trim() === '') {
    return
  }

  calculando.value = true
  erroCalculo.value = ''
  rotaCalculada.value = false

  try {
    const resultado = await calcularDistanciaRota(
      props.formData.origemPrincipal,
      props.formData.destinoPrincipal
    )

    if (resultado.success) {
      distanciaReal.value = resultado.distancia
      tempoEstimado.value = resultado.tempo
      metodoCalculo.value = `🗺️ ${resultado.metodo}`
      rotaCalculada.value = true
    } else {
      erroCalculo.value = resultado.erro || 'Não foi possível calcular a rota'
      distanciaReal.value = 0
    }
  } catch (error) {
    console.error('Erro ao calcular rota:', error)
    erroCalculo.value = 'Erro ao conectar com o serviço de rotas'
    distanciaReal.value = 0
  } finally {
    calculando.value = false
  }
}

// Auto-calcular quando origem/destino mudam (com debounce)
let debounceTimer = null
watch(
  () => [props.formData.origemPrincipal, props.formData.destinoPrincipal],
  () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      if (props.formData.origemPrincipal && props.formData.destinoPrincipal) {
        calcularRotaPrincipal()
      }
    }, 1500) // Aguarda 1.5s após parar de digitar
  }
)

// Distância para usar nos cálculos
const distanciaPrincipal = computed(() => {
  return distanciaReal.value || 0
})

// Calcular valor total da rota (distância × valor por km)
const valorTotalRota = computed(() => {
  if (!props.formData.valorKmTonelada || !distanciaPrincipal.value) return 0
  return distanciaPrincipal.value * parseFloat(props.formData.valorKmTonelada || 0)
})

// Formatar moeda
const formatCurrency = (value) => {
  if (!value) return 'R$ 0,00'
  return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`
}
</script>
