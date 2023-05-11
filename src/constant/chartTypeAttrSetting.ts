import { CHART_ATTRS } from '@/enums/chartTypes'

interface BaseAttrSetting {
  [key: string]: any
  dimensionIds: string[]
}

const 颜色配置: BaseAttrSetting = {
  gradient: false,
  opacity: -1,
  borderColor: '',
  overlayEffect: false,
  nonField: {
    color: '',
  },
  dimension: {
    colors: [],
    auto: true,
    customize: false,
    colorMap: {},
  },
  measure: {
    name: 'auto',
    gradientType: 'continuous',
    autoInterval: true,
    count: 2,
    custom: {
      min: 0,
      max: 0,
      ranges: [],
    },
    colors: null,
  },
  dimensionIds: [],
  gauge: {
    pointColor: '',
    tickColor: '',
    tickSlotColor: '',
    hubColor: '',
    hubBackgroundColor: '',
    backgroundColor: '',
  },
}

const 大小配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 标签配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 提示配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 粒度配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 形状配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 热力色配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 连线配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 半径配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 角度配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 文本配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 仪表指针值配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 仪表目标值配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 桑基起点配置: BaseAttrSetting = {
  dimensionIds: [],
}
const 桑基终点配置: BaseAttrSetting = {
  dimensionIds: [],
}

type I图表属性名 = `${CHART_ATTRS}`
export const 图表属性名: I图表属性名[] = ['颜色', '大小', '标签', '提示', '粒度', '形状', '热力色', '连线', '半径', '角度', '文本', '仪表指针值', '仪表目标值', '桑基起点', '桑基终点']

export const 图表属性配置 = {
  [CHART_ATTRS.颜色]: 颜色配置,
  [CHART_ATTRS.大小]: 大小配置,
  [CHART_ATTRS.标签]: 标签配置,
  [CHART_ATTRS.提示]: 提示配置,
  [CHART_ATTRS.粒度]: 粒度配置,
  [CHART_ATTRS.形状]: 形状配置,
  [CHART_ATTRS.热力色]: 热力色配置,
  [CHART_ATTRS.连线]: 连线配置,
  [CHART_ATTRS.半径]: 半径配置,
  [CHART_ATTRS.角度]: 角度配置,
  [CHART_ATTRS.文本]: 文本配置,
  [CHART_ATTRS.仪表指针值]: 仪表指针值配置,
  [CHART_ATTRS.仪表目标值]: 仪表目标值配置,
  [CHART_ATTRS.桑基起点]: 桑基起点配置,
  [CHART_ATTRS.桑基终点]: 桑基终点配置,
}
