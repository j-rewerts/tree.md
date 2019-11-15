const fs = require('fs')
const path = require('path')
module.exports = {}

/**
 * This finds all folders and assumes the export their contents correctly
 * using an index.js file.
 * The format expected of each of these files is:
 * {String} type The Content-Type this converter should be served as.
 * {Function} converter The convert function.
 */
fs.readdirSync(__dirname).map(file => {
  file = path.join(__dirname, file)
  return {
    stat: fs.statSync(file),
    name: file
  }
}).filter(fileOrFolder => {
  return fileOrFolder.stat.isDirectory()
}).forEach(folder => {
  let folderName = path.basename(folder.name)
  module.exports[folderName] = require(folder.name)
})