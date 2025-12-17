import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8')

describe('genDiff', () => {
  const expected = readFile('expected.txt').trim()

  test('should compare two flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    const result = genDiff(filepath1, filepath2)

    expect(result).toBe(expected)
  })

  test('should work with relative paths', () => {
    const filepath1 = '__tests__/__fixtures__/file1.json'
    const filepath2 = '__tests__/__fixtures__/file2.json'

    const result = genDiff(filepath1, filepath2)

    expect(result).toBe(expected)
  })

  test('should throw error for non-existent file', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('nonexistent.json')

    expect(() => {
      genDiff(filepath1, filepath2)
    }).toThrow()
  })

  test('should throw error for unsupported file format', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('unsupported.txt')

    const fs = require('fs')
    const unsupportedPath = getFixturePath('unsupported.txt')
    fs.writeFileSync(unsupportedPath, 'just text')

    expect(() => {
      genDiff(filepath1, filepath2)
    }).toThrow('Unsupported format')

    fs.unlinkSync(unsupportedPath)
  })
})

describe('YAML support for genDiff', () => {
  const expectedDiff = readFixture('expected.yml').trim()

  test('should correctly compare two flat YAML files', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yml')
    const result = genDiff(filepath1, filepath2)
    expect(result).toBe(expectedDiff)
  })

  test('should detect file format based on .yml extension', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yml')
    expect(() => genDiff(filepath1, filepath2)).not.toThrow()
  })

  test('should also support .yaml extension', () => {
    const filepath1 = getFixturePath('file1.yaml')
    const filepath2 = getFixturePath('file2.yaml')
    expect(() => genDiff(filepath1, filepath2)).not.toThrow()
  })
})
