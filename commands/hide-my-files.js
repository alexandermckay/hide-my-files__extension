const { window } = require('vscode')
const filePaths = require('../collections/filePaths')
const fileExists = require('../collections/fileExists')
const { createDirectory } = require('../utils/createDirectory')
const { writeFile } = require('../utils/writeFile')
const { isObjectEmpty } = require('../utils/isObjectEmpty')
const R = require('rambda')
const { readParseJSON } = require('../utils/readParseJSON')
const { createProp } = require('../utils/createProp')

const SETTINGS_CREATED = 'A settings.json file has been created!'
const FILES_INCLUDED = 'All files are visible!'
const FILES_HIDDEN = 'Files are hidden!'
const FILES_EXCLUDE = 'files.exclude'
const CONFIG_MISSING = `Oi! You haven't created a .hidemyfilesrc file.`

const createSettingsDirectory = createDirectory(
  filePaths.settingsDir
)
const writeSettingsFile = writeFile(filePaths.settingsFile)

const modifyHideMyFilesRc = (
  filesExclude,
  settings,
  infoMessage
) => {
  const modifyFilesExcludeProp = {
    ...settings,
    [FILES_EXCLUDE]: filesExclude
  }
  writeSettingsFile(modifyFilesExcludeProp)
  window.showInformationMessage(infoMessage)
}

const hideMyFilesRcFileAvailable = () => {
  const configToJS = readParseJSON(filePaths.hideMyFilesRc)
  createSettingsDirectory(fileExists.settingsDir)

  const editSettingsFile = () => {
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

    const hideFiles = () =>
      modifyHideMyFilesRc(configToJS, settingsToJS, FILES_HIDDEN)

    const showFiles = () =>
      modifyHideMyFilesRc({}, settingsToJS, FILES_INCLUDED)

    R.ifElse(
      (fileExcludeEmpty) => fileExcludeEmpty,
      hideFiles,
      showFiles
    )(settingsIsEmpty)
  }

  const createSettingsFile = () =>
    modifyHideMyFilesRc(configToJS, null, SETTINGS_CREATED)

  R.ifElse(
    fileExists.settingsFile,
    editSettingsFile,
    createSettingsFile
  )()
}

const hideMyFilesRcFileMissing = () =>
  window.showInformationMessage(CONFIG_MISSING)

const hideFiles = R.ifElse(
  () => fileExists.hideMyFilesRc,
  () => hideMyFilesRcFileAvailable(),
  () => hideMyFilesRcFileMissing()
)

module.exports = {
  hideFiles
}
