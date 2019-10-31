const vscode = require('vscode')
const filePaths = require('./collections/filePaths')
const fileExists = require('./collections/fileExists')
const { createDirectory } = require('./utils/createDirectory')
const { readFile } = require('./utils/readFile')
const { writeFile } = require('./utils/writeFile')
const { isObjectEmpty } = require('./utils/isObjectEmpty')
const R = require('rambda')

const SETTINGS_CREATED = 'A settings.json file has been created!'

const createSettingsDirectory = createDirectory(
  filePaths.settingsDir
)
const writeSettingsFile = writeFile(filePaths.settingsFile)

/* ISOLATE */

const jsonToJavascript = (json) => JSON.parse(json)

const modifyHideMyFilesRc = (
  filesExclude,
  settings,
  infoMessage
) => {
  const modifyFilesExcludeProp = {
    ...settings,
    'files.exclude': filesExclude
  }
  vscode.window.showInformationMessage(infoMessage)
  writeSettingsFile(modifyFilesExcludeProp)
}

// const createHideMyFilesRc = (excludedFiles) => {
//   const newFile = {
//     'files.exclude': excludedFiles
//   }
//   writeSettingsFile(newFile)
//   vscode.window.showInformationMessage(
//     'A settings.json file has been created!'
//   )
// }

const includeAllFiles = (settings) => {
  const removeFiles = {
    ...settings,
    'files.exclude': {}
  }
  writeSettingsFile(removeFiles)
}

const excludeFiles = (settings, excludedFiles) => {
  const addFiles = {
    ...settings,
    'files.exclude': excludedFiles
  }
  writeSettingsFile(addFiles)
}

const createFilesExcludeProp = (obj) => {
  if (obj['files.exclude'] === undefined) {
    obj['files.exclude'] = {}
  }
}

const hideMyFilesRcFileAvailable = () => {
  const configFileRead = readFile(filePaths.hideMyFilesRc)
  const configToJS = JSON.parse(configFileRead)
  createSettingsDirectory(fileExists.settingsDir)

  if (fileExists.settingsFile) {
    const settingsFileRead = readFile(filePaths.settingsFile)
    const settingsToJS = JSON.parse(settingsFileRead)

    createFilesExcludeProp(settingsToJS)

    const settingsIsEmpty = isObjectEmpty(
      settingsToJS['files.exclude']
    )

    if (settingsIsEmpty) {
      excludeFiles(settingsToJS, configToJS)
    } else {
      includeAllFiles(settingsToJS)
    }
  } else {
    modifyHideMyFilesRc(configToJS, null, SETTINGS_CREATED)
  }
}

const hideMyFilesRcFileMissing = () =>
  vscode.window.showInformationMessage(
    "Oi! You haven't created a .hidemyfilesrc file."
  )

const hideFiles = R.ifElse(
  () => fileExists.hideMyFilesRc,
  () => hideMyFilesRcFileAvailable(),
  () => hideMyFilesRcFileMissing()
)

/* --- */

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.hideFiles',
    hideFiles
  )

  context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
