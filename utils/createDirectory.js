const { mkdirSync } = require('fs')

const createDirectory = (filePath) => (exists) =>
  !exists && mkdirSync(filePath)

module.exports = {
  createDirectory
}
