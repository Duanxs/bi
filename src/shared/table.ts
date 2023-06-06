import type { DimensionValue } from '@/composables/types'
import { tableData } from '@/constant/data'

export function calcTableData(xDims: DimensionValue[], yDims: DimensionValue[]) {
  // if (!xDims.length || !yDims.length)
  //   return {
  //     source: [],
  //     xData: [],
  //   }
  // TODO:
  // 默认x只可以拖维度，y只拖指标，后期再调整为自由拖。且 y只处理一条数据
  const source: Array<Array<string | number>> = []

  const dimIndexMap = genDimIndexMap(...xDims, ...yDims)
  const rowNames = genDimMap(xDims, dimIndexMap)
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
    const rowKey = rowKeyArr.join('_')
    rowMap[rowKey] = {
      key: `${rowKey}_${i}`,
      value: 0,
    }
  }

  tableData.data.forEach((row) => {
    const rowKey = xDims.map(xDim => row[dimIndexMap[xDim.id!]]).join('_')
    if (yDims.length) {
      rowMap[rowKey].value += +row[dimIndexMap[yDims[0].id!]]
    }
  })

  const sourceNameMap: Record<string, number> = {}
  let sourceNameIndex = 0

  for (const rowKey in rowMap) {
    const names = rowKey.split('_')
    const dim0 = names[0]
    const dim1 = names.at(-1)
    if (dim1) {
      if (sourceNameMap[dim0] === undefined) {
        sourceNameMap[dim0] = sourceNameIndex
        sourceNameIndex++
        source[sourceNameMap[dim0]] = [dim0]
      }
      source[sourceNameMap[dim0]].push(rowMap[rowKey].value)
    }
  }

  const dimensions: string[] = []
  if (xDims.length) {
    const dimCount = total / rowNames.at(-1)!.length
    dimensions.push(
      xDims[0].name!,
      ...rowFullNames.at(-1)?.slice(0, dimCount) || [],
    )
  }

  return { source, xData, dimensions }
}

function genDimIndexMap(...args: DimensionValue[]) {
  const dimIndexMap: Record<string, number> = {}
  args.forEach((dim) => {
    dimIndexMap[dim.id!] = getFieldDataIndex(dim.name)
  })
  return dimIndexMap
}

function genDimMap(dims: DimensionValue[], indexMap: Record<string, number>) {
  const names: string[][] = []
  dims.forEach((dim) => {
    const index = indexMap[dim.id!]
    const set = new Set<string>()
    tableData.data.forEach((row) => {
      set.add(row[index])
    })
    names.push(Array.from(set))
  })
  return names
}

function getFieldDataIndex(name: string | null, data = tableData) {
  return data.fields.findIndex(field => field.name === name)
}
