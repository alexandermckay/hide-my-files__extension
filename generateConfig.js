const fs = require('fs')
const R = require('rambda')
const config = require('./hide.config')
const { writeFile } = require('./utils/writeFile')
const vscode = require('vscode')
const path = require('path')

const ignore =
  config.ignore.length > 0
    ? config.ignore
    : ['node_modules', '.git']

const keep = config.keep.length > 0 ? config.keep : []

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir)

  const ignoreDirectory = (file, arr) => arr.includes(file)

  files.forEach((file) => {
    if (ignoreDirectory(file, ignore)) return

    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist.push(`${file}/**`)
      filelist = walkSync(dir + '/' + file, filelist)
    } else {
      filelist.push(file)
    }
  })

  return filelist
}

const output = walkSync(
  vscode.workspace.workspaceFolders[0].uri.fsPath
).reduce(
  (acc, val) => ({
    ...acc,
    [val]: R.not(keep.includes(val))
  }),
  {}
)

const hideConfig = () =>
  writeFile(
    path.join(
      vscode.workspace.workspaceFolders[0].uri.fsPath,
      '.hidemyfilesrc'
    )
  )(output)

module.exports = {
  hideConfig
}
