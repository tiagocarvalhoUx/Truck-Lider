<template>
  <div class="cta-banner">
    <div class="cta-content">
      <span class="cta-icon">🔥</span>
      <span class="cta-text">CADASTRE-SE E RECEBA FRETES PREMIUM HOJE!</span>
    </div>
  </div>
</template>

<style scoped>
.cta-banner {
  background: linear-gradient(135deg, #c9a961 0%, #a68a4d 100%);
  padding: 1.25rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}

.cta-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  animation: shine 3s infinite;
}

.cta-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
}

.cta-icon {
  font-size: 1.5rem;
  animation: pulse 2s infinite;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.cta-text {
  color: #000000;
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

@media (min-width: 640px) {
  .cta-banner {
    padding: 1.5rem 1rem;
  }

  .cta-icon {
    font-size: 1.75rem;
  }

  .cta-text {
    font-size: 1.1rem;
  }
}
</style>
