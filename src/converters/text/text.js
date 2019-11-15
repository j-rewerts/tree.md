const Handlebars = require('handlebars')
const fs = require('fs')
const fileTreeSource = fs.readFileSync('src/converters/text/file-tree.hbs', 'utf-8')
const fileSource = fs.readFileSync('src/converters/text/file.partial.hbs', 'utf-8')
const fileTreeTemplate = Handlebars.compile(fileTreeSource)
Handlebars.registerPartial('file', fileSource)

// Given an object like this:
// {
//   type: 'FOLDER',
//   name: 'folder-1',
//   children: [
//     {
//       type: 'FILE',
//       name: 'example'
//     },
//     {
//       type: 'FOLDER',
//       name: 'another-folder',
//       children: [
//         {
//           type: 'FILE',
//           name: 'hello-world.js'
//         }
//       ]
//     }
//   ]
// }
// We get:
// folder-1
//   example
//   another-folder
//     hello-world.js

module.exports = function(fileTree) {
  return fileTreeTemplate(fileTree)
}