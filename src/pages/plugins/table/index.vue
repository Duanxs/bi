<script setup lang="ts">
import type { S2DataConfig, S2Options, Node } from '@antv/s2'
import { SheetComponent } from '@antv/s2-vue'
import Tab from './TableTab.vue'
import { tData, tFields } from '@/constant/data'
import '@antv/s2-vue/dist/style.min.css'
import { CustomTableColCell } from './colCell'
import Filter from './Filter.vue'

const sheetContainerRef = ref(null)
const s2 = ref(null)

const dataCfg = shallowRef<S2DataConfig>({
  fields: {
    columns: tFields,
  },
  meta: [],
  data: tData,
})



// class IconHoverInteraction extends BaseEvent {
//   bindEvents() {
//     // 列头双击时
//     this.spreadsheet.on(S2Event.GLOBAL_HOVER, (event) => {
//       // console.log(`HiddenInteraction ~ this.spreadsheet.on ~ event:`, event)
//       // // 获取当前单元格
//       const cell = this.spreadsheet.getCell(event.target)
//       // console.log(`IconHoverInteraction ~ this.spreadsheet.on ~ cell:`, cell)
//       // // 获取当前单元格元数据
//       // const meta = cell.getMeta()
//       // // 隐藏当前列
//       // this.spreadsheet.interaction.hideColumns([meta.field])
//     })
//   }
// }

const isFilterShow = ref(false)
const filterX = ref(0)
const filterY = ref(0)
const filterContent = ref('')

const { width, height, left, top } = useElementBounding(sheetContainerRef)

const options: S2Options = reactive({
  showDefaultHeaderActionIcon: false,
  tooltip: {
    col: {
      showTooltip: false,
    }
  },
  colCell: (item, spreadsheet, headerConfig) => {
    return new CustomTableColCell(
      item,
      spreadsheet,
      headerConfig,
      ({ meta, filterRelativePos }: any) => {
        filterX.value = left.value + filterRelativePos.x
        filterY.value = top.value + filterRelativePos.y
        filterContent.value = meta.field
        isFilterShow.value = true
      },
    )
  },
  style: {
    colCfg: {
      width: (colNode: Node) => {
        const field = colNode.field
        const data = colNode.spreadsheet.dataSet.originData[0][field]
        return data.length > 10 ? 150 : 120
      }
    }
  },
  // interaction: {
  //   customInteractions: [
  //     {
  //       // 交互的唯一标识，需要保证和已有交互不冲突
  //       key: 'MyInteraction',
  //       interaction: ColCellClickInteraction,
  //     },
  //   ],
  // }
})
watchEffect(() => {
  options.width = width.value
  options.height = height.value
})
</script>

<template>
  <div flex w-screen>
    <Tab />
    <div ref="sheetContainerRef" class="content" flex-1 flex of-hidden m-5 relative>
      <SheetComponent ref="s2" sheet-type="table" :data-cfg="dataCfg" :options="options" />
      <Filter v-model="isFilterShow" :content="filterContent" :top="filterY" :left="filterX" />
    </div>
  </div>
</template>

<style scoped>
.tab-content:hover .hide-icon {
  @apply block;
}
</style>
