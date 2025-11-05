<template>
  <div class="text-center mb-8 pt-8">
    <div class="flex items-center justify-center gap-2 mb-2">
      <span class="text-4xl">🌲</span>
      <h1 class="text-4xl font-bold text-white">ANDERSON INSIDE</h1>
    </div>
    <p class="text-green-100 text-lg">Soluções em Logística e Distribuição de Madeira</p>
    <div class="mt-4 inline-block bg-green-600/50 px-6 py-2 rounded-full">
      <p class="text-white font-semibold flex items-center gap-2 justify-center">
        <Building :size="20" />
        Mais de 33 Anos de Mercado
      </p>
    </div>
  </div>
</template>

<script setup>
import { Building } from 'lucide-vue-next'
</script>
