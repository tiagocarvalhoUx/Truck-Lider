<template>
  <div class="app-footer">
    <div class="footer-content">
      <p class="footer-title">ANDERSON INSIDE © 2024</p>
      <p class="footer-subtitle">Soluções em Logística e Distribuição de Madeira</p>
      <p class="footer-stats">33+ Anos de Mercado | Inovação Constante</p>
      <p class="footer-quote">"Vendemos soluções, tecnologia e uma experiência inovadora"</p>
    </div>
  </div>
</template>

<style scoped>
.app-footer {
  text-align: center;
  margin-top: 3rem;
  padding: 2.5rem 1rem;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  border-top: 1px solid rgba(201, 169, 97, 0.2);
}

.footer-content {
  max-width: 600px;
  margin: 0 auto;
}

.footer-title {
  color: #c9a961;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 15px rgba(201, 169, 97, 0.5);
}

.footer-subtitle {
  color: rgba(201, 169, 97, 0.9);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.footer-stats {
  color: rgba(201, 169, 97, 0.8);
  font-size: 0.85rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(201, 169, 97, 0.15);
}

.footer-quote {
  color: rgba(201, 169, 97, 0.7);
  font-size: 0.8rem;
  margin-top: 1rem;
  font-style: italic;
  line-height: 1.5;
}

@media (min-width: 640px) {
  .app-footer {
    padding: 3rem 1rem;
  }

  .footer-title {
    font-size: 1.25rem;
  }

  .footer-subtitle {
    font-size: 1rem;
  }

  .footer-stats {
    font-size: 0.95rem;
  }

  .footer-quote {
    font-size: 0.9rem;
  }
}
</style>
