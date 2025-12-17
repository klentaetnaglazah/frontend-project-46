#!/usr/bin/env node

import { Command } from 'commander'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(`Comparing ${filepath1} and ${filepath2}`)
    console.log(`Output format: ${options.format}`)
  })
  .helpOption('-h, --help', 'display help for command')

if (process.argv.length <= 2) {
  program.help()
} else {
  program.parse(process.argv)
}
