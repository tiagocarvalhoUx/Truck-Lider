<template>
  <div class="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 p-4">
    <div class="max-w-2xl mx-auto">
      <AppHeader />

      <!-- Card Principal -->
      <div class="bg-white rounded-lg shadow-2xl overflow-hidden">
        <BadgesSection />
        <CtaBanner />

        <!-- Conteúdo -->
        <div class="p-6">
          <!-- Step 1: Dados do Parceiro -->
          <Step1DadosParceiro
            v-if="step === 1"
            :formData="formData"
            @next="step = 2"
          />

          <!-- Step 2: Rotas -->
          <Step2Rotas
            v-if="step === 2"
            :formData="formData"
            @next="handleContinuarRotas"
          />

          <!-- Step 3: Valores -->
          <Step3Valores
            v-if="step === 3 && !showSuccess"
            :formData="formData"
            @submit="handleEnviarProposta"
          />

          <!-- Success Screen -->
          <SuccessScreen
            v-if="showSuccess"
            :formData="formData"
            :distancias="distancias"
            @sendWhatsApp="handleEnviarWhatsApp"
            @newProposal="handleNovaProposta"
          />
        </div>
      </div>

      <AppFooter />

      <!-- Lista de Propostas Salvas -->
      <ProposalsList
        v-if="!showSuccess"
        :proposals="proposals"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { calcularDistancia } from '@/utils/calculations'
import { enviarWhatsApp } from '@/utils/whatsapp'
import { useProposals } from '@/composables/useProposals'
import { useFormData } from '@/composables/useFormData'

// Componentes
import AppHeader from '@/components/ui/AppHeader.vue'
import AppFooter from '@/components/ui/AppFooter.vue'
import BadgesSection from '@/components/ui/BadgesSection.vue'
import CtaBanner from '@/components/ui/CtaBanner.vue'
import Step1DadosParceiro from '@/components/steps/Step1DadosParceiro.vue'
import Step2Rotas from '@/components/steps/Step2Rotas.vue'
import Step3Valores from '@/components/steps/Step3Valores.vue'
import SuccessScreen from '@/components/SuccessScreen.vue'
import ProposalsList from '@/components/ProposalsList.vue'

const step = ref(1)
const showSuccess = ref(false)

const { formData, resetFormData } = useFormData()

const distancias = reactive({
  principal: 0,
  rota2: 0,
  rota3: 0
})

const { proposals, loadProposals, saveProposal } = useProposals()

onMounted(async () => {
  await loadProposals()
})

const handleContinuarRotas = () => {
  distancias.principal = calcularDistancia(formData.origemPrincipal, formData.destinoPrincipal)
  distancias.rota2 = calcularDistancia(formData.origem2, formData.destino2)
  distancias.rota3 = calcularDistancia(formData.origem3, formData.destino3)
  step.value = 3
}

const handleEnviarProposta = async () => {
  const proposalData = {
    ...formData,
    distancias: { ...distancias },
    timestamp: new Date().toISOString()
  }

  const result = await saveProposal(proposalData)
  if (result.success) {
    showSuccess.value = true
    await loadProposals()
  } else {
    alert('Erro ao salvar proposta. Tente novamente.')
  }
}

const handleEnviarWhatsApp = () => {
  enviarWhatsApp(formData, distancias)
}

const handleNovaProposta = () => {
  resetFormData()
  Object.assign(distancias, { principal: 0, rota2: 0, rota3: 0 })
  showSuccess.value = false
  step.value = 1
}
</script>
