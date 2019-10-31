const { compose } = require('rambda')
const { readFile } = require('./readFile')

const readParseJSON = compose(
  JSON.parse,
  readFile
)

module.exports = {
  readParseJSON
}
