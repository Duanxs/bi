import type { FacetRectComposition, G2Spec } from '@antv/g2'
import type { DimensionValue } from './types'
import { chartAttrMap } from '@/constant/chartTypeAttr'
import { tableData } from '@/constant/data'
import type { I颜色配置 } from '@/constant/chartTypeAttrSetting'

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

export function genChartOptions(): G2Spec {
  const widgetStore = useWidgetStore()
  const xDims = widgetStore.getDimensionsFromAxis(AXIS_TYPES.x)
  const xCount = xDims.length
  // console.log('==aaagenChartOptions ~ xDims:', xDims)
  const yDims = widgetStore.getDimensionsFromAxis(AXIS_TYPES.y)
  const yCount = yDims.length

  const colorDims = widgetStore.getDimensionsFromChartAttr('entire', CHART_ATTRS.颜色)
  // const color = widgetStore.getAttr('entire', CHART_ATTRS.颜色) as I颜色配置

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
  // console.log('genChartOptions ~ xData:', xData)

  let options: G2Spec = {
    type: 'interval',
    autoFit: true,
    data: {
      type: 'inline',
      value: data || [],
    },
    // scrollbar: {
    //   x: {},
    // },
  }

  if (xCount === 1 && yCount === 1) {
    options = {
      type: 'interval',
      data: {
        type: 'inline',
        value: tData,
      },
      transform: [{ type: 'groupX', y: 'sum' }],
      encode: { x: xDims[0].name, y: yDims[0].name },
      scale: { y: { nice: true } },
      style: {
        maxWidth: 52,
        minWidth: 16,
      },
    }
  }
  else if (xCount > 1 && yCount === 1) {
    (options as FacetRectComposition).type = 'facetRect'

    ;(options as FacetRectComposition).encode = {
      x: xDims[0].name!,
    }
    options.axis = {
      x: { position: 'bottom', tick: false, title: true },
    }
    options.scale = {
      x: {
        type: 'band',
        paddingInner: 0,
        paddingOuter: 0,
      },
    }

    options.paddingLeft = 80

    function genChildren(children: any[] = [], i = 1, isFirst = true) {
      if (i === xCount - 1) {
        return [{
          type: 'interval',
          frame: false,
          axis: {
            x: { position: 'bottom', title: false, tick: false, labelTransform: 'rotate(45deg)' },
            y: isFirst,
          },
          paddingBottom: 40,
          autoFit: true,
          encode: {
            x: xDims[i].name,
            y: yDims[0].name,
          },
          scale: {
            x: {
              type: 'band',
              paddingInner: 0.2,
              paddingOuter: 0.1,
            },
            y: {
              type: 'linear',
              domain: [0, 4000000],
              nice: true,
              key: 'line',
              clamp: true,
            },
          },
          style: {
            // maxWidth: 52,
            width: 16,
            // insetRight: 0,
            // insetLeft: 0,
          },
        }]
      }
      children.push({
        type: 'facetRect',
        encode: {
          x: xDims[i].name,
        },
        scale: {
          x: {
            type: 'band',
            paddingInner: 0,
            paddingOuter: 0,
          },
        },
        axis: { x: { position: 'bottom', title: false, tick: false } },
        paddingBottom: 20,
        children: genChildren(children, i + 1, false),
        // shareSize: true,
      })

      return children
    }
    options.children = genChildren()

    if (xCount > 2) {
      const width = data.length * 16 * 2 + 20

      options = {
        type: 'spaceLayer',
        width,
        data: {
          type: 'inline',
          value: data || [],
        },
        padding: [50, 50, 50, 50],
        children: [
          {
            // marginLeft: 124,
            ...options,
            // scale: {
            //   x: {
            //     type: 'band',
            //     paddingInner: 0,
            //     paddingOuter: 0,
            //   },
            // },
          },

          {
            type: 'axisY',
            x: 0,
            y: 0,
            title: yDims[0].name,
            tickCount: 5,
            scale: {
              y: {
                type: 'linear',
                // independent: true,
                range: [1, 0],
                domain: [0, 4000000],
              },
            },
          },
        ],
      }
    }
    // options.children.push({
    //   type: 'axisY',
    //   // axis: {
    //   //   y: { position: 'left', title: true, tick: true },
    //   // },
    //   encode: {
    //     y: { type: 'column', value: [0, 1000000, 2000000, 3000000, 4000000] },
    //   },
    //   position: 'left',
    //   scale: {
    //     y: {
    //       type: 'linear',
    //       // independent: true,
    //       domain: [0, 4000000],
    //     },
    //   },
    // })
  }

  // console.log('genChartOptions ~ options:', options)
  return options
}
