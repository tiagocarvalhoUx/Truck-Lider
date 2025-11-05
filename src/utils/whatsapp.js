import { formatCurrency } from './formatters'

export const enviarWhatsApp = (formData, distancias) => {
  const rotasPrincipal = `${formData.origemPrincipal} → ${formData.destinoPrincipal} (${distancias.principal} km)`

  // Calcular valor total da rota se valorKmTonelada estiver preenchido
  const valorTotalRota = formData.valorKmTonelada && distancias.principal
    ? distancias.principal * parseFloat(formData.valorKmTonelada || 0)
    : null

  const mensagem = `🚚 *PROPOSTA DE FRETE - ANDERSON INSIDE*

📋 *DADOS DO TRANSPORTADOR*
Nome: ${formData.nome}
WhatsApp: ${formData.whatsapp}
Estado: ${formData.estado}
Cidade: ${formData.cidade}
Veículo: ${formData.tipoVeiculo}

🛣️ *ROTAS PREFERIDAS*
${rotasPrincipal}${formData.valorKmTonelada ? `
Valor KM/Tonelada: ${formatCurrency(formData.valorKmTonelada)}
💵 Valor Total da Rota: *${formatCurrency(valorTotalRota)}*` : ''}

💰 *VALORES PROPOSTOS*
Por Tonelada: ${formatCurrency(formData.valorTonelada)}
Por M³: ${formatCurrency(formData.valorM3)}
Por KM: ${formatCurrency(formData.valorKM)}
Valor Fechado: ${formatCurrency(formData.valorFechado)}

💳 *Pagamento:* ${formData.pagamento === 'entrega' ? '100% na entrega' : '70% antecipado + 30% na entrega'}

---
Anderson Inside agradece sua parceria! 🌲`

  const url = `https://wa.me/5518996540492?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}
