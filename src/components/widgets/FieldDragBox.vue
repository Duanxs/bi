<script lang="ts" setup>
import type { TableField } from '@/composables/useWeiget'

const props = withDefaults(defineProps<{
  id: string
  dragging: boolean
  multiple?: boolean
  horizontal?: boolean
  vertical?: boolean
  unique?: boolean
  gap?: number
}>(), {
  id: '',
  dragging: false,
  multiple: false,
  horizontal: false,
  vertical: false,
  unique: false,
  gap: 0,
})

const emits = defineEmits<{
  (event: 'add', fields: TableField): void
  (event: 'del', index: number): void
}>()

const isMultiple = computed(() => props.multiple)

const dropBox = ref<HTMLElement | null>(null)
const { isOutside } = useMouseInElement(dropBox)

const idSet = new Set()
const currentFields = ref<TableField[]>([])
const isEmpty = computed(() => !currentFields.value.length)
let saveKey = ''
function onDrop(e: DragEvent) {
  // 自己拖入自己，不能添加
  if (saveKey === props.id) {
    saveKey = ''
    return
  }
  e.preventDefault()
  e.stopPropagation()
  const id = e.dataTransfer?.getData('text/plain')
  if (!id || (props.unique && idSet.has(id)))
    return

  if (!isMultiple.value && !isEmpty.value) {
    currentFields.value = []
    idSet.clear()
  }

  props.unique && idSet.add(id)
  const field = getChartAttrById(id)
  currentFields.value.push(field)
  emits('add', field)
}

function onFieldDragStart(_e: DragEvent) {
  saveKey = props.id
}
function onFieldDragEnd(_e: DragEvent, id: string, index: number) {
  if (isOutside.value) {
    currentFields.value.splice(index, 1)
    props.unique && idSet.delete(id)
    emits('del', index)
  }
}
</script>

<template>
  <div
    ref="dropBox"
    :class="{ 'item-dragging': dragging }"
    flex items-center
    my-8px min-h-36px
    rounded overflow-hidden
    border="~ transparent"
    :style="{ gap: `${gap}px` }"
    @dragover.prevent
    @drop="onDrop"
  >
    <div
      flex items-center
      min-w-60px pl-6px
      min-h-36px
      py-6px rounded
      bg-hex-f8f9fc
    >
      <slot name="prefix" />
    </div>
    <div class="field-box" flex-1 min-h-36px p-6px bg-hex-f8f9fc>
      <template v-for="(field, index) in currentFields" :key="field.id">
        <Field
          :field-id="field.id"
          :name="field.name"
          :type="field.type"
          active hide-icon
          min-w-fit
          mr-6px
          @start="(e) => onFieldDragStart(e)"
          @end="(e, id) => onFieldDragEnd(e, id, index)"
        />
      </template>
      <div v-if="!isOutside && dragging && (isMultiple || isEmpty)" pr-16px>
        <div
          w-full
          border="~ dashed #2C60DB"
          rounded="tl-6px br-6px"
          text-transparent
          min-w-120px
          h-20px
        >
          占位
        </div>
      </div>
      <div v-else-if="isEmpty" color="#091E40/47" pl-5px leading-24px>
        拖入<span v-if="!isMultiple">一个</span>字段
      </div>
    </div>
    <div min-h-36px bg-hex-f8f9fc p-6px leading-24px>
      <slot name="suffix" />
    </div>
  </div>
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

.field-box {
  display: flex;
}
</style>
