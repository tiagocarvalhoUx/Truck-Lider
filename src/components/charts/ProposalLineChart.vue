<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-bold text-gray-800 mb-4">{{ title }}</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps({
  title: {
    type: String,
    default: 'Evolução de Propostas'
  },
  labels: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Propostas',
      backgroundColor: 'rgba(249, 115, 22, 0.2)',
      borderColor: 'rgb(249, 115, 22)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      data: props.data
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgb(249, 115, 22)',
      borderWidth: 1
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}
</script>
