import type { EChartsOption } from 'echarts'
import type { DimensionValue } from './types'
import { chartAttrMap } from '@/constant/chartTypeAttr'
import { tableData } from '@/constant/data'

export function useChartPropsList(chartType: string) {
  switch (chartType) {
    case CHART_TYPES.分区柱状图:
    case CHART_TYPES.堆积柱状图:
    case CHART_TYPES.多系列柱状图:
    case CHART_TYPES.对比柱状图:
    case CHART_TYPES.瀑布图:
      return chartAttrMap.柱图
    case CHART_TYPES.分组表:
    case CHART_TYPES.颜色表格:
      return chartAttrMap.文本图
    case CHART_TYPES.分区折线图:
    case CHART_TYPES.多系列折线图:
    case CHART_TYPES.折线雷达图:
    case CHART_TYPES.范围面积图:
      return chartAttrMap.折线图
    case CHART_TYPES.仪表盘:
      return chartAttrMap.仪表盘
    case CHART_TYPES.饼图:
    case CHART_TYPES.玫瑰图:
      return chartAttrMap.饼图
    case CHART_TYPES.多层饼图:
    case CHART_TYPES.聚合气泡图:
    case CHART_TYPES.矩形树图:
    case CHART_TYPES.词云:
    case CHART_TYPES.漏斗图:
    case CHART_TYPES.桑基图:
      return 'Ae([d, r, o])'
      return 'Ae([d, h, r, o])'
    case CHART_TYPES.散点图:
      return 'Ae([r, o, d])'
    case CHART_TYPES.区域地图:
      return 'Ae([f])'
    case CHART_TYPES.点地图:
    case CHART_TYPES.流向地图:
      return 'Ae([f, d])'
    case CHART_TYPES.热力地图:
      return 'Ae([m, d])'
    case CHART_TYPES.热力区域图:
      return 'Ae([m, d, r, o])'
    case CHART_TYPES.迷你图:
      return 'Ae([d, f, r, o])'
    // case CHART_TYPES.自定义:
    //   switch (u) {
    //     case BICst.CHART.ATTR.CHART_TYPE.INTERVAL:
    //     case BICst.CHART.ATTR.CHART_TYPE.POINT:
    //       return Ae([r, o, d])
    //     case BICst.CHART.ATTR.CHART_TYPE.HEAT_MAP:
    //       return Ae([m, d, r, o])
    //     case BICst.CHART.ATTR.CHART_TYPE.LINE:
    //     case BICst.CHART.ATTR.CHART_TYPE.AREA:
    //       return Ae([r, o])
    //     case BICst.CHART.ATTR.CHART_TYPE.SQUARE:
    //     case BICst.CHART.ATTR.CHART_TYPE.FUNNEL:
    //     case BICst.CHART.ATTR.CHART_TYPE.SANKEY:
    //       return Ae([d, r, o])
    //     case BICst.CHART.ATTR.CHART_TYPE.PIE:
    //       return Ae([h, r, o])
    //     case BICst.CHART.ATTR.CHART_TYPE.TEXT:
    //       return Ae([p, r, o])
    //     case BICst.CHART.ATTR.CHART_TYPE.MAP:
    //       return Ae([f])
    //     case BICst.CHART.ATTR.CHART_TYPE.GAUGE:
    //       return Ae([I, r, o])
    //     default:
    //       return ""
    //   }
    default:
      return ''
  }
}

export interface TableField {
  id: string
  name: string
  type: number
}

export function getChartAttrById(id: string) {
  const field = tableData.fields.find(field => field.id === id)
  return field as unknown as DimensionValue
}

export function genChartOptions(): Ref<EChartsOption> {
  const index = tableData.fields.findIndex(field => field.name === '分级市场')
  const index2 = tableData.fields.findIndex(field => field.name === '销售量')
  const data = tableData.data
  const fieldsSet = new Set(data.map(item => item[index]))

  // [
  //   ['一级市场', '7593'],
  //   ['二级市场', '2914'],
  //   ['三级市场', '1296'],
  //   ['四级市场', '2999'],
  // ]
  const fieldObj: any = {}
  fieldsSet.forEach((item) => {
    fieldObj[item] = 0
  })
  data.forEach((item) => {
    fieldObj[item[index]] += +item[index2]
  })
  const dataset = []
  for (const key in fieldObj) {
    dataset.push([key, fieldObj[key]])
  }
  // console.log('dataset ~ dataset:', dataset)
  const options = ref<EChartsOption>(
    {
      legend: {},
      tooltip: {},
      dataset: {
        // 提供一份数据。
        dimensions: Array.from(fieldsSet),
        source: dataset,
      },
      xAxis: {
        type: 'category',
        name: '分级市场',
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: {
          backgroundColor: '#333',
          width: 100,
          height: 22,
          lineHeight: 22,
          margin: 0,
        },
        axisTick: {
          show: false,
        },
      },
      // 声明一个 Y 轴，数值轴。
      yAxis: {},
      // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
      series: [
        {
          type: 'bar',
          encode: {
            x: '分级市场',
            y: '销售量',
          },
          // seriesLayoutBy: 'row',
        },
      ],
    },
  ) as Ref<EChartsOption>

  return options
}
