<script lang="ts" setup>
import type { G2Spec } from '@antv/g2'
import { Chart } from '@antv/g2'

const props = withDefaults(defineProps<{
  class?: string
  style?: string
  width?: string
  height?: string
  option: G2Spec
}>(), {
  width: '100%',
  height: '100%',
})
const chartRef = ref<HTMLElement | null>(null)

const option = computed(() => props.option)
const isChartEmpty = computed(() => !option.value?.data?.value?.length)

let chart: Chart

onMounted(() => {
  chart = new Chart({
    container: chartRef.value!,
    theme: 'classic',
    type: 'view',
    autoFit: true,
  })
})

watch(option, () => {
  chart.options(option.value)
  chart.render()
})
</script>

<template>
  <slot v-if="isChartEmpty" />
  <div id="chart" ref="chartRef" of-scroll :style="{ width, height }" />
</template>

<style scoped>
</style>
