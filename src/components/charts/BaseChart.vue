<script lang="ts" setup>
import type { ECharts, EChartsOption } from 'echarts'
import { init as echartsInit } from 'echarts'

const props = withDefaults(defineProps<{
  class?: string
  style?: string
  width?: string
  height?: string
  option: EChartsOption
}>(), {
  width: '100%',
  height: '100%',
})
const echartRef = ref<HTMLElement | null>(null)
const echartInstance: Ref<ECharts | null> = ref(null)

function initChart() {
  echartInstance.value = echartsInit(echartRef.value!, 'light', {
    renderer: 'canvas',
  })
  echartInstance.value.setOption(props.option)
}

useResize(echartInstance)

onMounted(() => {
  initChart()
})

watch(
  () => props.option,
  () => {
    initChart()
  },
)

onBeforeUnmount(() => {
  if (!echartInstance) {
    return
  }
  echartInstance.value!.dispose()
  echartInstance.value = null
})
</script>

<template>
  <div ref="echartRef" :class="props.class" :style="{ width: props.width, height: props.height }" />
</template>

<style scoped>

</style>
