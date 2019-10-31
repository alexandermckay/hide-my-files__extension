const { createFilePath } = require('../utils/createFilePath')
const { fsPath } = require('../utils/getWorkspaceFolder')

const HIDE_MY_FILES_RC = '.hidemyfilesrc'
const VS_CODE = '.vscode'
const SETTINGS = 'settings.json'

const createFilePathToWorkspace = createFilePath(fsPath)

const filePaths = {
  hideMyFilesRc: createFilePathToWorkspace(HIDE_MY_FILES_RC),
  settingsDir: createFilePathToWorkspace(VS_CODE),
  settingsFile: createFilePathToWorkspace(VS_CODE, SETTINGS)
}

module.exports = filePaths
