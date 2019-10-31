const isObjectEmpty = (obj) =>
  obj.constructor === Object && Object.entries(obj).length === 0

module.exports = { isObjectEmpty }
