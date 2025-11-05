<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-bold text-gray-800 mb-4">{{ title }}</h3>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const props = defineProps({
  title: {
    type: String,
    default: 'Distribuição'
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
      backgroundColor: [
        'rgb(249, 115, 22)',
        'rgb(34, 197, 94)',
        'rgb(59, 130, 246)',
        'rgb(168, 85, 247)',
        'rgb(236, 72, 153)'
      ],
      borderColor: '#fff',
      borderWidth: 2,
      data: props.data
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 15,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleColor: '#fff',
      bodyColor: '#fff'
    }
  }
}
</script>
