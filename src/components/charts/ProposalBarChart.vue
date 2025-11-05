<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-bold text-gray-800 mb-4">{{ title }}</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps({
  title: {
    type: String,
    default: 'Propostas por Período'
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
      backgroundColor: 'rgb(34, 197, 94)',
      borderColor: 'rgb(22, 163, 74)',
      borderWidth: 1,
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
      borderColor: 'rgb(34, 197, 94)',
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
