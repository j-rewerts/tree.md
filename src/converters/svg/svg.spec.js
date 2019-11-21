const toSVG = require('./svg')
const path = require('path')
const FileTree = require('../../models/file-tree').FileTree
const TreeType = require('../../models/file-tree').Treetype
const snapshot = require('snap-shot-it')


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
  new FileTree(TreeType.FOLDER, path.join(cwd, 'src/models'))
]
basicTree.children[3].children[1].children = [
  new FileTree(TreeType.FILE, path.join(cwd, 'src/models/file-tree.js'))
]

describe('Converters', function() {
  describe('svg', function() {
    it('should convert a basic file tree', function() {
      let tr = toSVG(basicTree)
      snapshot(tr)
    })
  })
})
