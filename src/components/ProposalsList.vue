<template>
  <div v-if="proposals.length > 0" class="bg-white rounded-lg shadow-2xl overflow-hidden mt-8 p-6">
    <h3 class="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
      📊 Propostas Cadastradas ({{ proposals.length }})
    </h3>

    <div class="space-y-4 max-h-96 overflow-y-auto">
      <ProposalCard
        v-for="(proposal, index) in proposals"
        :key="proposal.id"
        :proposal="proposal"
        :number="proposals.length - index"
      />
    </div>
  </div>
</template>

<script setup>
import ProposalCard from '@/components/ui/ProposalCard.vue'

defineProps({
  proposals: {
    type: Array,
    required: true
  }
})
</script>
