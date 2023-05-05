<script lang="ts" setup>
import { tableData } from '@/constant/data'
import { tableType } from '@/constant/chartType'

// 左侧字段展示区
const tableTitle = ref('空调零售明细表')
const [isExpand] = useToggle(true)
const fields = ref(tableData.fields)
const textFields = computed(() => fields.value.filter(field => field.type === COLUMN.STRING || field.type === COLUMN.DATE))
const numberFields = computed(() => fields.value.filter(field => field.type === COLUMN.NUMBER))

// 中间图表信息区
// const [isTableChecked] = useToggle(false)
const currentChart = ref(tableType[0])

const drag = useDragStore()
</script>

<template>
  <div flex text-12px w-full h-full>
    <div class="widget-table-data" b-r w-245px p-16px>
      <div class="data-header">
        header
      </div>
      <FieldExpand v-model:expand="isExpand" :name="tableTitle">
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
    <div class="widget-chart-info" b-r w-245px py-16px>
      <div class="chart-type">
        <ChartTypeList v-model:chart="currentChart" :list="tableType" />
      </div>
      <div class="chart-setting" px-16px>
        <ChartSettingTabs :dragging="drag.isDragging" :chart="currentChart" />
      </div>
      <div class="result-filter" px-16px>
        结果过滤
      </div>
    </div>
    <div class="widget-chart" flex-1>
      图表
    </div>
  </div>
</template>

<style scoped>

</style>
