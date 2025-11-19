<template>
  <div class="step-header">
    <div class="step-number">
      {{ step }}
    </div>
    <h2 class="step-title">{{ title }}</h2>
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

<style scoped>
.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(201, 169, 97, 0.2);
}

.step-number {
  background: linear-gradient(135deg, #c9a961 0%, #a68a4d 100%);
  color: #000000;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow:
    0 4px 15px rgba(201, 169, 97, 0.4),
    inset 0 2px 5px rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.step-title {
  color: #c9a961;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(201, 169, 97, 0.3);
}

@media (max-width: 640px) {
  .step-header {
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .step-number {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }

  .step-title {
    font-size: 1.1rem;
  }
}
</style>
