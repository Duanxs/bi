<script lang="ts" setup>
import type { MaybeRef } from '@vueuse/core'
import type { I颜色配置 } from '@/constant/chartTypeAttrSetting'
import type { IColorItem } from '@/constant/color'

const props = defineProps<{
  y: string
}>()

const selectName = ref('自动')
const selectGroupName = ref('LIGHT_COLORS')
const selectGroupColors = computed(() => COLORS[selectGroupName.value])
const currentAutoName = ref('默认亮白')
// const currentColors = computed(() => {
//   if('selectName')
// })
const selectRef = ref()
const isAuto = computed(() => selectName.value === '自动')
const widgetStore = useWidgetStore()

const isLight = computed(() => selectGroupName.value === 'LIGHT_COLORS')

const 颜色 = computed(() => widgetStore.chartAttr[props.y].颜色 as I颜色配置)
const fieldsNames = computed(() => {
  const colorDims = widgetStore.getDimensionsFromChartAttr('entire', CHART_ATTRS.颜色)
  return getFieldName(colorDims)
})

function onColorAuto() {
  selectGroupName.value = 'LIGHT_COLORS'
  selectName.value = '自动'
  currentAutoName.value = '默认亮白'
  selectRef.value.blur()

  const colors = COLOR_PLATE.find(v => v.value === '默认亮白')?.colors || []
  widgetStore.chartAttr[props.y].颜色.dimension.auto = true
  widgetStore.chartAttr[props.y].颜色.dimension.colors = [...colors]
  widgetStore.chartAttr[props.y].颜色.dimension.colorMap = genColorMap(fieldsNames, '默认亮白')
}

function genColorMap(
  fieldNames: MaybeRef<string[]>,
  groupName: MaybeRef<string> = '默认亮白',
  selectGroupColors: MaybeRef<IColorItem[]> = COLOR_PLATE,
) {
  const names = unref(fieldNames)
  const selectColors = unref(selectGroupColors)
  const gName = unref(groupName)
  const fieldCount = names.length
  // console.log('fieldCount:', fieldCount)
  const colorCount = selectColors.length
  // console.log('colorCount:', colorCount)
  const colorArr = Array.from<string[]>({ length: Math.ceil(fieldCount / colorCount) })
    .fill(selectColors.find(v => v.value === gName)?.colors || [])
    .flat()
    .slice(0, fieldCount)
  // console.log('colorArr:', colorArr)

  return names.reduce((map, name, i) => {
    map[name] = colorArr[i]
    return map
  }, {} as Record<string, string>)
}

const colorMap = computed(() => {
  const { auto, customize, colors, colorMap } = 颜色.value.dimension
  if (auto) {
    // console.log('colorMap ~ 颜色.value.dimension:', 颜色.value.dimension)
    selectName.value = '自动'
    return genColorMap(fieldsNames, currentAutoName)
  }
  else {
    if (customize) {
      selectName.value = '自定义'
      return colorMap
    }
    else {
      selectName.value = COLOR_PLATE.find(v => v.colors.toString() === colors.toString())?.value || '自动'
      return genColorMap(fieldsNames, selectName)
    }
  }
})

function onSelectChange(name: string) {
  const colors = COLOR_PLATE.find(v => v.value === name)?.colors || []
  widgetStore.chartAttr[props.y].颜色.dimension.auto = false
  widgetStore.chartAttr[props.y].颜色.dimension.colors = [...colors]
  widgetStore.chartAttr[props.y].颜色.dimension.colorMap = genColorMap(fieldsNames, name)
}
</script>

<template>
  <div w-full>
    <div class="title" flex>
      <div w-60px>
        配色方案
      </div>
      <div>
        <ElSelect
          ref="selectRef" v-model="selectName"
          placeholder="Select" size="small"
          @change="onSelectChange"
        >
          <div
            :class="{ auto: isAuto }"
            border mx-20px my-8px px-5px
            cursor-pointer h-26px flex items-center
            @click="onColorAuto"
          >
            自动
          </div>
          <ElButtonGroup size="small" mx-20px mb-8px>
            <ElButton
              type="primary"
              color="#395fd3"
              :plain="!isLight"
              @click="selectGroupName = 'LIGHT_COLORS'"
            >
              适合浅色背景
            </ElButton>
            <ElButton
              type="primary"
              color="#395fd3"
              :plain="isLight"
              @click="selectGroupName = 'DEEP_COLORS'"
            >
              适合深色背景
            </ElButton>
          </ElButtonGroup>
          <ElOption
            v-for="item in selectGroupColors"
            :key="item.value"
            :label="item.text"
            :value="item.value"
            flex items-center
          >
            <div class="option" flex items-center text-12px leading-16px>
              <div grid="~ cols-6" gap-1px border p-1px>
                <div
                  v-for="color in item.colors.slice(0, 12)" :key="color"
                  w-8px h-8px
                  :style="{ backgroundColor: color }"
                />
              </div>
              <div ml-5px>
                {{ item.text }}
              </div>
            </div>
          </ElOption>
        </ElSelect>
      </div>
    </div>
    <div class="content" border p-8px mt-8px h-210px of-auto>
      <div v-for="name in fieldsNames" :key="name" flex items-center mb-8px>
        <div h-24px w-24px p-2px border rounded cursor-pointer>
          <div h-full w-full :style="{ background: colorMap[name] }" />
        </div>
        <div ml-5px text-12px>
          {{ name }}
        </div>
      </div>
    </div>
    <div class="opacity" flex mt-8px>
      <div w-60px>
        不透明度
      </div>
      <div>slider</div>
    </div>
    <div class="border-attr" flex mt-8px>
      <div w-60px>
        边框
      </div>
      <div>
        <!-- <ElSelect size="small">
          <ElOption />
        </ElSelect> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-button:focus{
  background-color: #395fd3;
}

.auto {
  border: 1px solid #395fd3
}
</style>
