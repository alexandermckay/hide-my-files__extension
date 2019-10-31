const vscode = require('vscode')
const filePaths = require('./collections/filePaths')
const fileExists = require('./collections/fileExists')
const { createDirectory } = require('./utils/createDirectory')
const { readFile } = require('./utils/readFile')
const { writeFile } = require('./utils/writeFile')
const { isObjectEmpty } = require('./utils/isObjectEmpty')

const createSettingsDirectory = createDirectory(
  filePaths.settingsDir
)
const writeSettingsFile = writeFile(filePaths.settingsFile)

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.hideFiles',
    () => {
      // Control Flow
      if (fileExists.hideMyFilesRc) {
        const configFileRead = readFile(filePaths.hideMyFilesRc)
        const configToJS = JSON.parse(configFileRead)
        createSettingsDirectory(fileExists.settingsDir)
        if (fileExists.settingsFile) {
          const settingsFileRead = readFile(
            filePaths.settingsFile
          )
          const settingsToJS = JSON.parse(settingsFileRead)

          if (settingsToJS['files.exclude'] === undefined) {
            settingsToJS['files.exclude'] = {}
          }

          console.log(settingsToJS)

          const settingsIsEmpty = isObjectEmpty(
            settingsToJS['files.exclude']
          )

          if (settingsIsEmpty) {
            const addFiles = {
              ...settingsToJS,
              'files.exclude': configToJS
            }

            writeSettingsFile(addFiles)
          } else {
            const removeFiles = {
              ...settingsToJS,
              'files.exclude': {}
            }

            writeSettingsFile(removeFiles)
          }
        } else {
          vscode.window.showInformationMessage(
            'A settings.json file has been created!'
          )
          const newFile = {
            'files.exclude': configToJS
          }
          writeSettingsFile(newFile)
        }
      } else {
        vscode.window.showInformationMessage(
          "Oi, Dummy! You haven't created a .hidefilesrc file."
        )
      }
    }
  )

  context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
