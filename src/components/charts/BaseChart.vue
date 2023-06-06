<script lang="ts" setup>
import type { ECharts, EChartsOption } from 'echarts'
import { ComponentView, init as echartsInit, graphic, use } from 'echarts'

const props = withDefaults(defineProps<{
  class?: string
  style?: string
  width?: string
  height?: string
  option: Ref<EChartsOption>
}>(), {
  width: '1500px',
  height: '100%',
})
const echartRef = ref<HTMLElement | null>(null)
// ref 更改大小会报错
// https://github.com/apache/echarts/issues/14974#issuecomment-842812114
const echartInstance = shallowRef<ECharts | null>(null)
const option = computed(() => props.option.value)

function initChart() {
  echartInstance.value = echartsInit(echartRef.value!, 'light', {
    renderer: 'canvas',
  })
  // echartInstance.value.setOption(option.value)
}
// @ts-expect-error 略略略
// 获取原始图例组件类
const LegendPlainView = ComponentView.getClass('legend', 'plain')
// const LegendPlainModel = ComponentModel.getClass('legend', 'plain')
// 扩展原始图例组件类
class MyLegendView extends LegendPlainView {
  constructor() {
    super()
  }

  // @ts-expect-error 略略略
  // 重写 render 方法
  render(legendModel, ecModel, api) {
    // 调用父 render 方法，以正确渲染图例
    super.render(legendModel, ecModel, api)

    // 描述图例标题样式
    const itemGroup = new graphic.Group()
    itemGroup.add(new graphic.Text({
      style: {
        text: legendModel.get('title'),
        x: 0,
        y: -16,
        align: 'center',
        verticalAlign: 'middle',
        fill: 'red',
      },
    }))
    // 不可点击
    itemGroup.eachChild((child) => {
      child.silent = true
    })
    // 交给父类渲染
    super.getContentGroup().add(itemGroup)
  }
}

// @ts-expect-error 略略略
function install(registers) {
  registers.registerComponentView(MyLegendView)
}

use(install)

// class MylegendModel extends LegendPlainModel {
//   constructor() {
//     super()
//   }
// }

useResize(echartInstance)

onMounted(() => {
  initChart()
})

watchEffect(() => {
  echartInstance.value?.setOption(option.value)
})

onBeforeUnmount(() => {
  if (!echartInstance) {
    return
  }
  echartInstance.value!.dispose()
  echartInstance.value = null
})
</script>

<template>
  <div ref="echartRef" :class="props.class" of-scroll :style="{ width: props.width, height: props.height }" />
</template>

<style scoped>

</style>
