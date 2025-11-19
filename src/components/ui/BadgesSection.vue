<template>
  <div class="badges-section">
    <div class="badge-item">
      <div class="badge-icon">🏆</div>
      <div class="badge-value">33+ Anos</div>
      <div class="badge-label">Experiência</div>
    </div>
    <div class="badge-item">
      <div class="badge-icon">🚚</div>
      <div class="badge-value">15.000+</div>
      <div class="badge-label">Fretes</div>
    </div>
    <div class="badge-item">
      <div class="badge-icon">💡</div>
      <div class="badge-value">Inovação</div>
      <div class="badge-label">Constante</div>
    </div>
    <div class="badge-item">
      <div class="badge-icon">🤝</div>
      <div class="badge-value">Parceiros</div>
      <div class="badge-label">Confiáveis</div>
    </div>
  </div>
</template>

<style scoped>
.badges-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem 1rem;
  background: linear-gradient(135deg, rgba(10, 10, 10, 0.5) 0%, rgba(26, 26, 26, 0.5) 100%);
  border-bottom: 2px solid rgba(201, 169, 97, 0.2);
}

.badge-item {
  text-align: center;
  padding: 1rem 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(201, 169, 97, 0.2);
  transition: all 0.3s ease;
}

.badge-item:hover {
  background: rgba(201, 169, 97, 0.1);
  border-color: rgba(201, 169, 97, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(201, 169, 97, 0.2);
}

.badge-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 2px 8px rgba(201, 169, 97, 0.3));
}

.badge-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: #c9a961;
  margin-bottom: 0.25rem;
  text-shadow: 0 0 10px rgba(201, 169, 97, 0.5);
}

.badge-label {
  font-size: 0.75rem;
  color: rgba(201, 169, 97, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (min-width: 640px) {
  .badges-section {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    padding: 2rem 1.5rem;
  }

  .badge-item {
    padding: 1.25rem 0.75rem;
  }

  .badge-icon {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }

  .badge-value {
    font-size: 1.1rem;
  }

  .badge-label {
    font-size: 0.8rem;
  }
}
</style>
