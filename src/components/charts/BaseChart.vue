<script lang="ts" setup>
import { Chart } from '@antv/g2'
import type { G2ViewTree } from '@antv/g2/lib/runtime'

const props = withDefaults(defineProps<{
  class?: string
  style?: string
  width?: string
  height?: string
  option: G2ViewTree
}>(), {
  width: '100%',
  height: '100%',
})
const chartRef = ref<HTMLElement | null>(null)

const option = computed(() => props.option)

let chart: Chart
// = new Chart({
//   // container: chartRef.value!,
//   // container: 'chart',
//   type: 'view',
//   theme: 'classic',
//   autoFit: true,
//   // theme: 'classic',
// })

onMounted(() => {
  chart = new Chart({
    container: chartRef.value!,
    theme: 'classic',
    type: 'view',
    autoFit: true,
  })
  // chart.render()
})

watchEffect(() => {
  console.log('watchEffect ~ option:', option.value)
  if (chart) {
    chart.clear()
    chart.options(option.value)
    chart.render()
  }
  // if (!chart)
  //   return
  // if (!option.value)
  //   return chart.destroy()
})
</script>

<template>
  <div id="chart" ref="chartRef" of-scroll :style="{ width, height }" />
</template>

<style scoped>

</style>
