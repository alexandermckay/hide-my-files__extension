const filePaths = require('./filePaths')
const {
  confirmFileExists
} = require('../utils/confirmFileExists')

const fileExists = {
  hideMyFilesRc: confirmFileExists(filePaths.hideMyFilesRc),
  settingsDir: confirmFileExists(filePaths.settingsDir),
  settingsFile: confirmFileExists(filePaths.settingsFile)
}

module.exports = fileExists
