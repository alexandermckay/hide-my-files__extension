const { commands, window } = require('vscode')
// const { hideFiles } = require('./commands/hide-my-files')

const filePaths = require('./collections/filePaths')
const fileExists = require('./collections/fileExists')
const { createDirectory } = require('./utils/createDirectory')
const { writeFile } = require('./utils/writeFile')
const { isObjectEmpty } = require('./utils/isObjectEmpty')
const R = require('rambda')
const { readParseJSON } = require('./utils/readParseJSON')
const { createProp } = require('./utils/createProp')

const SETTINGS_CREATED = 'A settings.json file has been created!'
const FILES_INCLUDED = 'All files are visible!'
const FILES_HIDDEN = 'Files are hidden!'
const FILES_EXCLUDE = 'files.exclude'

const createSettingsDirectory = createDirectory(
  filePaths.settingsDir
)
const writeSettingsFile = writeFile(filePaths.settingsFile)

/* ISOLATE */

const modifyHideMyFilesRc = (
  filesExclude,
  settings,
  infoMessage
) => {
  const modifyFilesExcludeProp = {
    ...settings,
    [FILES_EXCLUDE]: filesExclude
  }
  window.showInformationMessage(infoMessage)
  writeSettingsFile(modifyFilesExcludeProp)
}

const hideMyFilesRcFileAvailable = () => {
  const configToJS = readParseJSON(filePaths.hideMyFilesRc)
  createSettingsDirectory(fileExists.settingsDir)

  if (fileExists.settingsFile) {
    const settingsToJS = readParseJSON(filePaths.settingsFile)

    const filesExcludePropMissing = R.not(
      R.has(FILES_EXCLUDE, settingsToJS)
    )

    createProp(
      filesExcludePropMissing,
      settingsToJS,
      FILES_EXCLUDE,
      {}
    )

    const settingsIsEmpty = isObjectEmpty(
      settingsToJS['files.exclude']
    )

    R.ifElse(
      (fileExcludeEmpty) => fileExcludeEmpty,
      () =>
        modifyHideMyFilesRc(
          configToJS,
          settingsToJS,
          FILES_HIDDEN
        ),
      () => modifyHideMyFilesRc({}, settingsToJS, FILES_INCLUDED)
    )(settingsIsEmpty)
  } else {
    modifyHideMyFilesRc(configToJS, null, SETTINGS_CREATED)
  }
}

const hideMyFilesRcFileMissing = () =>
  window.showInformationMessage(
    "Oi! You haven't created a .hidemyfilesrc file."
  )

const hideFiles = R.ifElse(
  () => fileExists.hideMyFilesRc,
  () => hideMyFilesRcFileAvailable(),
  () => hideMyFilesRcFileMissing()
)

/* --- */

function activate(context) {
  let disposable = commands.registerCommand(
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
