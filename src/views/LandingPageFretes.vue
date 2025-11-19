<template>
  <div class="landing-page">
      <!-- Header -->
      <header class="header">
        <div class="logo-container">
          <img
            src="@/assets/logo-anderson-enside.png"
            alt="Anderson Inside Logística"
            class="logo-image"
            @click="goToHome"
          >
        </div>
      </header>

      <!-- Stats Bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <div class="stat-number">8</div>
          <div class="stat-label">Fretes Disponíveis</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">3</div>
          <div class="stat-label">Saídas Urgentes</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">R$ 280k</div>
          <div class="stat-label">Total Disponível</div>
        </div>
      </div>

      <!-- Alert Box -->
      <div class="alert-box">
        ⚡ NOVOS FRETES ADICIONADOS HÁ 15 MINUTOS! ⚡
      </div>

      <div class="container">
        <!-- Capture Section -->
        <div v-if="!showFreights" class="capture-section">
        <h3>📝 PEDIR NOME E WHATSAPP DO MOTORISTA</h3>
        <p class="subtitle-form">Preencha seus dados para ver os fretes disponíveis e receber ofertas exclusivas!</p>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="motoristaNome">📝 SEU NOME COMPLETO:</label>
            <input
              type="text"
              id="motoristaNome"
              v-model="formData.nome"
              placeholder="Ex: João da Silva"
              required
            >
          </div>

          <div class="form-group">
            <label for="motoristaWhatsApp">📱 SEU WHATSAPP:</label>
            <input
              type="tel"
              id="motoristaWhatsApp"
              v-model="formData.whatsapp"
              @input="formatWhatsApp"
              placeholder="(00) 00000-0000"
              required
            >
          </div>

          <button type="submit" class="btn-submit-lead">
            🚀 VER FRETES DISPONÍVEIS AGORA!
          </button>

          <div class="security-note">
            🔒 Seus dados estão seguros. Usamos apenas para enviar ofertas de fretes.
          </div>
        </form>
      </div>

      <!-- Freights Section -->
      <div v-if="showFreights">
        <h1 class="section-title">🔥 ESCOLHA SEU FRETE AGORA 🔥</h1>

        <!-- Insurance Box -->
        <div class="insurance-mega-box">
          <div class="icon">🛡</div>
          <h2>SEGURO DO FRETE!</h2>
          <p class="highlight-text">Estamos oferecendo <strong>SEGURO COMPLETO</strong> do frete por:</p>
          <div class="mega-price">MENOS DE R$ 17,99/DIA</div>
          <p class="highlight-text">✅ Cobertura total da carga<br>✅ Proteção contra roubos e acidentes<br>✅ Sem burocracia!</p>
        </div>

        <!-- Freights List -->
        <div class="freights-list">
          <!-- Frete Urgente -->
          <div class="freight-card hot">
            <span class="hot-badge">🔥 URGENTE</span>

            <div class="freight-main">
              <div class="freight-route">
                <div class="freight-location">📍 Sinop/MT</div>
                <div class="freight-arrow">↓</div>
                <div class="freight-location">📍 São Paulo/SP</div>
              </div>
              <div class="freight-price-area">
                <div class="price-label">Valor Total:</div>
                <div class="price-value">R$ 45.000</div>
                <div class="partnership-offer">💼 Faça ofertas também! Ganhe parceria conosco</div>
              </div>
            </div>

            <div class="freight-specs">
              <div class="spec-item">
                <div class="spec-icon">🚛</div>
                <div class="spec-label">Veículo</div>
                <div class="spec-value">Carreta LS</div>
              </div>
              <div class="spec-item">
                <div class="spec-icon">📦</div>
                <div class="spec-label">Carga</div>
                <div class="spec-value">62 m³</div>
              </div>
              <div class="spec-item">
                <div class="spec-icon">⚖</div>
                <div class="spec-label">Peso</div>
                <div class="spec-value">31 ton</div>
              </div>
              <div class="spec-item">
                <div class="spec-icon">📏</div>
                <div class="spec-label">Distância</div>
                <div class="spec-value">1.850 km</div>
              </div>
            </div>

            <div class="freight-benefits">
              <span class="benefit-tag">✅ Pagamento 48h</span>
              <span class="benefit-tag">🛡 Seguro < R$ 17,99/dia</span>
            </div>

            <div class="freight-actions">
              <button class="btn-accept" @click="acceptFreight('FRT-001')">✅ ACEITAR FRETE</button>
              <button class="btn-details" @click="showDetails('FRT-001')">📋 MAIS INFO</button>
            </div>
          </div>

          <!-- Frete Normal -->
          <div class="freight-card">
            <div class="freight-main">
              <div class="freight-route">
                <div class="freight-location">📍 Goiânia/GO</div>
                <div class="freight-arrow">↓</div>
                <div class="freight-location">📍 Sorocaba/SP</div>
              </div>
              <div class="freight-price-area">
                <div class="price-label">Valor Total:</div>
                <div class="price-value">R$ 18.500</div>
                <div class="partnership-offer">💼 Faça ofertas também!</div>
              </div>
            </div>

            <div class="freight-specs">
              <div class="spec-item">
                <div class="spec-icon">🚛</div>
                <div class="spec-label">Veículo</div>
                <div class="spec-value">Toco</div>
              </div>
              <div class="spec-item">
                <div class="spec-icon">📦</div>
                <div class="spec-label">Carga</div>
                <div class="spec-value">25 m³</div>
              </div>
              <div class="spec-item">
                <div class="spec-icon">⚖</div>
                <div class="spec-label">Peso</div>
                <div class="spec-value">14 ton</div>
              </div>
              <div class="spec-item">
                <div class="spec-icon">📏</div>
                <div class="spec-label">Distância</div>
                <div class="spec-value">820 km</div>
              </div>
            </div>

            <div class="freight-benefits">
              <span class="benefit-tag">✅ Pagamento 48h</span>
              <span class="benefit-tag">🛡 Seguro < R$ 17,99/dia</span>
            </div>

            <div class="freight-actions">
              <button class="btn-accept" @click="acceptFreight('FRT-002')">✅ ACEITAR FRETE</button>
              <button class="btn-details" @click="showDetails('FRT-002')">📋 MAIS INFO</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <p><strong>ENSIDE MADEIRAS</strong></p>
      <p>WhatsApp: (18) 99999-9999</p>
      <p>contato@ensidegroup.com.br</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showFreights = ref(false)
const formData = ref({
  nome: '',
  whatsapp: ''
})

const goToHome = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  router.push('/')
}

const formatWhatsApp = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)

  if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3')
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2')
  } else if (value.length > 0) {
    value = value.replace(/^(\d*)/, '($1')
  }

  formData.value.whatsapp = value
}

const handleSubmit = () => {
  // Redirecionar para o formulário Anderson Inside
  router.push({
    path: '/formulario',
    query: {
      nome: formData.value.nome,
      whatsapp: formData.value.whatsapp
    }
  })
}

const acceptFreight = (freteId) => {
  alert(`✅ FRETE ACEITO!\n\nEstamos enviando os detalhes para seu WhatsApp agora!\n\nCódigo: ${freteId}\n\n🛡 Seguro por menos de R$ 17,99/dia incluso!`)
}

const showDetails = (freteId) => {
  alert(`📋 DETALHES DO FRETE ${freteId}\n\nVocê receberá no WhatsApp:\n\n✅ Endereços completos\n✅ Contato do fornecedor\n✅ Documentação\n🛡 Informações do seguro\n📄 CT-e`)
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
}

.header {
  background: #000000;
  padding: 40px 20px;
  text-align: center;
  border-bottom: 5px solid #c9a961;
  box-shadow: 0 5px 30px rgba(201, 169, 97, 0.3);
}

.logo-container {
  max-width: 250px;
  margin: 0 auto;
  animation: fadeInDown 1s ease-out;
}

.logo-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(201, 169, 97, 0.6));
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo-image:hover {
  filter: drop-shadow(0 0 40px rgba(201, 169, 97, 1));
  transform: scale(1.02);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stats-bar {
  background: #000000;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 4em;
  color: #00ff00;
  font-weight: 900;
  text-shadow: 0 0 30px rgba(0, 255, 0, 1);
  margin-bottom: 10px;
}

.stat-label {
  font-size: 1.1em;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
}

.alert-box {
  background: linear-gradient(135deg, #ff0000 0%, #ff6600 100%);
  padding: 25px;
  text-align: center;
  font-size: 1.5em;
  font-weight: 900;
  animation: pulse 2s infinite;
  box-shadow: 0 5px 40px rgba(255, 0, 0, 0.8);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 20px;
}

.capture-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  border: 5px solid #c9a961;
  border-radius: 20px;
  padding: 50px;
  margin-bottom: 60px;
  box-shadow: 0 0 50px rgba(201, 169, 97, 0.5);
}

.capture-section h3 {
  font-size: 2.5em;
  color: #c9a961;
  text-align: center;
  font-weight: 900;
  margin-bottom: 15px;
  text-transform: uppercase;
  text-shadow: 0 0 30px rgba(201, 169, 97, 0.8);
}

.subtitle-form {
  font-size: 1.3em;
  color: #ffffff;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  font-size: 1.2em;
  color: #c9a961;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.form-group input {
  width: 100%;
  padding: 18px;
  border: 3px solid #c9a961;
  border-radius: 10px;
  font-size: 1.3em;
  background: #000000;
  color: #ffffff;
  font-weight: 600;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #00ff00;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
}

.form-group input::placeholder {
  color: #666666;
}

.btn-submit-lead {
  width: 100%;
  padding: 25px;
  background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
  color: #000000;
  border: none;
  border-radius: 15px;
  font-size: 1.8em;
  font-weight: 900;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s;
  box-shadow: 0 0 40px rgba(0, 255, 0, 0.7);
  margin-top: 10px;
}

.btn-submit-lead:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 60px rgba(0, 255, 0, 1);
}

.security-note {
  text-align: center;
  margin-top: 20px;
  font-size: 1em;
  color: #999999;
}

.section-title {
  font-size: 3em;
  color: #c9a961;
  text-align: center;
  margin-bottom: 50px;
  font-weight: 900;
  text-transform: uppercase;
  text-shadow: 0 0 30px rgba(201, 169, 97, 0.8);
}

.insurance-mega-box {
  background: linear-gradient(135deg, #003300 0%, #001a00 100%);
  border: 5px solid #00ff00;
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 50px;
  text-align: center;
  box-shadow: 0 0 50px rgba(0, 255, 0, 0.6);
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  from { box-shadow: 0 0 50px rgba(0, 255, 0, 0.6); }
  to { box-shadow: 0 0 80px rgba(0, 255, 0, 1); }
}

.insurance-mega-box .icon {
  font-size: 5em;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 30px rgba(0, 255, 0, 1));
}

.insurance-mega-box h2 {
  font-size: 2.8em;
  color: #00ff00;
  font-weight: 900;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-shadow: 0 0 30px rgba(0, 255, 0, 1);
}

.insurance-mega-box .highlight-text {
  font-size: 1.8em;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 25px;
  line-height: 1.6;
}

.insurance-mega-box .mega-price {
  font-size: 4.5em;
  color: #00ff00;
  font-weight: 900;
  margin: 30px 0;
  text-shadow: 0 0 40px rgba(0, 255, 0, 1);
}

.freights-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.freight-card {
  background: #0a0a0a;
  border: 3px solid #1a1a1a;
  border-radius: 20px;
  padding: 35px;
  transition: all 0.3s;
  position: relative;
}

.freight-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #00ff00 0%, #00cc00 100%);
  border-radius: 20px 20px 0 0;
}

.freight-card:hover {
  transform: translateX(15px);
  border-color: #00ff00;
  box-shadow: 0 10px 60px rgba(0, 255, 0, 0.4);
}

.freight-card.hot {
  border-color: #ff0000;
  background: #1a0000;
}

.freight-card.hot::before {
  background: linear-gradient(90deg, #ff0000 0%, #ff6600 100%);
}

.hot-badge {
  position: absolute;
  top: 25px;
  right: 25px;
  background: #ff0000;
  color: #ffffff;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 900;
  font-size: 1.1em;
  text-transform: uppercase;
  box-shadow: 0 0 30px rgba(255, 0, 0, 1);
  animation: pulse 1.5s infinite;
}

.freight-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 30px;
}

.freight-route {
  flex: 1;
  min-width: 220px;
}

.freight-location {
  font-size: 1.8em;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 12px;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
}

.freight-arrow {
  color: #ff6600;
  font-size: 2.2em;
  margin: 12px 0;
}

.freight-price-area {
  text-align: right;
}

.price-label {
  font-size: 1.1em;
  color: #cccccc;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-weight: 600;
}

.price-value {
  font-size: 3.5em;
  color: #00ff00;
  font-weight: 900;
  text-shadow: 0 0 30px rgba(0, 255, 0, 1);
  margin-bottom: 15px;
  line-height: 1;
}

.partnership-offer {
  background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
  color: #000000;
  padding: 15px 25px;
  border-radius: 30px;
  font-weight: 900;
  font-size: 1.1em;
  text-transform: uppercase;
  display: inline-block;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.8);
  animation: pulse 2s infinite;
}

.freight-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  padding: 25px;
  background: #000000;
  border-radius: 15px;
  border: 2px solid #1a1a1a;
}

.spec-item {
  text-align: center;
}

.spec-icon {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.spec-label {
  font-size: 0.9em;
  color: #999999;
  text-transform: uppercase;
  margin-bottom: 8px;
  font-weight: 600;
}

.spec-value {
  font-size: 1.5em;
  color: #ffffff;
  font-weight: 900;
}

.freight-benefits {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.benefit-tag {
  background: #000000;
  padding: 12px 20px;
  border-radius: 25px;
  border: 2px solid #00ff00;
  color: #00ff00;
  font-weight: 700;
  font-size: 1em;
}

.freight-actions {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 20px;
}

.btn-accept {
  padding: 25px;
  background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
  color: #000000;
  border: none;
  border-radius: 12px;
  font-size: 1.6em;
  font-weight: 900;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.6);
}

.btn-accept:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 50px rgba(0, 255, 0, 1);
}

.btn-details {
  padding: 25px;
  background: #1a1a1a;
  color: #ffffff;
  border: 3px solid #666;
  border-radius: 12px;
  font-size: 1.3em;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s;
}

.btn-details:hover {
  background: #333;
  border-color: #00ff00;
}

.footer {
  background: #000000;
  padding: 50px 20px;
  text-align: center;
  border-top: 3px solid #1a1a1a;
  margin-top: 80px;
}

.footer p {
  color: #666;
  margin-bottom: 12px;
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;
  }

  .logo-container {
    max-width: 180px;
  }

  .logo-image {
    max-width: 150px;
  }

  .stats-bar {
    gap: 30px;
  }

  .stat-number {
    font-size: 3em;
  }

  .capture-section {
    padding: 30px 20px;
  }

  .capture-section h3 {
    font-size: 1.8em;
  }

  .subtitle-form {
    font-size: 1.1em;
  }

  .section-title {
    font-size: 2em;
  }

  .freight-main {
    flex-direction: column;
  }

  .freight-price-area {
    text-align: left;
    width: 100%;
  }

  .freight-specs {
    grid-template-columns: repeat(2, 1fr);
  }

  .freight-actions {
    grid-template-columns: 1fr;
  }

  .price-value {
    font-size: 2.5em;
  }

  .btn-accept {
    font-size: 1.3em;
    padding: 20px;
  }

  .btn-details {
    font-size: 1.1em;
    padding: 20px;
  }
}
</style>
