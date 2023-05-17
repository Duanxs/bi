<script lang="ts" setup>
import type { ChartTypeItem } from '@/constant/chartType'

defineProps<{
  dragging: boolean
  chart: ChartTypeItem
}>()

const activeTab = ref<'基础配置' | '组件样式'>('基础配置')

const widgetStore = useWidgetStore()
const yAxisAttrs = computed(() => [
  { name: '全部', id: 'entire' },
  ...widgetStore.yAxisInfos])

const isMultipleY = computed(() => widgetStore.isMultipleY)
</script>

<template>
  <div class="chart-prop-tabs">
    <ElTabs v-model="activeTab" stretch>
      <ElTabPane label="图形属性" name="基础配置">
        <template v-if="!isMultipleY">
          <ChartSettingPropItem
            v-for="item in chart.attrs"
            :key="item.label"
            :dragging="dragging"
            :attrs="item"
            y="entire"
          />
        </template>
        <template v-for="(y, index) in yAxisAttrs" v-else :key="y.id">
          <FieldExpand :name="y.name!" :expand="index === 0">
            <ChartSettingPropItem
              v-for="item in chart.attrs"
              :key="item.label"
              :dragging="dragging"
              :attrs="item"
              :y="y.id!"
            />
          </FieldExpand>
        </template>
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
