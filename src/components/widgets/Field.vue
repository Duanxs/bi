<!-- eslint-disable unused-imports/no-unused-imports -->
<script lang="ts" setup>
import { CaretBottom } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  fieldId: string
  name: string
  type?: number
  hideIcon?: boolean
  active?: boolean
}>(), {
  type: 16,
  hideIcon: false,
  active: false,
})

const emits = defineEmits(['start', 'end'])

const bgColor = computed(() => {
  if (props.type === COLUMN.NUMBER)
    return '#afdfda'

  else
    return '#afc6e8'
})

const drag = useDragStore()

function onDragStart(e: DragEvent) {
  e.dataTransfer?.setData('text/plain', props.fieldId)
  emits('start', e, props.fieldId)
}
</script>

<template>
  <div flex items-center h-20px my-2px text-12px>
    <div v-if="type && !hideIcon" class="type-o">
      <div v-if="type === COLUMN.STRING" i-icon-park-outline-text text-hex-537bc6 />
      <div v-else-if="type === COLUMN.DATE" i-icon-park-outline-time text-hex-537bc6 />
      <div v-else-if="type === COLUMN.NUMBER" i-icon-park-outline-pound text-hex-3fb4ab />
    </div>
    <Drager
      v-model:dragging="drag.isDragging"
      :class="{ 'drag-start': drag.isDragging, active }"
      px-8px leading-20px cursor-pointer flex-1 min-w-fit
      hover:bg-hex-def2f0
      rounded="tl-6px br-6px"
      flex items-center
      op="last-children:hover:100"
      @dragstart="onDragStart"
      @dragend="emits('end', $event, props.fieldId)"
    >
      <div flex-1 flex-shrink>
        {{ name }}
      </div>
      <ElIcon class="icon" op-0>
        <CaretBottom />
      </ElIcon>
    </Drager>
  </div>
</template>

<style scoped>
.active {
  /* background-color: v-bind(props.type === COLUMN.NUMBER ? '#3fb4ab' : '#f8f9fc'); */
  background-color: v-bind('bgColor');
}
/* .drag-start {
  width: 100px;
} */
.drag-start> *:last-child {
  opacity: 0;
  /* display: none; */
}
</style>
