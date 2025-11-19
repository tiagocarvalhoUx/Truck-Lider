<template>
  <div class="anderson-system">
    <div class="max-w-2xl mx-auto">
      <AppHeader />

      <!-- Card Principal -->
      <div class="main-card">
        <BadgesSection />
        <CtaBanner />

        <!-- Conteúdo -->
        <div class="p-3 sm:p-4 md:p-6">
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
import { useRoute } from 'vue-router'
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

const route = useRoute()
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

  // Preencher dados da landing page se existirem
  if (route.query.nome) {
    formData.nome = route.query.nome
  }
  if (route.query.whatsapp) {
    formData.whatsapp = route.query.whatsapp
  }
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

<style scoped>
.anderson-system {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  padding: 0.5rem;
  position: relative;
  overflow-x: hidden;
}

.anderson-system::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: radial-gradient(ellipse at top, rgba(201, 169, 97, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.main-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
  border-radius: 1rem;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(201, 169, 97, 0.2),
    0 0 40px rgba(201, 169, 97, 0.1);
  overflow: hidden;
  border: 1px solid rgba(201, 169, 97, 0.3);
  position: relative;
}

.main-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    transparent 0%,
    #c9a961 20%,
    #c9a961 80%,
    transparent 100%
  );
}

@media (min-width: 640px) {
  .anderson-system {
    padding: 1rem;
  }
}

@media (min-width: 768px) {
  .anderson-system {
    padding: 1.5rem;
  }

  .main-card {
    border-radius: 1.5rem;
  }
}
</style>
