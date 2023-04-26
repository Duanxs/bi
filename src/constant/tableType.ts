export interface TableTypeItem {
  text: string
  value: string | number
  checked: boolean
  iconFileName: string
}
export const tableType: TableTypeItem[] = [
  {
    text: '分组表',
    value: 1,
    checked: true,
    iconFileName: '分组表.png',
  },
  {
    text: '交叉表',
    value: 2,
    checked: false,
    iconFileName: '交叉表.png',
  },
  {
    text: '明细表',
    value: 4,
    checked: false,
    iconFileName: '明细表.png',
  },
  {
    text: '自定义图表',
    value: 'custom',
    checked: false,
    iconFileName: '自定义图表.png',
  },
  {
    text: 'kpi指标卡',
    value: 'kpiCard',
    checked: false,
    iconFileName: 'kpi指标卡.png',
  },
  {
    text: '分区柱形图',
    value: 'sliceColumn',
    checked: false,
    iconFileName: '分区柱形图.png',
  },
  {
    text: '堆积柱形图',
    value: 'stackColumn',
    checked: false,
    iconFileName: '堆积柱形图.png',
  },
  {
    text: '多系列柱形图',
    value: 'seriesColumn',
    checked: false,
    iconFileName: '多系列柱形图.png',
  },
  {
    text: '对比柱状图',
    value: 'compareColumn',
    checked: false,
    iconFileName: '对比柱状图.png',
  },
  {
    text: '瀑布图',
    value: 'waterFall',
    checked: false,
    iconFileName: '瀑布图.png',
  },
  {
    text: '分区折线图',
    value: 'sliceLine',
    checked: false,
    iconFileName: '分区折线图.png',
  },
  {
    text: '多系列折线图',
    value: 'seriesLine',
    checked: false,
    iconFileName: '多系列折线图.png',
  },
  {
    text: '折线雷达图',
    value: 'radar',
    checked: false,
    iconFileName: '折线雷达图.png',
  },
  {
    text: '范围面积图',
    value: 'rangeArea',
    checked: false,
    iconFileName: '范围面积图.png',
  },
  {
    text: '仪表盘',
    value: 'gauge',
    checked: false,
    iconFileName: '仪表盘.png',
  },
  {
    text: '饼图',
    value: 'pie',
    checked: false,
    iconFileName: '饼图.png',
  },
  {
    text: '玫瑰图',
    value: 'rose',
    checked: false,
    iconFileName: '玫瑰图.png',
  },
  {
    text: '多层饼图',
    value: 'multiPie',
    checked: false,
    iconFileName: '多层饼图.png',
  },
  {
    text: '散点图',
    value: 'point',
    checked: false,
    iconFileName: '散点图.png',
  },
  {
    text: '聚合气泡图',
    value: 'bubble',
    checked: false,
    iconFileName: '聚合气泡图.png',
  },
  {
    text: '区域地图',
    value: 'areaMap',
    checked: false,
    iconFileName: '区域地图.png',
  },
  {
    text: '点地图',
    value: 'pointMap',
    checked: false,
    iconFileName: '点地图.png',
  },
  {
    text: '流向地图',
    value: 'lineMap',
    checked: false,
    iconFileName: '流向地图.png',
  },
  {
    text: '热力地图',
    value: 'heatMap',
    checked: false,
    iconFileName: '热力地图.png',
  },
  {
    text: '热力区域图',
    value: 'heat',
    checked: false,
    iconFileName: '热力区域图.png',
  },
  {
    text: '颜色表格',
    value: 'table',
    checked: false,
    iconFileName: '颜色表格.png',
  },
  {
    text: '迷你图',
    value: 'mini',
    checked: false,
    iconFileName: '迷你图.png',
  },
  {
    text: '矩形树图',
    value: 'rectTree',
    checked: false,
    iconFileName: '矩形树图.png',
  },
  {
    text: '词云',
    value: 'wordCloud',
    checked: false,
    iconFileName: '词云.png',
  },
  {
    text: '漏斗图',
    value: 'funnel',
    checked: false,
    iconFileName: '漏斗图.png',
  },
  {
    text: '箱形图',
    value: 'box',
    checked: false,
    iconFileName: '箱形图.png',
  },
  {
    text: '桑基图',
    value: 'sankey',
    checked: false,
    iconFileName: '桑基图.png',
  },
]

export const tableTypeCombe = [
  {
    iconCls: 'interval-chart-font',
    text: '柱形图',
    value: 'interval',
  },
  {
    iconCls: 'point-chart-font',
    text: '点',
    value: 'point',
  },
  {
    iconCls: 'heat-point-chart-font',
    text: '热力点',
    value: 'heatMap',
  },
  {
    iconCls: 'line-chart-font',
    text: '线',
    value: 'line',
  },
  {
    iconCls: 'area-chart-font',
    text: '面积',
    value: 'area',
  },
  {
    iconCls: 'square-chart-font',
    text: '矩形块',
    value: 'square',
  },
  {
    iconCls: 'pie-chart-font',
    text: '饼图',
    value: 'pie',
  },
  {
    iconCls: 'text-chart-font',
    text: '文本',
    value: 'text',
  },
  {
    iconCls: 'map-chart-font',
    text: '填充地图',
    value: 'map',
  },
  {
    iconCls: 'funnel-chart-font',
    text: '漏斗图',
    value: 'funnel',
  },
  {
    iconCls: 'gauge-chart-font',
    text: '仪表盘',
    value: 'gauge',
  },
  {
    iconCls: 'box-chart-font',
    text: '箱形图',
    value: 'box',
  },
  {
    iconCls: 'flow-line-chart-font',
    text: '流向线',
    value: 'sankey',
  },
  {
    iconCls: '',
    text: '多个',
    value: 'multi',
    invisible: true,
  },
]

export const tableTypeRequiredInfo = [
  {
    type: 'kpiCard',
    required: [
      {
        dimension: '0',
        measure: '1',
      },
    ],
  },
  {
    type: 'table',
    required: [
      {
        dimension: '>=1',
        measure: '1',
      },
    ],
  },
  {
    type: 'groupTable',
    required: [
      {
        dimension: '>=1',
        measure: '>=1',
      },
    ],
  },
  {
    type: 'mini',
    required: [
      {
        dimension: '>=1',
        measure: '>=1',
      },
    ],
  },
  {
    type: 'heat',
    required: [
      {
        dimension: '2',
        measure: '>=0',
      },
    ],
  },
  {
    type: 'sliceColumn',
    required: [
      {
        dimension: '>=1',
        measure: '>=1',
      },
    ],
  },
  {
    type: 'stackColumn',
    required: [
      {
        dimension: '>=1',
        measure: '>=2',
      },
    ],
  },
  {
    type: 'seriesColumn',
    required: [
      {
        dimension: '>=1',
        measure: '>=2',
      },
    ],
  },
  {
    type: 'compareColumn',
    required: [
      {
        dimension: '1',
        measure: '2',
      },
    ],
  },
  {
    type: 'waterFall',
    required: [
      {
        dimension: '>=1',
        measure: '2',
      },
    ],
  },
  {
    type: 'sliceLine',
    required: [
      {
        dimension: '>=1',
        measure: '>=1',
      },
    ],
  },
  {
    type: 'seriesLine',
    required: [
      {
        dimension: '>=1',
        measure: '>=2',
      },
    ],
  },
  {
    type: 'radar',
    required: [
      {
        dimension: '>=1',
        measure: '>=1',
      },
    ],
  },
  {
    type: 'rangeArea',
    required: [
      {
        dimension: '>=1',
        measure: '2',
      },
    ],
  },
  {
    type: 'point',
    required: [
      {
        dimension: '>=1',
        measure: '>=1',
      },
    ],
  },
  {
    type: 'bubble',
    required: [
      {
        dimension: '>=1',
        measure: '1||2',
      },
    ],
  },
  {
    type: 'pie',
    required: [
      {
        dimension: '1',
        measure: '1',
      },
    ],
  },
  {
    type: 'rose',
    required: [
      {
        dimension: '1',
        measure: '2',
      },
    ],
  },
  {
    type: 'multiPie',
    required: [
      {
        dimension: '>=2',
        measure: '1',
      },
    ],
  },
  {
    type: 'areaMap',
    required: [
      {
        dimensionLongitude: '1',
        dimensionLatitude: '1',
        dimension: '0',
        measure: '>=0',
      },
    ],
  },
  {
    type: 'pointMap',
    required: [
      {
        dimensionLongitude: '1',
        dimensionLatitude: '1',
        dimension: '0',
        measure: '>=0',
      },
      {
        measureLongitude: '1',
        measureLatitude: '1',
        dimension: '0',
        measure: '>=0',
      },
    ],
  },
  {
    type: 'lineMap',
    required: [
      {
        dimensionLongitude: '1',
        dimensionLatitude: '1',
        dimension: '1',
        measure: '>=0',
      },
      {
        measureLongitude: '1',
        measureLatitude: '1',
        dimension: '1',
        measure: '>=0',
      },
    ],
  },
  {
    type: 'heatMap',
    required: [
      {
        dimensionLongitude: '1',
        dimensionLatitude: '1',
        dimension: '0',
        measure: '>=0',
      },
      {
        measureLongitude: '1',
        measureLatitude: '1',
        dimension: '0',
        measure: '>=0',
      },
    ],
  },
  {
    type: 'rectTree',
    required: [
      {
        dimension: '>=1',
        measure: '1',
      },
    ],
  },
  {
    type: 'wordCloud',
    required: [
      {
        dimension: '1',
        measure: '1',
      },
    ],
  },
  {
    type: 'funnel',
    required: [
      {
        dimension: '1',
        measure: '1',
      },
    ],
  },
  {
    type: 'gauge',
    required: [
      {
        dimension: '0',
        measure: '1',
      },
    ],
  },
  {
    type: 'box',
    required: [
      {
        dimension: '1',
        measure: '1',
      },
    ],
  },
  {
    type: 'sankey',
    required: [
      {
        dimension: '2',
        measure: '1',
      },
    ],
  },
]

export const chatAttrMap = {
  interval: [
    'color',
    'size',
    'label',
    'tooltip',
    'granularity',
  ],
  point: [
    'color',
    'size',
    'symbol',
    'label',
    'tooltip',
    'granularity',
  ],
  heatMap: [
    'heatColor',
    'size',
    'label',
    'tooltip',
    'granularity',
  ],
  square: [
    'color',
    'size',
    'label',
    'tooltip',
    'granularity',
  ],
  area: [
    'color',
    'lineConnect',
    'label',
    'tooltip',
    'granularity',
  ],
  line: [
    'color',
    'size',
    'lineConnect',
    'label',
    'tooltip',
    'granularity',
  ],
  pie: [
    'color',
    'size',
    'pieAngle',
    'label',
    'tooltip',
    'granularity',
  ],
  text: [
    'color',
    'size',
    'text',
    'tooltip',
    'granularity',
  ],
  map: [
    'color',
    'label',
    'tooltip',
    'granularity',
  ],
  funnel: [
    'color',
    'size',
    'label',
    'tooltip',
    'granularity',
  ],
  gauge: [
    'gaugePointNumber',
    'gaugeMaxValue',
    'color',
    'size',
    'label',
    'tooltip',
    'granularity',
  ],
  multi: [
    'color',
    'size',
    'label',
    'tooltip',
    'granularity',
  ],
  box: [
    'color',
    'size',
    'tooltip',
    'granularity',
  ],
  sankey: [
    'color',
    'sankeyStart',
    'sankeyEnd',
    'size',
    'label',
    'tooltip',
    'granularity',
  ],
}
