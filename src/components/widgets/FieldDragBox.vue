<script lang="ts" setup>
import type { TableField } from '@/composables/useWeiget'

const props = withDefaults(defineProps<{
  dragging: boolean
  multiple?: boolean
  horizontal?: boolean
  vertical?: boolean
  gap?: number
}>(), {
  dragging: false,
  multiple: false,
  horizontal: false,
  vertical: false,
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
function onDrop(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  const id = e.dataTransfer?.getData('text/plain')
  if (!id || idSet.has(id))
    return

  if (!isMultiple.value && !isEmpty.value) {
    currentFields.value = []
    idSet.clear()
  }

  idSet.add(id)
  const field = getChartAttrById(id)
  currentFields.value.push(field)
  emits('add', field)
}
function onFieldDragEnd(_e: DragEvent, id: string) {
  if (isOutside.value) {
    let i = 0
    currentFields.value = currentFields.value.filter((field, index) => {
      if (field.id !== id) {
        return true
      }
      i = index
      return false
    })
    idSet.delete(id)
    emits('del', i)
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
      <template v-for="field in currentFields" :key="field.id">
        <Field
          :field-id="field.id"
          :name="field.name"
          :type="field.type"
          active hide-icon
          min-w-fit
          mr-6px
          @end="onFieldDragEnd"
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
