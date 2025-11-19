<template>
  <div class="header-container">
    <div class="logo-wrapper">
      <img
        src="@/assets/logo-anderson-enside.png"
        alt="Anderson Inside Logística"
        class="header-logo"
        @click="goToHome"
      >
    </div>
    <div class="badge-wrapper">
      <div class="experience-badge">
        <Building :size="18" class="icon" />
        <span class="badge-text">Mais de 33 Anos de Mercado</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Building } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  router.push('/')
}
</script>

<style scoped>
.header-container {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem 1rem 1.5rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  animation: fadeInDown 0.8s ease-out;
}

.header-logo {
  width: 100%;
  max-width: 280px;
  height: auto;
  filter: drop-shadow(0 4px 20px rgba(201, 169, 97, 0.4));
  transition: all 0.3s ease;
  cursor: pointer;
}

.header-logo:hover {
  filter: drop-shadow(0 6px 30px rgba(201, 169, 97, 0.7));
  transform: scale(1.02);
}

.badge-wrapper {
  display: flex;
  justify-content: center;
  animation: fadeIn 1s ease-out 0.3s backwards;
}

.experience-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, rgba(201, 169, 97, 0.2) 0%, rgba(201, 169, 97, 0.1) 100%);
  border: 2px solid #c9a961;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(201, 169, 97, 0.3);
  transition: all 0.3s ease;
}

.experience-badge:hover {
  background: linear-gradient(135deg, rgba(201, 169, 97, 0.3) 0%, rgba(201, 169, 97, 0.2) 100%);
  box-shadow: 0 6px 25px rgba(201, 169, 97, 0.5);
  transform: translateY(-2px);
}

.experience-badge .icon {
  color: #c9a961;
  flex-shrink: 0;
}

.badge-text {
  color: #c9a961;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .header-container {
    padding: 1.5rem 0.5rem 1rem;
    margin-bottom: 1.5rem;
  }

  .header-logo {
    max-width: 200px;
  }

  .logo-wrapper {
    margin-bottom: 1rem;
  }

  .experience-badge {
    padding: 0.6rem 1.2rem;
  }

  .badge-text {
    font-size: 0.85rem;
  }
}

@media (min-width: 768px) {
  .header-container {
    padding: 2.5rem 1rem 2rem;
  }

  .header-logo {
    max-width: 320px;
  }

  .badge-text {
    font-size: 1rem;
  }
}
</style>
