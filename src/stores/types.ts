import type { 图表属性配置 } from '@/constant/chartTypeAttrSetting'
import type { CHART_ATTRS } from '@/enums/chartTypes'

export interface ChartAttrMap {
  [key: string]: ChartAttr
}

type ChartAttr = Record<CHART_ATTRS, typeof 图表属性配置[keyof typeof 图表属性配置]>

export enum AXIS_ENUM {
  x = 10000,
  z = 20000,
  y = 30000,
}
