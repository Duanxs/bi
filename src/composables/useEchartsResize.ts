import type { ECharts } from 'echarts'

export function useResize(chart: Ref<ECharts | null>) {
  const $_resizeHandler = ref<EventListenerOrEventListenerObject | null>(null)

  const resize = () => {
    chart.value?.resize()
  }
  const initListener = () => {
    $_resizeHandler.value = useDebounceFn(() => {
      resize()
    }, 100)
    window.addEventListener('resize', $_resizeHandler.value)
  }

  const destroyListener = () => {
    window.removeEventListener('resize', $_resizeHandler.value!)
    $_resizeHandler.value = null
  }

  onMounted(() => {
    initListener()
  })

  onBeforeUnmount(() => {
    destroyListener()
  })

  onActivated(() => {
    if (!$_resizeHandler.value) {
      // 避免重复初始化
      initListener()
    }

    // 激活保活图表时，自动调整大小
    resize()
  })

  onDeactivated(() => {
    destroyListener()
  })
}
