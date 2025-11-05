import * as XLSX from 'xlsx'

export const exportToExcel = (data, filename = 'propostas') => {
  try {
    // Preparar dados para exportação
    const exportData = data.map(proposal => ({
      'Data/Hora': formatDateForExcel(proposal.timestamp || proposal.createdAt),
      'Nome': proposal.nome,
      'WhatsApp': proposal.whatsapp,
      'Estado': proposal.estado || '-',
      'Cidade': proposal.cidade || '-',
      'Tipo Veículo': proposal.tipoVeiculo,
      'Origem Principal': proposal.origemPrincipal,
      'Destino Principal': proposal.destinoPrincipal,
      'Distância (km)': proposal.distancias?.principal || 0,
      'Valor KM/Tonelada': formatCurrency(proposal.valorKmTonelada),
      'Valor Total Rota': formatCurrency(calculateRouteTotal(proposal)),
      'Valor/Tonelada': formatCurrency(proposal.valorTonelada),
      'Valor/M³': formatCurrency(proposal.valorM3),
      'Valor/KM': formatCurrency(proposal.valorKM),
      'Valor Fechado': formatCurrency(proposal.valorFechado),
      'Forma Pagamento': proposal.pagamento === 'entrega' ? '100% na entrega' : '70% antecipado + 30% na entrega'
    }))

    // Criar workbook e worksheet
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Propostas')

    // Ajustar largura das colunas
    const colWidths = [
      { wch: 18 }, // Data/Hora
      { wch: 25 }, // Nome
      { wch: 18 }, // WhatsApp
      { wch: 20 }, // Estado
      { wch: 20 }, // Cidade
      { wch: 20 }, // Tipo Veículo
      { wch: 20 }, // Origem
      { wch: 20 }, // Destino
      { wch: 12 }, // Distância
      { wch: 18 }, // Valor KM/Tonelada
      { wch: 18 }, // Valor Total Rota
      { wch: 15 }, // Valor/Ton
      { wch: 15 }, // Valor/M³
      { wch: 15 }, // Valor/KM
      { wch: 15 }, // Valor Fechado
      { wch: 25 }  // Pagamento
    ]
    ws['!cols'] = colWidths

    // Download do arquivo
    const timestamp = new Date().toISOString().split('T')[0]
    XLSX.writeFile(wb, `${filename}_${timestamp}.xlsx`)

    return { success: true }
  } catch (error) {
    console.error('Erro ao exportar para Excel:', error)
    return { success: false, error: error.message }
  }
}

export const exportToCSV = (data, filename = 'propostas') => {
  try {
    // Preparar dados para exportação
    const exportData = data.map(proposal => ({
      'Data/Hora': formatDateForExcel(proposal.timestamp || proposal.createdAt),
      'Nome': proposal.nome,
      'WhatsApp': proposal.whatsapp,
      'Estado': proposal.estado || '-',
      'Cidade': proposal.cidade || '-',
      'Tipo Veículo': proposal.tipoVeiculo,
      'Origem Principal': proposal.origemPrincipal,
      'Destino Principal': proposal.destinoPrincipal,
      'Distância (km)': proposal.distancias?.principal || 0,
      'Valor KM/Tonelada': formatCurrency(proposal.valorKmTonelada),
      'Valor Total Rota': formatCurrency(calculateRouteTotal(proposal)),
      'Valor/Tonelada': formatCurrency(proposal.valorTonelada),
      'Valor/M³': formatCurrency(proposal.valorM3),
      'Valor/KM': formatCurrency(proposal.valorKM),
      'Valor Fechado': formatCurrency(proposal.valorFechado),
      'Forma Pagamento': proposal.pagamento === 'entrega' ? '100% na entrega' : '70% antecipado + 30% na entrega'
    }))

    // Criar CSV
    const ws = XLSX.utils.json_to_sheet(exportData)
    const csv = XLSX.utils.sheet_to_csv(ws)

    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    const timestamp = new Date().toISOString().split('T')[0]

    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}_${timestamp}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return { success: true }
  } catch (error) {
    console.error('Erro ao exportar para CSV:', error)
    return { success: false, error: error.message }
  }
}

const calculateRouteTotal = (proposal) => {
  if (!proposal.valorKmTonelada || !proposal.distancias?.principal) return 0
  return proposal.distancias.principal * parseFloat(proposal.valorKmTonelada || 0)
}

const formatCurrency = (value) => {
  if (!value) return 'R$ 0,00'
  return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`
}

const formatDateForExcel = (timestamp) => {
  if (!timestamp) return ''

  // Se for Timestamp do Firebase
  if (timestamp?.toDate) {
    return timestamp.toDate().toLocaleString('pt-BR')
  }

  // Se for string ISO
  return new Date(timestamp).toLocaleString('pt-BR')
}
