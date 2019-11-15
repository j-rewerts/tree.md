const toText = require('./text')
const assert = require('assert')
const path = require('path')
const FileTree = require('../../file-tree').FileTree
const TreeType = require('../../file-tree').Treetype

let cwd = path.resolve('./')
let basicTree = new FileTree(TreeType.FOLDER, cwd)
basicTree.children = [
  new FileTree(TreeType.FILE, path.join(cwd, '.gitignore')),
  new FileTree(TreeType.FILE, path.join(cwd, 'LICENSE')),
  new FileTree(TreeType.FILE, path.join(cwd, 'README.md')),
  new FileTree(TreeType.FOLDER, path.join(cwd, 'src'))
]
basicTree.children[3].children = [
  new FileTree(TreeType.FILE, path.join(cwd, 'src/file-builder.js')),
  new FileTree(TreeType.FILE, path.join(cwd, 'src/file-tree.js'))
]
const basicTextTree = 
`tree.md
  .gitignore
  LICENSE
  README.md
  src
    file-builder.js
    file-tree.js
`

describe('Converters', function() {
  describe('text', function() {
    it('should convert a basic file tree', function() {
      assert.equal(toText(basicTree), basicTextTree)
    })
  })
})
