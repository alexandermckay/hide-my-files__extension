const path = require('path')

const createFilePath = (filePath) => (...args) =>
  path.join(filePath, ...args)

module.exports = {
  createFilePath
}
