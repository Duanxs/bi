import type { DimensionValue } from '@/composables/types'
import type { I图表属性名 } from '@/constant/chartTypeAttrSetting'
import { tableData } from '@/constant/data'

export function calcTableData(
  xDims: DimensionValue[],
  yDims: DimensionValue[],
  attrDims: Record<I图表属性名, DimensionValue[]>,
) {
  if (!xDims.length || !yDims.length)
    return {
      sources: [],
      xData: [],
      dimensions: [],
    }
  // TODO:
  // 默认x只可以拖维度，y只拖指标，后期再调整为自由拖。且 y只处理一条数据
  const colorIndex = genDimIndexMap(attrDims.颜色, true) as number
  const colorNames = genDimMap(attrDims.颜色, colorIndex) as string[]

  const sources: any[] = []
  let xData: string[][] = []
  let dimensions: string[] = []

  const colorLength = colorNames?.length
  if (colorLength) {
    colorNames.forEach((colorName, i) => {
      const res = calcData(xDims, yDims, { color: { name: colorName, index: colorIndex } })
      xData = res.xData
      dimensions = res.dimensions
      console.log('colorNames.forEach ~ res:', res)
      sources.push(res.source)
      // sources.push(res.source.map((data, j) => {
      //   return [data[0], ...data.slice(1 + i * colorLength, 1 + i * colorLength + colorLength)]
      // }))
    })
  }
  else {
    const res = calcData(xDims, yDims)
    sources.push(res.source)
    xData = res.xData
    dimensions = res.dimensions
  }

  return { sources, xData, dimensions }
}

function calcData(
  xDims: DimensionValue[],
  yDims: DimensionValue[],
  attr?: Record<string, { name: string; index: number }>,
) {
  const source: Array<Array<string | number>> = []

  const hasColor = Boolean(attr?.color)
  console.log('attr:', attr)
  console.log('hasColor:', hasColor)

  const dimIndexMap = genDimIndexMap([...xDims, ...yDims]) as Record<string, number>
  const rowNames = genDimMap(xDims, dimIndexMap) as string[][]

  const rowMap: Record<string, { key: string; value: number }> = {}

  const total = rowNames.reduce((prev, cur) => prev * cur.length, 1)
  let repeatCount = total

  const rowFullNames = rowNames.map((names) => {
    repeatCount /= names.length
    const one = names.map((field) => {
      return Array.from<string>({ length: repeatCount }).fill(field)
    }).flat()
    const repeatAllCount = total / (repeatCount * names.length)
    return Array.from<string[]>({ length: repeatAllCount }).fill(one).flat()
  })

  const xData: string[][] = []

  // [1, 2, 3]
  // [a, b, c]
  // [a, b, c] * 3
  xData.push(rowNames?.[0])
  let prevCount = rowNames?.[0]?.length || 0
  for (let i = 1; i < rowNames.length; i++) {
    const names = rowNames[i]
    xData.push(Array.from<string[]>({ length: prevCount }).fill(names).flat())
    prevCount *= names.length
  }

  for (let i = 0; i < total; i++) {
    const rowKeyArr: string[] = []
    for (let j = 0; j < rowFullNames.length; j++) {
      rowKeyArr.push(rowFullNames[j][i])
    }
    const rowKey = hasColor ? [...rowKeyArr, attr!.color.name].join('_') : rowKeyArr.join('_')
    rowMap[rowKey] = {
      key: `${rowKey}_${i}`,
      value: 0,
    }
  }

  tableData.data.forEach((row) => {
    const rowKey = hasColor
      ? `${xDims.map(xDim => row[dimIndexMap[xDim.id!]]).join('_')}_${attr!.color.name}`
      : xDims.map(xDim => row[dimIndexMap[xDim.id!]]).join('_')
    if (yDims.length) {
      if (hasColor) {
        if (row[attr!.color.index] === attr!.color.name) {
          rowMap[rowKey].value += +row[dimIndexMap[yDims[0].id!]]
        }
      }
      else {
        rowMap[rowKey].value += +row[dimIndexMap[yDims[0].id!]]
      }
    }
  })
  console.log('tableData.data.forEach ~ rowMap:', rowMap)

  const sourceNameMap: Record<string, number> = {}
  let sourceNameIndex = 0

  for (const rowKey in rowMap) {
    const names = rowKey.split('_')
    const dim0 = names[0]
    const dim1 = names.at(hasColor ? -2 : -1)

    if (dim1) {
      if (sourceNameMap[dim0] === undefined) {
        sourceNameMap[dim0] = sourceNameIndex
        sourceNameIndex++
        source[sourceNameMap[dim0]] = [dim0]
      }
      source[sourceNameMap[dim0]].push(rowMap[rowKey].value)
    }
  }

  // console.log('rowFullNames:', rowFullNames)
  const dimensions: string[] = []
  if (xDims.length) {
    const dimCount = total / rowNames.at(-1)!.length
    dimensions.push(
      xDims[0].name!,
      ...rowFullNames.at(-1)?.slice(0, dimCount - 1) || [],
    )
  }

  return { source, xData, dimensions }
}

function genDimIndexMap(args: DimensionValue[], single = false) {
  if (!args.length)
    return -1
  const dimIndexMap: Record<string, number> = {}
  if (single)
    return getFieldDataIndex(args[0].name)
  args.forEach((dim) => {
    dimIndexMap[dim.id!] = getFieldDataIndex(dim.name)
  })
  return dimIndexMap
}

function genDimMap(dims: DimensionValue[], indexMap: Record<string, number> | number) {
  const isNumber = typeof indexMap === 'number'
  const names: string[][] = []
  dims.forEach((dim) => {
    const index = isNumber ? indexMap : indexMap[dim.id!]
    const set = new Set<string>()
    tableData.data.forEach((row) => {
      set.add(row[index])
    })
    names.push(Array.from(set))
  })
  return isNumber ? names[0] : names
}

function getFieldDataIndex(name: string | null, data = tableData) {
  return data.fields.findIndex(field => field.name === name)
}
