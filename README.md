# Hide Files

# Hide My Files

The lack of a `files.includes` property in VS Code was frustrating me so I have created a quick and dirty extension that can emulate the desired `files.includes` behaviour until this feature is formally added to VS Code.

## Usage

- Create a `hide.config.js` file

```javascript
module.exports = {
  ignore: ['.git'], // add any directories you are happy to exclude from the recursive search
  keep: ['extension.js', 'commands/**'] // only these files will be available in the Explorer view
}
```

- Run `Hide Config` from the command palette to generate a `.hidemyfilesrc` file.
- When you run `Hide Files`, `.hidemyfilesrc` will replace the `files.exclude` property in `.vscode.settings.json`, thus excluding all of the files in your project except for the files and directories you add to the `keep` array.
- **Any time you modify `hide.config.js` you will have to reload the window and run `Hide Config` from the command palette for the changes to take effect** (if someone has experience with VS Code extensions and can explain why this is necessary that would be great)
- **Include directories with the syntax `<directory name>/**`\*\*

## Excludes

- If you would just like to use the extension to exclude certain files, create a `.hidemyfilesrc` file:

```json
{
  "node_modules": true,
  "dist": true
}
```

- Run `Hide Files` from the _Command Palette_ to have the files disapear from the _Explorer_.
