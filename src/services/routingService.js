/**
 * Serviço de Roteamento para calcular distâncias reais entre cidades
 * Usa OSRM (Open Source Routing Machine) - 100% gratuito
 * Alternativa: OpenRouteService (requer API key gratuita)
 */

// Função para geocodificar cidade (obter lat/lon)
const geocodeCidade = async (cidade) => {
  try {
    // Usando Nominatim (OpenStreetMap) - gratuito e sem API key
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
      `q=${encodeURIComponent(cidade + ', Brasil')}&` +
      `format=json&` +
      `limit=1&` +
      `addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Anderson Inside - Truck Routing App'
        }
      }
    )

    if (!response.ok) {
      throw new Error('Erro ao buscar coordenadas da cidade')
    }

    const data = await response.json()

    if (data.length === 0) {
      throw new Error('Cidade não encontrada')
    }

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name
    }
  } catch (error) {
    console.error('Erro no geocoding:', error)
    throw error
  }
}

// Função para calcular distância usando OSRM (gratuito)
const calcularDistanciaOSRM = async (origem, destino) => {
  try {
    // 1. Geocodificar origem e destino
    const [coordOrigem, coordDestino] = await Promise.all([
      geocodeCidade(origem),
      geocodeCidade(destino)
    ])

    // 2. Calcular rota usando OSRM
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/` +
      `${coordOrigem.lon},${coordOrigem.lat};` +
      `${coordDestino.lon},${coordDestino.lat}?` +
      `overview=false&` +
      `geometries=geojson`
    )

    if (!response.ok) {
      throw new Error('Erro ao calcular rota')
    }

    const data = await response.json()

    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      throw new Error('Nenhuma rota encontrada')
    }

    // Distância em metros, converter para km
    const distanciaKm = Math.round(data.routes[0].distance / 1000)

    // Tempo em segundos, converter para horas
    const tempoHoras = Math.round(data.routes[0].duration / 3600 * 10) / 10

    return {
      distancia: distanciaKm,
      tempo: tempoHoras,
      origem: coordOrigem.displayName,
      destino: coordDestino.displayName
    }
  } catch (error) {
    console.error('Erro ao calcular distância:', error)
    throw error
  }
}

// Função alternativa usando OpenRouteService (requer API key gratuita)
// Para usar: registre-se em https://openrouteservice.org/dev/#/signup
const calcularDistanciaOpenRouteService = async (origem, destino, apiKey) => {
  try {
    // 1. Geocodificar origem e destino
    const [coordOrigem, coordDestino] = await Promise.all([
      geocodeCidade(origem),
      geocodeCidade(destino)
    ])

    // 2. Calcular rota usando OpenRouteService
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?` +
      `start=${coordOrigem.lon},${coordOrigem.lat}&` +
      `end=${coordDestino.lon},${coordDestino.lat}`,
      {
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error('Erro ao calcular rota com OpenRouteService')
    }

    const data = await response.json()

    if (!data.features || data.features.length === 0) {
      throw new Error('Nenhuma rota encontrada')
    }

    const route = data.features[0].properties.segments[0]
    const distanciaKm = Math.round(route.distance / 1000)
    const tempoHoras = Math.round(route.duration / 3600 * 10) / 10

    return {
      distancia: distanciaKm,
      tempo: tempoHoras,
      origem: coordOrigem.displayName,
      destino: coordDestino.displayName
    }
  } catch (error) {
    console.error('Erro ao calcular distância com OpenRouteService:', error)
    throw error
  }
}

// Função principal com fallback para cálculo estimado
export const calcularDistanciaRota = async (origem, destino) => {
  try {
    // Validar entradas
    if (!origem || !destino) {
      throw new Error('Origem e destino são obrigatórios')
    }

    if (origem.trim() === '' || destino.trim() === '') {
      throw new Error('Origem e destino não podem estar vazios')
    }

    // Tentar calcular com OSRM (gratuito)
    const resultado = await calcularDistanciaOSRM(origem, destino)

    return {
      success: true,
      distancia: resultado.distancia,
      tempo: resultado.tempo,
      origem: resultado.origem,
      destino: resultado.destino,
      metodo: 'OSRM (API Real)'
    }
  } catch (error) {
    console.error('Erro ao calcular rota:', error)

    // Fallback: cálculo aproximado (crow-flies * 1.3)
    return {
      success: false,
      distancia: 0,
      tempo: 0,
      origem,
      destino,
      metodo: 'Erro',
      erro: error.message
    }
  }
}

// Função auxiliar para calcular múltiplas rotas
export const calcularMultiplasRotas = async (rotas) => {
  const promises = rotas.map(rota =>
    calcularDistanciaRota(rota.origem, rota.destino)
  )

  return Promise.all(promises)
}
