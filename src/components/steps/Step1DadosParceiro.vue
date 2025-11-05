<template>
  <div>
    <StepHeader :step="1" title="Dados do Parceiro Transportador" />

    <div class="space-y-4">
      <div>
        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Phone :size="16" /> WhatsApp Comercial *
        </label>
        <input
          type="text"
          v-model="formData.whatsapp"
          placeholder="+55 18 98114 2927"
          class="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none"
        />
      </div>

      <div>
        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <User :size="16" /> Nome Completo *
        </label>
        <input
          type="text"
          v-model="formData.nome"
          placeholder="João Silva"
          class="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <MapPin :size="16" /> Estado *
          </label>
          <select
            v-model="formData.estado"
            class="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none"
          >
            <option value="">Selecione o estado</option>
            <option v-for="estado in estadosBrasileiros" :key="estado" :value="estado">
              {{ estado }}
            </option>
          </select>
        </div>

        <div>
          <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <MapPin :size="16" /> Cidade *
          </label>
          <input
            type="text"
            v-model="formData.cidade"
            placeholder="Digite sua cidade"
            class="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Truck :size="16" /> Tipo de Veículo *
        </label>
        <select
          v-model="formData.tipoVeiculo"
          class="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none"
        >
          <option v-for="tipo in vehicleTypes" :key="tipo">{{ tipo }}</option>
        </select>
      </div>

      <div class="bg-green-50 border-l-4 border-green-600 p-4 mt-6">
        <h3 class="font-bold text-green-800 flex items-center gap-2 mb-2">
          💡 Nossa Filosofia de Negócio
        </h3>
        <p class="text-sm text-gray-700">
          "Vendemos soluções, tecnologia e uma experiência inovadora. Buscamos sempre facilitar as dificuldades encontradas no mercado, evoluindo e aprendendo com todos os envolvidos."
        </p>
      </div>

      <div class="bg-orange-50 border-l-4 border-orange-600 p-4">
        <h3 class="font-bold text-orange-800 flex items-center gap-2 mb-2">
          🎯 Nosso Compromisso
        </h3>
        <p class="text-sm text-gray-700">
          "Buscamos o frete ideal para cada motorista, melhorando os ganhos e oferecendo as melhores rotas com valores justos e transparentes."
        </p>
      </div>
    </div>

    <button
      @click="$emit('next')"
      :disabled="!isFormValid"
      class="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      CONTINUAR PARA ROTAS →
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Phone, User, MapPin, Truck } from 'lucide-vue-next'
import StepHeader from '@/components/ui/StepHeader.vue'
import { VEHICLE_TYPES, ESTADOS_BRASILEIROS } from '@/constants'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

defineEmits(['next'])

const vehicleTypes = VEHICLE_TYPES
const estadosBrasileiros = ESTADOS_BRASILEIROS

const isFormValid = computed(() => {
  return props.formData.whatsapp &&
         props.formData.nome &&
         props.formData.estado &&
         props.formData.cidade &&
         props.formData.tipoVeiculo
})
</script>
