<script lang="ts" setup>
import type { ChartTypeItem } from '@/constant/chartType'

defineProps<{
  dragging: boolean
  chart: ChartTypeItem
}>()

const activeTab = ref<'基础配置' | '组件样式'>('基础配置')
</script>

<template>
  <div class="chart-prop-tabs">
    <ElTabs v-model="activeTab" stretch>
      <ElTabPane label="图形属性" name="基础配置">
        <ChartSettingPropItem
          v-for="item in chart.attrs"
          :key="item.label"
          :dragging="dragging"
          :attrs="item"
        />
      </ElTabPane>
      <ElTabPane label="组件样式" name="组件样式">
        <ChartSettingStyle />
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style scoped>
.chart-prop-tabs :deep(.el-tabs__item) {
  padding: 0 ;
  font-weight: normal ;
  font-size: 12px ;
}
</style>
