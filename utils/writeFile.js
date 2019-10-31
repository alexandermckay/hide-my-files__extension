const { prettyPrint } = require('./prettyPrint')
const fs = require('fs')

const writeFile = (filePath) => (obj) =>
  fs.writeFile(filePath, prettyPrint(obj), console.log)

module.exports = {
  writeFile
}
