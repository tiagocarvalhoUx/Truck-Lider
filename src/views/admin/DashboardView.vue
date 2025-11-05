<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <nav class="bg-gradient-to-r from-green-700 to-green-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <div class="flex items-center gap-2 sm:gap-3">
            <span class="text-2xl sm:text-3xl">🌲</span>
            <div>
              <h1 class="text-white font-bold text-base sm:text-xl">ANDERSON INSIDE</h1>
              <p class="text-green-100 text-xs hidden sm:block">Painel Administrativo</p>
            </div>
          </div>

          <div class="flex items-center gap-2 sm:gap-4">
            <div class="text-white text-xs sm:text-sm hidden md:block">
              <p class="font-semibold">{{ user?.email }}</p>
            </div>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition flex items-center gap-1 sm:gap-2 text-xs sm:text-base"
            >
              <LogOut :size="16" class="sm:w-[18px] sm:h-[18px]" />
              <span class="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-semibold">Total de Propostas</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ proposals.length }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-lg">
              <FileText class="text-blue-600" :size="32" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-semibold">Esta Semana</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ statsThisWeek }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-lg">
              <TrendingUp class="text-green-600" :size="32" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-semibold">Caminhoneiros</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ uniqueDrivers }}</p>
            </div>
            <div class="bg-orange-100 p-3 rounded-lg">
              <Users class="text-orange-600" :size="32" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-semibold">Veículos Ativos</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ uniqueVehicles }}</p>
            </div>
            <div class="bg-purple-100 p-3 rounded-lg">
              <Truck class="text-purple-600" :size="32" />
            </div>
          </div>
        </div>
      </div>

      <!-- Período de Análise -->
      <div class="bg-white rounded-lg shadow p-4 mb-8">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-800">Análise de Dados</h2>
          <div class="flex gap-2">
            <button
              v-for="period in periods"
              :key="period.value"
              @click="selectedPeriod = period.value"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition',
                selectedPeriod === period.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              ]"
            >
              {{ period.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Gráficos -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Gráfico de Linha -->
        <ProposalLineChart
          :title="chartLineTitle"
          :labels="chartLabels"
          :data="chartData"
        />

        <!-- Gráfico de Barras -->
        <ProposalBarChart
          title="Propostas por Período"
          :labels="chartLabels"
          :data="chartData"
        />

        <!-- Gráfico de Pizza - Veículos -->
        <ProposalPieChart
          title="Distribuição por Tipo de Veículo"
          :labels="vehicleLabels"
          :data="vehicleData"
        />

        <!-- Gráfico de Pizza - Rotas -->
        <ProposalPieChart
          title="Top 5 Rotas Mais Solicitadas"
          :labels="routeLabels"
          :data="routeData"
        />
      </div>

      <!-- Filters & Export -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Filtrar por</label>
              <select
                v-model="filterType"
                class="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="">Todos os Veículos</option>
                <option v-for="tipo in vehicleTypes" :key="tipo" :value="tipo">{{ tipo }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Nome, cidade, estado, whatsapp..."
                class="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none w-64"
              />
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="handleExportExcel"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <Download :size="18" />
              Exportar Excel
            </button>
            <button
              @click="handleExportCSV"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <FileDown :size="18" />
              Exportar CSV
            </button>
            <button
              @click="loadData"
              :disabled="loading"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw :size="18" :class="{ 'animate-spin': loading }" />
              Atualizar
            </button>
          </div>
        </div>
      </div>

      <!-- Proposals Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Database :size="24" />
            Propostas Cadastradas ({{ filteredProposals.length }})
          </h2>
        </div>

        <div v-if="loading" class="p-12 text-center">
          <RefreshCw class="animate-spin mx-auto text-green-600 mb-4" :size="48" />
          <p class="text-gray-600">Carregando propostas...</p>
        </div>

        <div v-else-if="filteredProposals.length === 0" class="p-12 text-center">
          <Package class="mx-auto text-gray-400 mb-4" :size="64" />
          <p class="text-gray-600 text-lg">Nenhuma proposta encontrada</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Data</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Motorista</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contato</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Veículo</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rota</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Valores</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="proposal in paginatedProposals" :key="proposal.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ formatDate(proposal.timestamp || proposal.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-semibold text-gray-800">{{ proposal.nome }}</div>
                  <div class="text-sm text-gray-500">{{ proposal.cidade }} - {{ proposal.estado }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ proposal.whatsapp }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ proposal.tipoVeiculo }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  <div class="font-semibold">{{ proposal.origemPrincipal }} → {{ proposal.destinoPrincipal }}</div>
                  <div class="text-xs text-gray-500">{{ proposal.distancias?.principal || 0 }} km</div>
                </td>
                <td class="px-6 py-4 text-sm">
                  <div class="space-y-1">
                    <div class="text-xs"><span class="font-semibold">Ton:</span> {{ formatCurrency(proposal.valorTonelada) }}</div>
                    <div class="text-xs"><span class="font-semibold">KM:</span> {{ formatCurrency(proposal.valorKM) }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex gap-2">
                    <button
                      @click="viewProposal(proposal)"
                      class="text-blue-600 hover:text-blue-800 transition"
                      title="Ver detalhes"
                    >
                      <Eye :size="18" />
                    </button>
                    <button
                      @click="deleteProposal(proposal.id)"
                      class="text-red-600 hover:text-red-800 transition"
                      title="Excluir"
                    >
                      <Trash2 :size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="filteredProposals.length > itemsPerPage" class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredProposals.length) }} de {{ filteredProposals.length }} propostas
          </div>
          <div class="flex gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage >= totalPages"
              class="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <div v-if="selectedProposal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="selectedProposal = null">
      <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-2xl font-bold text-gray-800">Detalhes da Proposta</h3>
          <button @click="selectedProposal = null" class="text-gray-400 hover:text-gray-600">
            <X :size="24" />
          </button>
        </div>

        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-semibold text-gray-500">Nome</p>
              <p class="text-lg font-bold">{{ selectedProposal.nome }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-500">WhatsApp</p>
              <p class="text-lg font-bold">{{ selectedProposal.whatsapp }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-500">Estado</p>
              <p class="text-lg">{{ selectedProposal.estado }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-500">Cidade</p>
              <p class="text-lg">{{ selectedProposal.cidade }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-500">Veículo</p>
              <p class="text-lg">{{ selectedProposal.tipoVeiculo }}</p>
            </div>
          </div>

          <hr class="my-4" />

          <div>
            <p class="text-sm font-semibold text-gray-500 mb-2">Rota Principal</p>
            <p class="text-lg font-bold">
              {{ selectedProposal.origemPrincipal }} → {{ selectedProposal.destinoPrincipal }}
            </p>
            <p class="text-sm text-gray-600">{{ selectedProposal.distancias?.principal || 0 }} km</p>
          </div>

          <hr class="my-4" />

          <div>
            <p class="text-sm font-semibold text-gray-500 mb-2">Valores Propostos</p>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-yellow-50 p-3 rounded-lg">
                <p class="text-xs text-gray-600">Por Tonelada</p>
                <p class="text-xl font-bold text-yellow-700">{{ formatCurrency(selectedProposal.valorTonelada) }}</p>
              </div>
              <div class="bg-yellow-50 p-3 rounded-lg">
                <p class="text-xs text-gray-600">Por M³</p>
                <p class="text-xl font-bold text-yellow-700">{{ formatCurrency(selectedProposal.valorM3) }}</p>
              </div>
              <div class="bg-yellow-50 p-3 rounded-lg">
                <p class="text-xs text-gray-600">Por KM</p>
                <p class="text-xl font-bold text-yellow-700">{{ formatCurrency(selectedProposal.valorKM) }}</p>
              </div>
              <div class="bg-yellow-50 p-3 rounded-lg">
                <p class="text-xs text-gray-600">Valor Fechado</p>
                <p class="text-xl font-bold text-yellow-700">{{ formatCurrency(selectedProposal.valorFechado) }}</p>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 p-4 rounded-lg">
            <p class="text-sm font-semibold text-blue-800">Forma de Pagamento</p>
            <p class="text-blue-700">
              {{ selectedProposal.pagamento === 'entrega' ? '100% na entrega' : '70% antecipado + 30% na entrega' }}
            </p>
          </div>

          <div class="text-xs text-gray-500">
            <p>Cadastrado em: {{ formatDate(selectedProposal.timestamp || selectedProposal.createdAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useFirestore } from '@/composables/useFirestore'
import { exportToExcel, exportToCSV } from '@/utils/exportData'
import { formatCurrency, formatDate } from '@/utils/formatters'
import {
  LogOut, FileText, TrendingUp, Users, Truck, Download, FileDown,
  RefreshCw, Database, Package, Eye, Trash2, X
} from 'lucide-vue-next'
import ProposalLineChart from '@/components/charts/ProposalLineChart.vue'
import ProposalBarChart from '@/components/charts/ProposalBarChart.vue'
import ProposalPieChart from '@/components/charts/ProposalPieChart.vue'
import { VEHICLE_TYPES } from '@/constants'

const router = useRouter()
const { user, logout } = useAuth()
const { documents: proposals, loading, getDocuments, deleteDocument } = useFirestore('proposals')

const filterType = ref('')
const searchTerm = ref('')
const selectedProposal = ref(null)
const currentPage = ref(1)
const itemsPerPage = 20
const selectedPeriod = ref('month')

const periods = [
  { label: '7 Dias', value: 'week' },
  { label: '30 Dias', value: 'month' },
  { label: '90 Dias', value: 'quarter' },
  { label: 'Tudo', value: 'all' }
]

const vehicleTypes = VEHICLE_TYPES

onMounted(() => {
  loadData()
})

const loadData = async () => {
  await getDocuments('createdAt', 'desc')
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

// Estatísticas
const statsThisWeek = computed(() => {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  return proposals.value.filter(p => {
    const proposalDate = p.createdAt?.toDate ? p.createdAt.toDate() : new Date(p.timestamp)
    return proposalDate >= oneWeekAgo
  }).length
})

const uniqueDrivers = computed(() => {
  const drivers = new Set(proposals.value.map(p => p.whatsapp))
  return drivers.size
})

const uniqueVehicles = computed(() => {
  const vehicles = new Set(proposals.value.map(p => p.tipoVeiculo))
  return vehicles.size
})

// Dados filtrados por período
const periodFilteredProposals = computed(() => {
  if (selectedPeriod.value === 'all') return proposals.value

  const now = new Date()
  let daysAgo = 30 // default: month

  switch (selectedPeriod.value) {
    case 'week':
      daysAgo = 7
      break
    case 'quarter':
      daysAgo = 90
      break
  }

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysAgo)

  return proposals.value.filter(p => {
    const proposalDate = p.createdAt?.toDate ? p.createdAt.toDate() : new Date(p.timestamp)
    return proposalDate >= startDate
  })
})

// Dados para gráficos de linha e barra
const chartLineTitle = computed(() => {
  const periodLabels = {
    week: 'Últimos 7 Dias',
    month: 'Últimos 30 Dias',
    quarter: 'Últimos 90 Dias',
    all: 'Todo o Período'
  }
  return `Evolução de Propostas - ${periodLabels[selectedPeriod.value]}`
})

const chartLabels = computed(() => {
  const labels = []
  const days = selectedPeriod.value === 'week' ? 7 : selectedPeriod.value === 'month' ? 30 : selectedPeriod.value === 'quarter' ? 90 : 30

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    labels.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }))
  }

  return labels
})

const chartData = computed(() => {
  const days = selectedPeriod.value === 'week' ? 7 : selectedPeriod.value === 'month' ? 30 : selectedPeriod.value === 'quarter' ? 90 : 30
  const counts = new Array(days).fill(0)

  periodFilteredProposals.value.forEach(p => {
    const proposalDate = p.createdAt?.toDate ? p.createdAt.toDate() : new Date(p.timestamp)
    const now = new Date()
    const diffTime = now - proposalDate
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < days) {
      const index = days - 1 - diffDays
      if (index >= 0 && index < days) {
        counts[index]++
      }
    }
  })

  return counts
})

// Dados para gráfico de pizza - Veículos
const vehicleLabels = computed(() => {
  const vehicleCounts = {}
  periodFilteredProposals.value.forEach(p => {
    const vehicle = p.tipoVeiculo || 'Não informado'
    vehicleCounts[vehicle] = (vehicleCounts[vehicle] || 0) + 1
  })
  return Object.keys(vehicleCounts)
})

const vehicleData = computed(() => {
  const vehicleCounts = {}
  periodFilteredProposals.value.forEach(p => {
    const vehicle = p.tipoVeiculo || 'Não informado'
    vehicleCounts[vehicle] = (vehicleCounts[vehicle] || 0) + 1
  })
  return Object.values(vehicleCounts)
})

// Dados para gráfico de pizza - Rotas
const routeLabels = computed(() => {
  const routeCounts = {}
  periodFilteredProposals.value.forEach(p => {
    if (p.origemPrincipal && p.destinoPrincipal) {
      const route = `${p.origemPrincipal} → ${p.destinoPrincipal}`
      routeCounts[route] = (routeCounts[route] || 0) + 1
    }
  })

  // Pegar top 5 rotas
  const sortedRoutes = Object.entries(routeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return sortedRoutes.map(r => r[0])
})

const routeData = computed(() => {
  const routeCounts = {}
  periodFilteredProposals.value.forEach(p => {
    if (p.origemPrincipal && p.destinoPrincipal) {
      const route = `${p.origemPrincipal} → ${p.destinoPrincipal}`
      routeCounts[route] = (routeCounts[route] || 0) + 1
    }
  })

  // Pegar top 5 rotas
  const sortedRoutes = Object.entries(routeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return sortedRoutes.map(r => r[1])
})

// Filtros
const filteredProposals = computed(() => {
  let filtered = proposals.value

  if (filterType.value) {
    filtered = filtered.filter(p => p.tipoVeiculo === filterType.value)
  }

  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.nome?.toLowerCase().includes(search) ||
      p.estado?.toLowerCase().includes(search) ||
      p.cidade?.toLowerCase().includes(search) ||
      p.whatsapp?.includes(search)
    )
  }

  return filtered
})

// Paginação
const totalPages = computed(() => Math.ceil(filteredProposals.value.length / itemsPerPage))

const paginatedProposals = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProposals.value.slice(start, end)
})

// Ações
const viewProposal = (proposal) => {
  selectedProposal.value = proposal
}

const deleteProposal = async (id) => {
  if (confirm('Tem certeza que deseja excluir esta proposta?')) {
    const result = await deleteDocument(id)
    if (result.success) {
      await loadData()
    } else {
      alert('Erro ao excluir proposta')
    }
  }
}

const handleExportExcel = () => {
  const result = exportToExcel(filteredProposals.value, 'propostas_anderson_inside')
  if (result.success) {
    alert('Arquivo Excel exportado com sucesso!')
  } else {
    alert('Erro ao exportar arquivo')
  }
}

const handleExportCSV = () => {
  const result = exportToCSV(filteredProposals.value, 'propostas_anderson_inside')
  if (result.success) {
    alert('Arquivo CSV exportado com sucesso!')
  } else {
    alert('Erro ao exportar arquivo')
  }
}
</script>
