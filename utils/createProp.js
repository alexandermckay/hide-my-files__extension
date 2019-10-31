const createProp = (condition, obj, prop, value) =>
  condition && (obj[prop] = value)

module.exports = {
  createProp
}
