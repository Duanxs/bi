<script lang="ts" setup>
import type { TableTypeItem } from '@/constant/tableType'

const props = withDefaults(defineProps<{
  chart: TableTypeItem
  list: TableTypeItem[]
}>(), {
})

const emits = defineEmits(['update:chart'])

const chartList = ref(props.list)
const currentChart = useVModel(props, 'chart', emits)

let lastIndex = 0
function onTypeClick(item: TableTypeItem, index: number) {
  chartList.value[lastIndex].checked = false
  item.checked = true
  lastIndex = index
  currentChart.value = item
  getRequiredInfo()
}

// TODO: 根据图表类型获取必填信息
function getRequiredInfo() {
  // const info = tableTypeRequiredInfo.find(item => item.type === currentChart.value.value)
}
</script>

<template>
  <div>
    <div h-36px px-16px>
      图表类型
    </div>
    <div class="item-list" px-4px flex flex-wrap h-200px overflow-scroll>
      <template v-for="(item, index) in chartList" :key="item.value">
        <ChartTypeItem
          :checked="item.checked"
          mx-7px mb-8px
          :icon="item.iconFileName"
          @click="onTypeClick(item, index)"
        />
      </template>
    </div>
    <div class="item-description" px-16px op-50>
      <div>
        {{ currentChart?.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
