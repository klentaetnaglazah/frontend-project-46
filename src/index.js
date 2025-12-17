import { parseFile } from './parser.js'

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const allKeys = [...new Set([
    ...Object.keys(data1),
    ...Object.keys(data2)
  ])].sort()

  const diffLines = allKeys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!(key in data1)) {
      return `  + ${key}: ${JSON.stringify(value2)}`
    }

    if (!(key in data2)) {
      return `  - ${key}: ${JSON.stringify(value1)}`
    }

    if (JSON.stringify(value1) !== JSON.stringify(value2)) {
      return `  - ${key}: ${JSON.stringify(value1)}\n  + ${key}: ${JSON.stringify(value2)}`
    }

    return `    ${key}: ${JSON.stringify(value1)}`
  })

  return `{\n${diffLines.join('\n')}\n}`
}

export default genDiff
