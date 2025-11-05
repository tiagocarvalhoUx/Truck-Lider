<template>
  <div class="flex items-center gap-3 mb-6">
    <div class="bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
      {{ step }}
    </div>
    <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  step: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>
