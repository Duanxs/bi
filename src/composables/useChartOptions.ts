import type { DimensionValue } from './types'

// const emptyWidgetConfig = {
//   type: 1,
//   name: '',
//   timeStamp: 1683694538956,
//   tableName: null,
//   fields: [],
//   widgetMeasures: [],
//   widgetModel: {
//     type: 0,
//   },
//   settings: {
//     nameStyleType: 1,
//     titleHeight: 25,
//     titleBackground: {
//       type: 'color',
//       color: '',
//       imageId: '',
//     },
//     widgetBackground: {
//       type: 'color',
//       color: '',
//       imageId: '',
//       borderSize: -1,
//       borderRadius: -1,
//       borderColor: '',
//     },
//     gisBackground: {
//       show: true,
//       normal: true,
//       layer: null,
//       zoomIn: '放大',
//       zoomOut: '缩小',
//       enableWheelTitle: '开启滚轮缩放',
//       disableWheelTitle: '关闭滚轮缩放',
//     },
//     chartAttr: {},
//     chartStyle: {
//       legend: {
//         enabled: true,
//         fontStyle: {
//           auto: true,
//           fontFamily: 'Avenir, Segoe UI, PingFangSC-Regular, "Microsoft YaHei"',
//           fontSize: 12,
//           fontBold: false,
//           italic: false,
//           fontColor: '',
//         },
//         borderColor: 'transparent',
//         position: 'right-top',
//         titleEnabled: true,
//         validMapping: null,
//       },
//       axis: {
//         enabled: true,
//         type: 'solid',
//         color: '',
//         width: 1,
//       },
//       hGrid: {
//         enabled: true,
//         type: 'dashed',
//         color: '',
//         width: 1,
//       },
//       vGrid: {
//         enabled: true,
//         type: 'dashed',
//         color: '',
//         width: 1,
//       },
//       background: {
//         enabled: true,
//       },
//       adaptive: {
//         enabled: true,
//         type: 'standard',
//       },
//     },
//     tableAttr: {
//       color: {
//         all: {
//           color: '',
//           backgroundColor: '',
//           dims: [],
//           conditions: [],
//         },
//       },
//       shape: {
//         all: {
//           shape: -1,
//           dims: [],
//           conditionsList: [],
//           color: '',
//         },
//       },
//       filterValue: {},
//     },
//     tableStyle: {
//       form: 1,
//       style: null,
//       themeColor: null,
//       metric: {
//         show: true,
//         position: 3,
//         type: 2,
//       },
//       freezeDim: true,
//       freezeNumbers: 1,
//       showSequence: false,
//       showRowInfo: true,
//       headerTextWrapper: false,
//       textWrapper: false,
//       expandRowHeader: false,
//       expandColHeader: false,
//       showRowSum: true,
//       showColSum: true,
//       showChildRowSum: false,
//       showChildColSum: false,
//       rowPosition: 'bottom',
//       colPosition: 'right',
//       sumRowText: '',
//       headerRowHeight: 32,
//       rowHeight: 32,
//       detailRowCounts: 100,
//       rowCounts: 20,
//       colCounts: 7,
//       totalRows: 1000,
//       font: {
//         type: 1,
//         header: {
//           fontFamily: null,
//           fontSize: null,
//           bold: null,
//           italic: null,
//           underline: null,
//           fontAlign: null,
//           fontColor: null,
//         },
//         body: {
//           fontFamily: null,
//           fontSize: null,
//           bold: null,
//           italic: null,
//           underline: null,
//           dimFontAlign: null,
//           tarFontAlign: null,
//           fontColor: null,
//         },
//       },
//     },
//     transmitLinkages: true,
//     chartInitState: {},
//   },
//   view: {
//     10000: [],
//     20000: [],
//     30000: [],
//   },
//   viewAttr: {
//     10000: {
//       type: 1,
//       left: {},
//       right: {},
//     },
//     20000: {
//       type: 1,
//     },
//     30000: {
//       type: 1,
//       left: {},
//       right: {},
//     },
//   },
//   dimensions: {},
//   allData: true,
//   drillOrder: [],
//   resultFilter: [],
//   dimensionGroups: {},
//   legendFilter: null,
//   columnSize: [],
//   regionColumnSize: [],
//   equallyDivideColumn: false,
//   uploadedImages: [],
//   widgetParameters: [],
//   explainConf: {
//     fieldCombinationList: [
//       [],
//     ],
//   },
// }

const emptyWidgetDimensionConfig: DimensionValue = {
  id: null,
  type: null,
  fieldId: null,
  name: null,
  group: {
    type: null,
  },
  settings: {
    annotate: [],
    flash: [],
    imageData: [],
    cordon: [],
    trendLine: [],
    valueAxis: {},
    categoryAxis: {},
    stack: false,
    dateFormat: {},
    tableShape: {
      shape: -1,
      color: '',
      filters: [],
    },
    tableColor: {
      color: '',
      backgroundColor: '',
      filters: [],
    },
    showType: 0,
    showSum: false,
  },
  calculation: {
    type: 0,
  },
  drillDimensions: {},
  counterDep: 'TOTAL_ROWS',
  metric: 0,
  used: true,
}

export function genDimension(field: DimensionValue): DimensionValue {
  return {
    ...emptyWidgetDimensionConfig,
    id: genId(),
    name: field.name,
    fieldId: field.id,
  }
}

export function genDimensionByAnother(field: DimensionValue): DimensionValue {
  return {
    ...emptyWidgetDimensionConfig,
    id: genId(),
    name: field.name,
    fieldId: field.fieldId,
  }
}
