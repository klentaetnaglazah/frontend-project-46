import { parseFile } from './parser.js'

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  
  const allKeys = [...new Set([
    ...Object.keys(data1),
    ...Object.keys(data2)
  ])].sort()
  
  const diffLines = []
  
  allKeys.forEach((key) => {
    const value1 = data1[key]
    const value2 = data2[key]
    
    if (!(key in data1)) {
      diffLines.push(`  + ${key}: ${JSON.stringify(value2)}`)
    } else if (!(key in data2)) {
      diffLines.push(`  - ${key}: ${JSON.stringify(value1)}`)
    } else if (JSON.stringify(value1) !== JSON.stringify(value2)) {
      diffLines.push(`  - ${key}: ${JSON.stringify(value1)}`)
      diffLines.push(`  + ${key}: ${JSON.stringify(value2)}`)
    } else {
      diffLines.push(`    ${key}: ${JSON.stringify(value1)}`)
    }
  })
  
  return diffLines.join('\n')
}

export default genDiff
