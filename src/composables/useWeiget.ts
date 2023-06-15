import type { G2ViewTree, Node } from '@antv/g2/lib/runtime'
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

export function genChartOptions(): G2ViewTree {
  const widgetStore = useWidgetStore()
  const xDims = widgetStore.getDimensionsFromAxis(AXIS_TYPES.x)
  // console.log('==aaagenChartOptions ~ xDims:', xDims)
  const yDims = widgetStore.getDimensionsFromAxis(AXIS_TYPES.y)

  const colorDims = widgetStore.getDimensionsFromChartAttr('entire', CHART_ATTRS.颜色)

  const { data } = calcTableData(xDims, yDims, {
    颜色: colorDims,
    形状: [],
    大小: [],
    标签: [],
    提示: [],
    粒度: [],
    热力色: [],
    连线: [],
    半径: [],
    角度: [],
    文本: [],
    指针值: [],
    目标值: [],
    起点: [],
    终点: [],
  })
  console.log('genChartOptions ~ result:', data)
  const { isMultipleY } = widgetStore

  let options: G2ViewTree & { children: Node[] } = {
    theme: 'classic',
    type: 'view',
    data: {
      type: 'inline',
      value: data || [],
    },
    children: [],
  }

  if (xDims.length === 1) {
    yDims.forEach((yDim, i) => {
      options.children!.push({
        type: 'interval',
        encode: {
          x: xDims[0]?.name || '',
          y: yDim?.name || '',
          series: () => yDim?.name || '',
        },
        tooltip: [...xDims.map(dim => dim.name), ...yDims.map(dim => dim.name)],
        style: {
          maxWidth: 50,
        },
      })
    })
  }
  else if (xDims.length > 1) {
    const children = yDims.map((yDim, i) => {
      const child = genOption(xDims.slice(1), yDim, isMultipleY)
      return Array.isArray(child) ? child[0] : child
    })
    options = {
      ...options,
      // theme: 'classic',
      // paddingLeft: 100,
      type: 'facetRect',
      width: 1500,
      encode: { x: xDims[0]?.name || '' },
      axis: { x: { position: 'bottom', tick: false } },
      children: [{
        type: 'view',
        frame: false,
        // children: Array.isArray(children) ? children : [children],
        children,
      }],
    }
  }
  else {
    options.children!.push({
      theme: 'classic',
    })
  }

  console.log('genChartOptions ~ options:', options)
  return options
}

function genOption(
  dims: DimensionValue[],
  yDim: DimensionValue,
  isMultipleY: boolean,
  result: any[] = [],
): Node[] | G2ViewTree {
  if (dims.length === 1)
    return {
      type: 'interval',
      frame: false,
      paddingBottom: 60,
      encode: {
        x: dims[0]?.name || '',
        y: yDim.name || '',
        series: () => isMultipleY && (yDim.name || ''),
      },
      scale: {
        y: {
          key: 'left-y',
          type: 'linear',
          // domain: [0, 7000],
        },
      },
      axis: {
        x: {
          position: 'bottom',
          title: false,
          labelAutoRotate: true,
          labelAutoHide: true,
          transform: true,
        },
        y: {
          title: false,
        },
      },
      // tooltip: [...dims.map(dim => dim.name), ...yDims.map(dim => dim.name)],
      // style: {
      //   maxWidth: 50,
      // },
    }
  const children = genOption(dims.slice(1), yDim, isMultipleY, result[0]?.children || [])
  result.push({
    type: 'facetRect',
    encode: { x: dims[0]?.name || '' },
    paddingBottom: 20,
    axis: {
      x: { position: 'bottom', title: false, tick: false },
      y: { title: false },
    },
    scale: {
      x: { padding: 0, paddingInner: 0, paddingOuter: 0 },
    },
    children: Array.isArray(children) ? children : [children],
  })
  return result
}
