<template>
  <div class="text-center mb-4 sm:mb-6 md:mb-8 pt-4 sm:pt-6 md:pt-8 px-2">
    <div class="flex items-center justify-center gap-2 mb-2">
      <span class="text-3xl sm:text-4xl md:text-5xl">🌲</span>
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white">ANDERSON INSIDE</h1>
    </div>
    <p class="text-green-100 text-sm sm:text-base md:text-lg px-4">
      Soluções em Logística e Distribuição de Madeira
    </p>
    <div class="mt-3 sm:mt-4 inline-block bg-green-600/50 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full">
      <p class="text-white text-sm sm:text-base font-semibold flex items-center gap-2 justify-center">
        <Building :size="16" class="sm:w-5 sm:h-5" />
        Mais de 33 Anos de Mercado
      </p>
    </div>
  </div>
</template>

<script setup>
import { Building } from 'lucide-vue-next'
</script>
