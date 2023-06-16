import type { DimensionValue } from '@/composables/types'
import type { I图表属性名 } from '@/constant/chartTypeAttrSetting'
import { tableData } from '@/constant/data'

function parseNumber(str: string) {
  if (typeof str === 'number')
    return str
  return +(str.replaceAll(',', ''))
}

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
  // 默认x只可以拖维度，y只拖指标，后期再调整为自由拖
  const colorIndex = genDimIndexMap(attrDims.颜色, true) as number
  console.log('attrDims.颜色:', attrDims.颜色[0])
  const colorNames = genDimMap(attrDims.颜色, colorIndex) as string[]
  const colorDim = attrDims.颜色[0]

  const sources: any[] = []
  const xData: string[][] = []
  const dimensions: string[] = []

  const colorLength = colorNames?.length
  // if (colorLength) {
  //   colorNames.forEach((colorName, i) => {
  //     const res = calcData(xDims, yDims)
  //     xData = res.xData
  //     dimensions = res.dimensions
  //     sources.push(res.source)
  //     // sources.push(res.source.map((data, j) => {
  //     //   return [data[0], ...data.slice(1 + i * colorLength, 1 + i * colorLength + colorLength)]
  //     // }))
  //   })
  // }
  // else {
  for (const yDim of yDims) {
    const combineDims = colorDim ? [...xDims, colorDim] : xDims
    const res = calcData(combineDims, yDim)
    sources.push(res.source)
  }

  const data = sources[0]
  for (let i = 1; i < yDims.length; i++) {
    for (let j = 0; j < sources[0].length; j++) {
      const key = yDims[i]?.name || ''
      if (key) {
        data[j][key] = sources[i][j][key]
      }
    }
  }
  // xData = res.xData
  // dimensions = res.dimensions
  // }

  return { sources, xData, dimensions, data }
}

function calcData(
  xDims: DimensionValue[],
  yDim: DimensionValue,
) {
  const data = tableData.data.map((data) => {
    const obj: Record<string, any> = {}
    tableData.fields.forEach((field, index) => {
      obj[field.name] = data[index]
    })
    return obj
  })
  // console.log('data ~ data:', data)

  const dimIndexMap = genDimIndexMap([...xDims, yDim]) as Record<string, number>
  const source: Record<string, any>[] = []
  const rowMap: Record<string, number> = {}
  let currentIndex = 0
  const yDimName = yDim.name!
  data.forEach((row) => {
    const selectDims = xDims.map(xDim => row[xDim.name!])
    const key = selectDims.join('_')
    const index = rowMap[key]
    if (index === undefined) {
      rowMap[key] = currentIndex
      currentIndex++
      source.push(row)
    }
    else {
      source[index][yDimName] = parseNumber(source[index][yDimName]) + parseNumber(row[yDimName])
    }
  })

  // const hasColor = Boolean(attr?.color)

  const rowNames = genDimMap(xDims, dimIndexMap) as string[][]

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
