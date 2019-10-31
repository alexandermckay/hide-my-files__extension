const { window, workspace } = require('vscode')

const getWorkspaceFolder = ({ workspaceFolders }) =>
  workspaceFolders
    ? workspaceFolders[0].uri
    : window.showInformationMessage(
        'Open a workspace to use this extension!'
      )

const { fsPath } = getWorkspaceFolder(workspace)

module.exports = {
  fsPath
}
