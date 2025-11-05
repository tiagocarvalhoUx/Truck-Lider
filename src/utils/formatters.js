export const formatCurrency = (value) => {
  if (!value) return 'R$ 0,00'
  return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`
}

export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString('pt-BR')
}
