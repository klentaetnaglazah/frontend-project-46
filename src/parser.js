import { readFileSync } from 'fs'
import { extname, resolve } from 'path'
import { cwd } from 'process'
import { parse as parseYAML } from 'yaml'

const getAbsolutePath = (filepath) => resolve(cwd(), filepath)

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  return readFileSync(absolutePath, 'utf-8')
}

const parsingStrategies = {
  json: (data) => JSON.parse(data),
  yaml: (data) => parseYAML(data),
  yml: (data) => parseYAML(data),
}

const getFileFormat = (filepath) => {
  const extension = extname(filepath).slice(1).toLowerCase()
  return extension
}

export const parseFile = (filepath) => {
  const content = readFile(filepath)
  const format = getFileFormat(filepath)

  if (!(format in parsingStrategies)) {
    throw new Error(`Unsupported file format: ${format}`)
  }

  const parseStrategy = parsingStrategies[format]
  return parseStrategy(content)
}
