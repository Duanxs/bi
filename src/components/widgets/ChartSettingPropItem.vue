<script lang="ts" setup>
import type { TableField } from '@/composables/useWeiget'
import type { ChartAttrItem } from '@/constant/chartTypeAttr'

const props = defineProps<{
  dragging: boolean
  attrs: ChartAttrItem
}>()

const isMultiple = computed(() => props.attrs.multiple)

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
  currentFields.value.push(getChartAttrById(id))
}
function onFieldDragEnd(_e: DragEvent, id: string) {
  if (isOutside.value) {
    currentFields.value = currentFields.value.filter((field) => {
      return field.id !== id
    })
    idSet.delete(id)
  }
}
</script>

<template>
  <div
    ref="dropBox"
    :class="{ 'item-dragging': dragging }"
    flex items-center
    my-8px min-h-36px
    bg-hex-f8f9fc rounded
    border="~ transparent"
    @dragover.prevent
    @drop="onDrop"
  >
    <div
      flex items-center
      w-60px h-full pl-3px py-3px
    >
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
    </div>
    <div class="field" flex-1>
      <div v-for="field in currentFields" :key="field.id" my-6px mr-8px>
        <Field
          :field-id="field.id"
          :name="field.name"
          :type="field.type"
          active hide-icon
          @end="onFieldDragEnd"
        />
      </div>
      <div v-if="!isOutside && dragging && (isMultiple || isEmpty)" pr-16px>
        <div
          w-full h-full
          border="~ dashed #2C60DB"
          rounded="tl-6px br-6px"
          text-transparent
          my-6px
        >
          占位
        </div>
      </div>
      <div v-else-if="isEmpty" color="#091E40/47" pl-5px>
        拖入<span v-if="!isMultiple">一个</span>字段
      </div>
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
</style>
