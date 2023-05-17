import type { AXIS_TYPES } from '@/enums/chartTypes'

export type Axis = `${AXIS_TYPES}`
export interface Dimension {
  [key: string]: DimensionValue
}

export interface DimensionValue {
  id: string | null
  type: number | null
  fieldId: string | null
  name: string | null
  group: {
    type: string | null
  }
  settings: DimensionSetting
  calculation: any
  drillDimensions: any
  counterDep: any
  metric: number
  used: boolean
}

export interface DimensionSetting {
  annotate: any[]
  flash: any[]
  imageData: any[]
  cordon: any[]
  trendLine: any[]
  valueAxis: any
  categoryAxis: any
  stack: boolean
  dateFormat: any
  tableShape: {
    shape: number
    color: string
    filters: any[]
  }
  tableColor: {
    color: string
    backgroundColor: string
    filters: any[]
  }
  showType: number
  showSum: boolean
}

export interface Widget {
  type: number
  name: string
  timeStamp: number
  tableName: string | null
  fields: any[]
  widgetMeasures: any[]
  widgetModel: {
    type: number
  }
  settings: {
    nameStyleType: 1
    titleHeight: 25
    titleBackground: {
      type: 'color'
      color: ''
      imageId: ''
    }
    widgetBackground: {
      type: 'color'
      color: ''
      imageId: ''
      borderSize: -1
      borderRadius: -1
      borderColor: ''
    }
    gisBackground: {
      show: true
      normal: true
      layer: null
      zoomIn: '放大'
      zoomOut: '缩小'
      enableWheelTitle: '开启滚轮缩放'
      disableWheelTitle: '关闭滚轮缩放'
    }
    chartAttr: {}
    chartStyle: {
      legend: {
        enabled: true
        fontStyle: {
          auto: true
          fontFamily: 'Avenir, Segoe UI, PingFangSC-Regular, "Microsoft YaHei"'
          fontSize: 12
          fontBold: false
          italic: false
          fontColor: ''
        }
        borderColor: 'transparent'
        position: 'right-top'
        titleEnabled: true
        validMapping: null
      }
      axis: {
        enabled: true
        type: 'solid'
        color: ''
        width: 1
      }
      hGrid: {
        enabled: true
        type: 'dashed'
        color: ''
        width: 1
      }
      vGrid: {
        enabled: true
        type: 'dashed'
        color: ''
        width: 1
      }
      background: {
        enabled: true
      }
      adaptive: {
        enabled: true
        type: 'standard'
      }
    }
    tableAttr: {
      color: {
        all: {
          color: ''
          backgroundColor: ''
          dims: []
          conditions: []
        }
      }
      shape: {
        all: {
          shape: -1
          dims: []
          conditionsList: []
          color: ''
        }
      }
      filterValue: {}
    }
    tableStyle: {
      form: 1
      style: null
      themeColor: null
      metric: {
        show: true
        position: 3
        type: 2
      }
      freezeDim: true
      freezeNumbers: 1
      showSequence: false
      showRowInfo: true
      headerTextWrapper: false
      textWrapper: false
      expandRowHeader: false
      expandColHeader: false
      showRowSum: true
      showColSum: true
      showChildRowSum: false
      showChildColSum: false
      rowPosition: 'bottom'
      colPosition: 'right'
      sumRowText: ''
      headerRowHeight: 32
      rowHeight: 32
      detailRowCounts: 100
      rowCounts: 20
      colCounts: 7
      totalRows: 1000
      font: {
        type: 1
        header: {
          fontFamily: null
          fontSize: null
          bold: null
          italic: null
          underline: null
          fontAlign: null
          fontColor: null
        }
        body: {
          fontFamily: null
          fontSize: null
          bold: null
          italic: null
          underline: null
          dimFontAlign: null
          tarFontAlign: null
          fontColor: null
        }
      }
    }
    transmitLinkages: true
    chartInitState: {}
  }
  view: Record<Axis, string[]>
  viewAttr: {
    10000: {
      type: number
      left: {}
      right: {}
    }
    20000: {
      type: number
    }
    30000: {
      type: number
      left: {}
      right: {}
    }
  }
  dimensions: Dimension
  allData: boolean
  drillOrder: any[]
  resultFilter: any[]
  dimensionGroups: {}
  legendFilter: null
  columnSize: []
  regionColumnSize: []
  equallyDivideColumn: false
  uploadedImages: []
  widgetParameters: []
  explainConf: {
    fieldCombinationList: [
      [],
    ]
  }
}
