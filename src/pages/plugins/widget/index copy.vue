<script lang="ts" setup>
import { tableData } from '@/constant/data'
import { tableType } from '@/constant/chartType'

defineOptions({
  name: 'Editor',
})

// 左侧字段展示区
const tableTitle = ref('空调零售明细表')
const fields = ref(tableData.fields)
const textFields = computed(() => fields.value.filter(field => field.type === COLUMN.STRING || field.type === COLUMN.DATE))
const numberFields = computed(() => fields.value.filter(field => field.type === COLUMN.NUMBER))

// 中间图表信息区
// const [isTableChecked] = useToggle(false)
const currentChart = ref(tableType[0])
const currentChartIcon = computed(() => {
  let icon = currentChart.value.iconFileName
  // 魔法打败魔法
  if (/地图/.test(icon))
    icon = icon.replace('.png', '.svg')

  return `/src/assets/charts/background/${icon}`
})

const drag = useDragStore()

const chartOption = computed(() => genChartOptions())

const { addChartAxisBy, delChartAxisBy, getDimensionsFromAxis } = useWidgetStore()
const fieldsX = computed(() => getDimensionsFromAxis(AXIS_TYPES.x))
const fieldsY = computed(() => getDimensionsFromAxis(AXIS_TYPES.y))
</script>

<template>
  <div flex text-12px w-full>
    <div class="widget-table-data" b-r w-245px p-16px>
      <div class="data-header">
        header
      </div>
      <FieldExpand expand :name="tableTitle">
        <div class="table-field">
          <div class="string-fields" mb-5px>
            <template v-for="field in textFields" :key="field.id">
              <Field :field-id="field.id" ml-12px :name="field.name" :type="field.type" />
            </template>
          </div>
          <div class="number-fields">
            <template v-for="field in numberFields" :key="field.id">
              <Field :field-id="field.id" ml-12px :name="field.name" :type="field.type" />
            </template>
          </div>
        </div>
      </FieldExpand>
    </div>
    <div class="widget-chart-info" flex="~ col" b-r w-245px h-full py-16px>
      <div class="chart-type">
        <ChartTypeList v-model:chart="currentChart" :list="tableType" />
      </div>
      <div class="chart-setting" flex-1 of-auto px-16px>
        <ChartSettingTabs :dragging="drag.isDragging" :chart="currentChart" />
      </div>
      <div class="result-filter" px-16px>
        结果过滤
      </div>
    </div>
    <div class="widget-chart" flex-1 p-16px flex flex-col max-w-full of-scroll>
      <div relative>
        <div class="x-axis">
          <FieldDragBox
            name="x"
            :fields="fieldsX"
            :dragging="drag.isDragging"
            :gap="2"
            active multiple horizontal
            @add="(e) => addChartAxisBy(e, AXIS_TYPES.x)"
            @del="(e) => delChartAxisBy(e, AXIS_TYPES.x)"
          >
            <template #prefix>
              横轴
            </template>
            <template #suffix>
              clear
            </template>
          </FieldDragBox>
        </div>
        <div class="y-axis" of-scroll>
          <FieldDragBox
            name="y"
            :fields="fieldsY"
            :dragging="drag.isDragging"
            active multiple horizontal
            :gap="2"
            @add="(e) => addChartAxisBy(e, AXIS_TYPES.y)"
            @del="(e) => delChartAxisBy(e, AXIS_TYPES.y)"
          >
            <template #prefix>
              纵轴
            </template>
            <template #suffix>
              clear
            </template>
          </FieldDragBox>
        </div>
        <div
          class="exchange"
          absolute top="50%" left-12px translate-y="-50%"
          w-24px h-24px bg="#2c60db0d" z-1 rounded-full
          flex justify-center items-center
          cursor-pointer
        >
          <div i-icon-park-outline-sort-two text-14px />
        </div>
      </div>
      <div flex-1 max-w-full min-h-1px of-y-hidden of-x-scroll>
        <BaseChart :option="chartOption">
          <ElEmpty h-full w-full :image="currentChartIcon">
            <template #description>
              <div text-gray>
                拖入字段至该区域，将自动生成图表
              </div>
              <div text-gray>
                (暂不支持快捷键Command、Shift多选拖入字段)
              </div>
            </template>
          </ElEmpty>
        </BaseChart>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
