# Hide Files

## Excludes

- Create a `.hidemyfilesrc` file:

```json
{
  "node_modules": true,
  "dist": true
}
```

- Run `Hide Files` from the _Command Palette_ to have the files disapear from the _Explorer_.

## Includes

- Create a `hide.config.js` file:

```javascript
module.exports = {
  ignore: ['node_modules', '.git'],
  keep: ['extension.js']
}
```

- `ignore` - any directories you add here will not be recursively searched and instead the whole directory will be hidden from the explorer view unless added to the `keep` array.
- `keep` - any files you add here will be the only ones you see when you run `Hide Files`
