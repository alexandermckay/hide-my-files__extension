const { readFileSync } = require('fs')

const readFile = (filePath) => readFileSync(filePath, 'utf-8')

module.exports = {
  readFile
}
