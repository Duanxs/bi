<script lang="ts" setup>
import type { TableField } from '@/composables/useWeiget'
import type { ChartAttrItem } from '@/constant/chartTypeAttr'

const props = defineProps<{
  dragging: boolean
  attrs: ChartAttrItem
}>()

const widgetStore = useWidgetStore()
function addChartAttrBy(field: TableField) {
  widgetStore.addChartDimensionBy(field, props.attrs.label)
}
function delChartAttrBy(index: number) {
  widgetStore.delChartDimensionBy(index, props.attrs.label)
}
</script>

<template>
  <FieldDragBox
    :id="attrs.label"
    :dragging="dragging"
    :multiple="attrs.multiple"
    active vertical
    @add="(e) => addChartAttrBy(e)"
    @del="(e) => delChartAttrBy(e)"
  >
    <template #prefix>
      <div
        :class="{ label: attrs.component }"
        flex items-center
        h-full rounded
        overflow-hidden
      >
        <div ml-4px>
          {{ attrs.label }}
        </div>
        <div
          v-if="attrs.component"
          ml-2px mr-4px
          color="#091E40/25"
          i-icon-park-outline-setting
        />
      </div>
    </template>
  </FieldDragBox>
</template>

<style scoped>
.item-dragging {
  border: 1px solid #2c60db;
}
.label {
  cursor: pointer;
}
.label:hover {
  background: rgba(46, 98, 220, .05);
}
.label:active {
  background: rgba(44, 96, 219, .2);
}

.label:hover > *:last-child {
  color: #091e40;
}
</style>
