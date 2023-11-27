<script lang="ts" setup generic="T extends Node">
import type { Node } from '@antv/s2'
import type { CheckboxValueType } from 'element-plus'
import { S2Event } from '@antv/s2'

const props = withDefaults(defineProps<{
  top?: number
  left?: number
  content?: string
  meta: T
}>(), {
  top: 120,
  left: 240,
  content: '',
})

const modelValue = defineModel<boolean>({ required: true })

const t = computed(() => `${props.top}px`)
const l = computed(() => {
  if ((props.left + 260) > window.innerWidth)
    return `${window.innerWidth - 260}px`
  else
    return `${props.left}px`
})

const filterRef = shallowRef(null)

let isFirst = ''
const closePopover = () => modelValue.value = false

onClickOutside(filterRef, () => {
  if (isFirst === props.content) {
    onFilter()
    closePopover()
    isFirst = ''
  }
  else {
    isFirst = props.content
  }
})

const s2 = computed(() => props.meta?.spreadsheet)

const filedName = computed(() => props.meta?.field || '')
const fieldData = computed(() => {
  const result: Record<string, number> = {}
  const data = s2.value?.dataSet.originData
  data?.slice(1).forEach((item) => {
    const name = item[filedName.value]
    if (result[name])
      result[name]++
    else
      result[name] = 1
  })
  return result
})
const fields = computed(() => Object.keys(fieldData.value))
const fieldsCount = computed(() => fields.value.length)

const checkedList = ref<string[]>([])
const checkedCount = computed(() => checkedList.value.length)
const checkAll = computed(() => checkedCount.value === fieldsCount.value)
const isIndeterminate = computed(() => checkedCount.value > 0 && checkedCount.value < fieldsCount.value)

const needFilterList = computed(() => {
  const len = checkedList.value.length
  if (!len)
    return []
  return fields.value.filter(v => checkedList.value.every(v1 => v !== v1))
})

function onSort(sortType: 'asc' | 'desc') {
  const sortList = s2.value?.dataSet.sortParams
  s2.value?.emit(S2Event.RANGE_SORT, [
    ...sortList,
    {
      sortFieldId: props.meta?.field || '',
      sortFunc: ({ data, sortFieldId }) => {
        return fieldSort(data, sortFieldId, sortType)
      },
    },
  ])
  closePopover()
}

function onCheckedAll(notAll: CheckboxValueType) {
  checkedList.value = notAll ? [...fields.value] : []
}

function onClear() {
  checkedList.value = []
}

function onFilter() {
  s2.value?.emit(S2Event.RANGE_FILTER, {
    filterKey: props.meta?.field || '',
    filteredValues: needFilterList.value,
  })
  closePopover()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue" ref="filterRef" class="table-filter" absolute z-11 w-260px h-450px bg-white shadow-md flex
      flex-col rounded-2
    >
      <div class="sort" flex p-4>
        <ElButton flex-1 @click="onSort('asc')">
          <template #icon>
            <Icon icon="icon-park-outline:sort-amount-up" />
          </template>
          升序
        </ElButton>
        <ElButton flex-1 @click="onSort('desc')">
          <template #icon>
            <Icon icon="icon-park-outline:sort-amount-down" />
          </template>
          降序
        </ElButton>
      </div>
      <ElDivider />
      <div p-4 flex-1 of-scroll>
        <ElCheckbox v-model="checkAll" :indeterminate="isIndeterminate" @change="onCheckedAll">
          <span text-4 text-dark>全选</span>
        </ElCheckbox>
        <ElCheckboxGroup v-model="checkedList">
          <ElCheckbox
            v-for="(count, name) in fieldData" :key="name" :label="name" w-full
            grid="!~ cols-[min-content_auto]"
          >
            <div flex justify-between block w-full text-4 text-dark>
              <span>{{ name }}</span>
              <span op-60>{{ count }}</span>
            </div>
          </ElCheckbox>
        </ElCheckboxGroup>
      </div>
      <div p-4 flex justify-end>
        <ElButton size="small" link @click="onClear">
          清空
        </ElButton>
        <ElButton size="small" type="primary" @click="onFilter">
          确定
        </ElButton>
      </div>
      <ElDivider />
      <div p-4>
        删除列
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.table-filter {
  top: v-bind(t);
  left: v-bind(l)
}

.table-filter :deep(.el-divider--horizontal) {
  margin: 0;
}
</style>
