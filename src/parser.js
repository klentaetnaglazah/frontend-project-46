import { readFileSync } from 'fs'
import { extname, resolve } from 'path'
import { cwd } from 'process'

const getAbsolutePath = (filepath) => {
  return resolve(cwd(), filepath)
}

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  return readFileSync(absolutePath, 'utf-8')
}

const parse = (data, format) => {
  switch (format.toLowerCase()) {
    case 'json':
      return JSON.parse(data)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}

const getFileFormat = (filepath) => {
  const extension = extname(filepath).slice(1)
  return extension.toLowerCase()
}

export const parseFile = (filepath) => {
  const content = readFile(filepath)
  const format = getFileFormat(filepath)
  return parse(content, format)
}
