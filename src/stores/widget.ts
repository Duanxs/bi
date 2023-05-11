import type { ChartAttrMap } from './types'
import type { Axis, Widget } from '@/composables/types'
import type { TableField } from '@/composables/useWeiget'

export const useWidgetStore = defineStore('widget', () => {
  const config = ref<Widget>({
    type: 1,
    name: '',
    timeStamp: +new Date(),
    tableName: null,
    fields: [],
    widgetMeasures: [],
    widgetModel: {
      type: 0,
    },
    settings: {
      nameStyleType: 1,
      titleHeight: 25,
      titleBackground: {
        type: 'color',
        color: '',
        imageId: '',
      },
      widgetBackground: {
        type: 'color',
        color: '',
        imageId: '',
        borderSize: -1,
        borderRadius: -1,
        borderColor: '',
      },
      gisBackground: {
        show: true,
        normal: true,
        layer: null,
        zoomIn: '放大',
        zoomOut: '缩小',
        enableWheelTitle: '开启滚轮缩放',
        disableWheelTitle: '关闭滚轮缩放',
      },
      chartAttr: {
        dimensionId: 'entire',
        type: 'interval',
        color: {
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
        },
        heatColor: {
          opacity: 1,
          name: 'heat',
          autoInterval: true,
          count: 5,
          custom: {
            min: 0,
            max: 0,
            ranges: [],
          },
          colors: null,
          dimensionIds: [],
        },
        label: {
          valid: true,
          levelDimension: false,
          auto: true,
          content: null,
          hasModified: false,
          position: 'outside',
          hasPositionModified: false,
          showWay: 'all',
          allowOverlap: false,
          autoAdjust: 'hide',
          dimensionIds: [],
          nodeLabelValid: false,
          showMeasureSum: false,
        },
        tooltip: {
          auto: true,
          hasModified: false,
          content: null,
          background: '',
          shared: false,
          isSharedValid: false,
          dimensionIds: [],
          forecastKey: '预测',
        },
        size: {
          hasModified: false,
          lastSliderPosition: -1,
          intervalWidth: 30,
          roundRadius: 2,
          pointRadius: 11,
          heatRadius: 40,
          square: {
            width: 30,
            innerRadiusRatio: 0.5,
            convert2MultiPie: false,
          },
          text: {
            size: 50,
            valid: true,
          },
          funnelWidth: 1,
          gaugeRadius: 0.7,
          pieRadius: {
            sameRadius: true,
            radius: 40,
            innerRadiusRatio: 0.75,
          },
          boxWidth: 30,
          nodeWidth: 12,
          defaultSizeValue: null,
          dimensionIds: [],
        },
        pieAngle: {
          dimensionIds: [],
        },
        symbol: {
          symbolType: 'geometric',
          symbol: 'geometry_1',
          symbols: [
            'geometry_1',
            'geometry_2',
            'geometry_3',
            'geometry_4',
            'geometry_5',
            'geometry_6',
            'geometry_7',
            'geometry_8',
            'geometry_9',
            'geometry_10',
          ],
          measure: {
            autoInterval: true,
            count: 2,
            custom: {
              min: 0,
              max: 0,
              ranges: [],
              count: 0,
            },
          },
          dimensionIds: [],
        },
        lineConnect: {
          convert2Radar: {
            valid: false,
            selected: false,
          },
          line: {
            valid: true,
            type: 'normal',
          },
          marker: true,
          borderStyle: 'solid',
          dimensionIds: [],
          nullPattern: 'continuous',
        },
        text: {
          auto: true,
          hasModified: false,
          dimensionIds: [],
          defaultContent: '文本',
          iconStyleMap: {},
          shapeSchemeMap: {},
          fixedFont: true,
        },
        granularity: {
          dimensionIds: [],
        },
        gaugeType: 'slotGauge',
        gaugeMaxValue: {
          auto: true,
          value: '',
          valid: false,
          dimensionIds: [],
        },
        gaugePointNumber: {
          dimensionIds: [],
        },
        sankeyStart: {
          dimensionIds: [],
        },
        sankeyEnd: {
          dimensionIds: [],
        },
      },
      chartStyle: {
        legend: {
          enabled: true,
          fontStyle: {
            auto: true,
            fontFamily: 'Avenir, Segoe UI, PingFangSC-Regular, "Microsoft YaHei"',
            fontSize: 12,
            fontBold: false,
            italic: false,
            fontColor: '',
          },
          borderColor: 'transparent',
          position: 'right-top',
          titleEnabled: true,
          validMapping: null,
        },
        axis: {
          enabled: true,
          type: 'solid',
          color: '',
          width: 1,
        },
        hGrid: {
          enabled: true,
          type: 'dashed',
          color: '',
          width: 1,
        },
        vGrid: {
          enabled: true,
          type: 'dashed',
          color: '',
          width: 1,
        },
        background: {
          enabled: true,
        },
        adaptive: {
          enabled: true,
          type: 'standard',
        },
      },
      tableAttr: {
        color: {
          all: {
            color: '',
            backgroundColor: '',
            dims: [],
            conditions: [],
          },
        },
        shape: {
          all: {
            shape: -1,
            dims: [],
            conditionsList: [],
            color: '',
          },
        },
        filterValue: {},
      },
      tableStyle: {
        form: 1,
        style: null,
        themeColor: null,
        metric: {
          show: true,
          position: 3,
          type: 2,
        },
        freezeDim: true,
        freezeNumbers: 1,
        showSequence: false,
        showRowInfo: true,
        headerTextWrapper: false,
        textWrapper: false,
        expandRowHeader: false,
        expandColHeader: false,
        showRowSum: true,
        showColSum: true,
        showChildRowSum: false,
        showChildColSum: false,
        rowPosition: 'bottom',
        colPosition: 'right',
        sumRowText: '',
        headerRowHeight: 32,
        rowHeight: 32,
        detailRowCounts: 100,
        rowCounts: 20,
        colCounts: 7,
        totalRows: 1000,
        font: {
          type: 1,
          header: {
            fontFamily: null,
            fontSize: null,
            bold: null,
            italic: null,
            underline: null,
            fontAlign: null,
            fontColor: null,
          },
          body: {
            fontFamily: null,
            fontSize: null,
            bold: null,
            italic: null,
            underline: null,
            dimFontAlign: null,
            tarFontAlign: null,
            fontColor: null,
          },
        },
      },
      transmitLinkages: true,
      chartInitState: {},
    },
    view: {
      10000: [],
      20000: [],
      30000: [],
    },
    viewAttr: {
      10000: {
        type: 1,
        left: {},
        right: {},
      },
      20000: {
        type: 1,
      },
      30000: {
        type: 1,
        left: {},
        right: {},
      },
    },
    dimensions: {},
    allData: true,
    drillOrder: [],
    resultFilter: [],
    dimensionGroups: {},
    legendFilter: null,
    columnSize: [],
    regionColumnSize: [],
    equallyDivideColumn: false,
    uploadedImages: [],
    widgetParameters: [],
    explainConf: {
      fieldCombinationList: [
        [],
      ],
    },
  })

  // 初始化时生成 entire
  const chartAttr = ref<ChartAttrMap>({
    entire: getChartAttrSetting(),
  })

  function addChartAxisBy(field: TableField, axis: Axis) {
    const dim = genDimension(field)
    config.value.dimensions[dim.id!] = dim
    config.value.view[axis] = [...config.value.view[axis], dim.id!]

    // y 轴额外处理
    if (axis === AXIS_ENUM.y) {
      const emptySetting = getChartAttrSetting()
      chartAttr.value[dim.id!] = emptySetting
    }
  }

  function delChartAxisBy(index: number, axis: Axis) {
    const dimId = config.value.view[axis][index]
    delete config.value.dimensions[dimId]
    config.value.view[axis].splice(index, 1)
    delete chartAttr.value[dimId]
  }

  return {
    config,
    chartAttr,
    addChartAxisBy,
    delChartAxisBy,
  }
})
