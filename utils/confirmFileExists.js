const { existsSync } = require('fs')

const confirmFileExists = (filePath) => existsSync(filePath)

module.exports = {
  confirmFileExists
}
