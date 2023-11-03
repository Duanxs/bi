// import type { G2ViewTree, Node } from '@antv/g2/lib/runtime'
// import type { DimensionValue } from './types'
// import { chartAttrMap } from '@/constant/chartTypeAttr'
// import { tableData } from '@/constant/data'
// import type { I颜色配置 } from '@/constant/chartTypeAttrSetting'

// export function useChartPropsList(chartType: string) {
//   switch (chartType) {
//     case CHART_TYPES.分区柱状图:
//     case CHART_TYPES.堆积柱状图:
//     case CHART_TYPES.多系列柱状图:
//     case CHART_TYPES.对比柱状图:
//     case CHART_TYPES.瀑布图:
//       return chartAttrMap.柱图
//     case CHART_TYPES.分组表:
//     case CHART_TYPES.颜色表格:
//       return chartAttrMap.文本图
//     case CHART_TYPES.分区折线图:
//     case CHART_TYPES.多系列折线图:
//     case CHART_TYPES.折线雷达图:
//     case CHART_TYPES.范围面积图:
//       return chartAttrMap.折线图
//     case CHART_TYPES.仪表盘:
//       return chartAttrMap.仪表盘
//     case CHART_TYPES.饼图:
//     case CHART_TYPES.玫瑰图:
//       return chartAttrMap.饼图
//     case CHART_TYPES.多层饼图:
//     case CHART_TYPES.聚合气泡图:
//     case CHART_TYPES.矩形树图:
//     case CHART_TYPES.词云:
//     case CHART_TYPES.漏斗图:
//     case CHART_TYPES.桑基图:
//       return 'Ae([d, r, o])'
//       return 'Ae([d, h, r, o])'
//     case CHART_TYPES.散点图:
//       return 'Ae([r, o, d])'
//     case CHART_TYPES.区域地图:
//       return 'Ae([f])'
//     case CHART_TYPES.点地图:
//     case CHART_TYPES.流向地图:
//       return 'Ae([f, d])'
//     case CHART_TYPES.热力地图:
//       return 'Ae([m, d])'
//     case CHART_TYPES.热力区域图:
//       return 'Ae([m, d, r, o])'
//     case CHART_TYPES.迷你图:
//       return 'Ae([d, f, r, o])'
//     // case CHART_TYPES.自定义:
//     //   switch (u) {
//     //     case BICst.CHART.ATTR.CHART_TYPE.INTERVAL:
//     //     case BICst.CHART.ATTR.CHART_TYPE.POINT:
//     //       return Ae([r, o, d])
//     //     case BICst.CHART.ATTR.CHART_TYPE.HEAT_MAP:
//     //       return Ae([m, d, r, o])
//     //     case BICst.CHART.ATTR.CHART_TYPE.LINE:
//     //     case BICst.CHART.ATTR.CHART_TYPE.AREA:
//     //       return Ae([r, o])
//     //     case BICst.CHART.ATTR.CHART_TYPE.SQUARE:
//     //     case BICst.CHART.ATTR.CHART_TYPE.FUNNEL:
//     //     case BICst.CHART.ATTR.CHART_TYPE.SANKEY:
//     //       return Ae([d, r, o])
//     //     case BICst.CHART.ATTR.CHART_TYPE.PIE:
//     //       return Ae([h, r, o])
//     //     case BICst.CHART.ATTR.CHART_TYPE.TEXT:
//     //       return Ae([p, r, o])
//     //     case BICst.CHART.ATTR.CHART_TYPE.MAP:
//     //       return Ae([f])
//     //     case BICst.CHART.ATTR.CHART_TYPE.GAUGE:
//     //       return Ae([I, r, o])
//     //     default:
//     //       return ""
//     //   }
//     default:
//       return ''
//   }
// }

// export interface TableField {
//   id: string
//   name: string
//   type: number
// }

// export function getChartAttrById(id: string) {
//   const field = tableData.fields.find(field => field.id === id)
//   return field as unknown as DimensionValue
// }

// export function genChartOptions(): G2ViewTree {
//   const widgetStore = useWidgetStore()
//   const xDims = widgetStore.getDimensionsFromAxis(AXIS_TYPES.x)
//   // console.log('==aaagenChartOptions ~ xDims:', xDims)
//   const yDims = widgetStore.getDimensionsFromAxis(AXIS_TYPES.y)

//   const colorDims = widgetStore.getDimensionsFromChartAttr('entire', CHART_ATTRS.颜色)
//   const color = widgetStore.getAttr('entire', CHART_ATTRS.颜色) as I颜色配置

//   const { data } = calcTableData(xDims, yDims, {
//     颜色: colorDims,
//     形状: [],
//     大小: [],
//     标签: [],
//     提示: [],
//     粒度: [],
//     热力色: [],
//     连线: [],
//     半径: [],
//     角度: [],
//     文本: [],
//     指针值: [],
//     目标值: [],
//     起点: [],
//     终点: [],
//   })

//   const options: G2ViewTree & { children: Node[] } = {
//     theme: 'classic',
//     type: 'view',
//     // autoFit: true,
//     data: {
//       type: 'inline',
//       value: data || [],
//     },
//     children: [],
//   }

//   const xCount = xDims.length
//   const yCount = yDims.length

//   if (xCount === 0) {
//     // TODO: x = 0， y = 0 时，对应渲染逻辑
//   }
//   else if (xCount === 1) {
//     if (yCount === 1) {
//       const xName = xDims[0].name
//       const yName = yDims[0].name
//       const colorName = colorDims[0]?.name
//       return {
//         theme: 'classic',
//         type: 'interval',
//         // autoFit: true,
//         data: {
//           type: 'inline',
//           value: data || [],
//         },
//         encode: {
//           x: xName,
//           y: yName,
//           color: colorName || (() => ''),
//         },
//         tooltip: [xName, yName],
//         style: {
//           maxWidth: 50,
//         },
//         // FIXME: 值过大时，疑似无法渲染
//         scale: {
//           color: {
//             type: 'ordinal',
//             range: color.dimension.colors,
//             // range: ['#7593ed', '#95e3b0'],
//           },
//           y: {
//             type: 'linear',
//             nice: true,
//             // domain: [0, 7000],
//           },
//         },
//       }
//     }
//     else if (yCount > 1) {
//       const children: Node[] = []
//       yDims.forEach((yDim) => {
//         children.push({
//           type: 'interval',
//           encode: {
//             x: xDims[0].name,
//             y: yDim.name,
//             series: () => yDim.name,
//             color: colorDims[0]?.name || (() => ''),
//           },
//           scale: {
//             y: {
//               key: 'left-y',
//               type: 'linear',
//               // domain: [0, 7000],
//             },
//           },
//           tooltip: [...xDims.map(dim => dim.name), yDim.name, colorDims[0]?.name || ''],
//           style: {
//             maxWidth: 50,
//           },
//         })
//       })
//       return {
//         theme: 'classic',
//         type: 'view',
//         // autoFit: true,
//         data: {
//           type: 'inline',
//           value: data || [],
//         },
//         children,
//       }
//     }
//   }
//   else if (xCount > 1) {
//     // FIXME: x多于两个时，会渲染多个y，且值域不同
//     const children = genOption(xDims.slice(1), yDims, { colorDims })
//     const options: G2ViewTree = {
//       theme: 'classic',
//       autoFit: true,
//       type: 'facetRect',
//       data: {
//         type: 'inline',
//         value: data || [],
//       },
//       // theme: 'classic',
//       // paddingLeft: 100,
//       // width: 1500,
//       encode: { x: xDims[0]?.name || '' },
//       axis: { x: { position: 'bottom', tick: false } },
//       children,
//     }
//     return options
//   }

//   console.log('genChartOptions ~ options:', options)
//   return options
// }

// function genOption(
//   dims: DimensionValue[],
//   yDims: DimensionValue[],
//   attr: any,
//   result: any[] = [],
// ): Node[] {
//   if (dims.length === 1) {
//     const children: Node[] = []
//     for (const yDim of yDims) {
//       children.push({
//         type: 'interval',
//         frame: false,
//         paddingBottom: 60,
//         encode: {
//           x: dims[0]?.name || '',
//           y: yDim.name || '',
//           series: () => (yDim.name || ''),
//           color: attr.colorDims[0]?.name || (() => ''),
//         },
//         scale: {
//           y: {
//             key: 'left-y',
//             type: 'linear',
//           // domain: [0, 7000],
//           },
//         },
//         axis: {
//           x: {
//             position: 'bottom',
//             title: false,
//             labelAutoRotate: true,
//             labelAutoHide: true,
//             transform: true,
//           },
//           y: {
//             title: false,
//           },
//         },
//       // tooltip: [...dims.map(dim => dim.name), ...yDims.map(dim => dim.name)],
//       // style: {
//       //   maxWidth: 50,
//       // },
//       })
//     }
//     return [{
//       type: 'view',
//       frame: false,
//       children,
//     }]
//   }
//   const children = genOption(dims.slice(1), yDims, attr, result[0]?.children || [])
//   result.push({
//     type: 'facetRect',
//     encode: { x: dims[0]?.name || '' },
//     paddingBottom: 20,
//     axis: {
//       x: { position: 'bottom', title: false, tick: false },
//       y: { title: false },
//     },
//     scale: {
//       x: { padding: 0, paddingInner: 0, paddingOuter: 0 },
//     },
//     children: Array.isArray(children) ? children : [children],
//   })
//   return result
// }
