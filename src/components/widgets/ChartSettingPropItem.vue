<script lang="ts" setup>
import type { DimensionValue } from '@/composables/types'
import type { ChartAttrItem } from '@/constant/chartTypeAttr'
import ColorPane from '@/components/attrs/ColorPane.vue'

const props = defineProps<{
  y: string
  dragging: boolean
  attrs: ChartAttrItem
}>()

const panes: Record<string, any> = {
  ColorPane,
}

const dragBoxRef = ref<HTMLDivElement>()

const widgetStore = useWidgetStore()

const fields = computed(() => widgetStore.getDimensionsFromChartAttr(props.y, props.attrs.label))

function addChartAttrBy(field: DimensionValue) {
  widgetStore.addChartDimensionBy(field, props.attrs.label, props.y)
}
function delChartAttrBy(index: number) {
  widgetStore.delChartDimensionBy(index, props.attrs.label, props.y)
}

const popoverShow = ref(false)
function onAttrSetting(attrs: ChartAttrItem) {
  if (!attrs.component)
    return
  popoverShow.value = true
}
const popoverRef = ref()
onClickOutside(popoverRef, () => {
  popoverShow.value = false
}, {
  ignore: ['.el-select', '.el-select-dropdown__list'],
})
</script>

<template>
  <FieldDragBox
    ref="dragBoxRef"
    :name="attrs.label"
    :dragging="dragging"
    :multiple="attrs.multiple"
    :fields="fields"
    active vertical
    @add="addChartAttrBy"
    @del="delChartAttrBy"
  >
    <template #prefix>
      <div
        :class="{ label: attrs.component }"
        flex items-center
        min-h-32px rounded
        overflow-hidden
        @click="onAttrSetting(attrs)"
      >
        <div ml-4px select-none>
          {{ attrs.label }}
        </div>
        <div
          v-if="attrs.component"
          ml-2px mr-4px
          color="#091E40/25"
          i-icon-park-outline-setting
        />
        <ElPopover
          :visible="popoverShow"
          :virtual-ref="dragBoxRef"
          :width="attrs.componentWidth"
          trigger="click"
          placement="right-start"
          virtual-triggering
          :disabled="!attrs.component"
          :hide-after="0"
        >
          <component :is="panes[attrs.component]" v-if="attrs.component" ref="popoverRef" :y="y" />
        </ElPopover>
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
