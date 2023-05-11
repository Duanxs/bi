// type ChartAttrKey = `${CHART_ATTRS}`
// interface ChartAttr {
//   [`${CHART_ATTRS}`]: ChartAttrItem
// }
import { 图表属性名, 图表属性配置 } from './chartTypeAttrSetting'
import { CHART_ATTRS } from '@/enums/chartTypes'

export interface ChartAttrItem {
  label: string
  component: string | null
  multiple: boolean
  setting: typeof 图表属性配置[keyof typeof 图表属性配置]
}

type ChartAttr = Record<CHART_ATTRS, ChartAttrItem>

const chartAttr: ChartAttr = {
  [CHART_ATTRS.颜色]: {
    label: '颜色',
    component: 'ColorPicker',
    multiple: false,
    setting: 图表属性配置[CHART_ATTRS.颜色],
  },
  [CHART_ATTRS.大小]: {
    label: '大小',
    component: 'Slider',
    multiple: false,
    setting: 图表属性配置[CHART_ATTRS.大小],
  },
  [CHART_ATTRS.标签]: {
    label: '标签',
    component: 'Switch',
    multiple: true,
    setting: 图表属性配置[CHART_ATTRS.标签],
  },
  [CHART_ATTRS.提示]: {
    label: '提示',
    component: 'Switch',
    multiple: true,
    setting: 图表属性配置[CHART_ATTRS.提示],
  },
  [CHART_ATTRS.粒度]: {
    label: '粒度',
    component: null,
    multiple: true,
    setting: 图表属性配置[CHART_ATTRS.粒度],
  },
  [CHART_ATTRS.形状]: {
    label: '形状',
    component: 'Select',
    multiple: false,
    setting: 图表属性配置[CHART_ATTRS.形状],
  },
  [CHART_ATTRS.热力色]: {
    label: '热力色',
    component: 'ColorPicker',
    multiple: false,
    setting: 图表属性配置[CHART_ATTRS.热力色],
  },
  [CHART_ATTRS.连线]: {
    label: '连线',
    component: 'Switch',
    multiple: false,
    setting: 图表属性配置[CHART_ATTRS.连线],
  },
  [CHART_ATTRS.半径]: {
    label: '半径',
    component: 'Slider',
    multiple: false,
    setting: 图表属性配置[CHART_ATTRS.半径],
  },
  [CHART_ATTRS.角度]: {
    label: '角度',
    component: null,
    multiple: true,
    setting: 图表属性配置[CHART_ATTRS.角度],
  },
  [CHART_ATTRS.文本]: {
    label: '文本',
    component: 'Input',
    multiple: true,
    setting: 图表属性配置[CHART_ATTRS.文本],
  },
  [CHART_ATTRS.仪表指针值]: {
    label: '指针值',
    component: null,
    multiple: false,
    setting: 图表属性配置[CHART_ATTRS.仪表指针值],
  },
  [CHART_ATTRS.仪表目标值]: {
    label: '目标值',
    component: 'Slider',
    multiple: false,
    setting: 图表属性配置[CHART_ATTRS.仪表目标值],
  },
  [CHART_ATTRS.桑基起点]: {
    label: '起点',
    component: null,
    multiple: false,
    setting: 图表属性配置[CHART_ATTRS.桑基起点],
  },
  [CHART_ATTRS.桑基终点]: {
    label: '终点',
    component: null,
    multiple: false,
    setting: 图表属性配置[CHART_ATTRS.桑基终点],
  },
}

type EmptyChartAttr = Record<CHART_ATTRS, typeof 图表属性配置[keyof typeof 图表属性配置]>
export function getChartAttrSetting() {
  const setting = {} as EmptyChartAttr
  图表属性名.forEach((attr) => {
    if (!chartAttr[attr]) {
      console.warn(`chartAttr[${attr}] is not defined`)
    }
    setting[attr] = chartAttr[attr].setting
  })
  return setting
}

export const chartAttrMap = {
  表: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.形状],
  ],
  interval: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.大小],
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  点图: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.大小],
    chartAttr[CHART_ATTRS.形状],
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  热力图: [
    chartAttr[CHART_ATTRS.热力色],
    chartAttr[CHART_ATTRS.大小],
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  柱图: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.大小],
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  范围面积图: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.连线],
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  折线图: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.大小],
    chartAttr[CHART_ATTRS.连线],
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  饼图: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.半径],
    chartAttr[CHART_ATTRS.角度],
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  文本图: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.大小],
    chartAttr[CHART_ATTRS.文本],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  区域地图: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  漏斗图: [
    chartAttr[CHART_ATTRS.颜色],
    {
      ...chartAttr[CHART_ATTRS.大小],
      multiple: true,
    },
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  仪表盘: [
    chartAttr[CHART_ATTRS.仪表指针值],
    chartAttr[CHART_ATTRS.仪表目标值],
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.大小],
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  箱形图: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.大小],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
  桑基图: [
    chartAttr[CHART_ATTRS.颜色],
    chartAttr[CHART_ATTRS.桑基起点],
    chartAttr[CHART_ATTRS.桑基终点],
    chartAttr[CHART_ATTRS.大小],
    chartAttr[CHART_ATTRS.标签],
    chartAttr[CHART_ATTRS.提示],
    chartAttr[CHART_ATTRS.粒度],
  ],
}
