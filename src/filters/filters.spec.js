const TreeType = require('../models/file-tree').Treetype
const FileTree = require('../models/file-tree').FileTree
const path = require('path')
const assert = require('assert')

// Filters
const folderFilter = require('./src/folder-filter').folder
const regexpFilter = require('./src/regex-filter').regex

const cwd = path.resolve('./')
const basicTree = new FileTree(TreeType.FOLDER, cwd)
basicTree.children = [
  new FileTree(TreeType.FILE, path.join(cwd, '.gitignore')),
  new FileTree(TreeType.FILE, path.join(cwd, 'LICENSE')),
  new FileTree(TreeType.FILE, path.join(cwd, 'README.md')),
  new FileTree(TreeType.FILE, path.join(cwd, 'package.json')),
  new FileTree(TreeType.FOLDER, path.join(cwd, 'src')),
  new FileTree(TreeType.FOLDER, path.join(cwd, '.vscode')),
]
// .vscode
basicTree.children[5].children = [
  new FileTree(TreeType.FILE, path.join(cwd, '.vscode', 'launch.json')),
  new FileTree(TreeType.FILE, path.join(cwd, '.vscode', 'settings.json'))
]
// src
basicTree.children[4].children = [
  new FileTree(TreeType.FILE, path.join(cwd, 'src', 'git-tree.js')),
  new FileTree(TreeType.FILE, path.join(cwd, 'src', 'git-tree.spec.js')),
  new FileTree(TreeType.FOLDER, path.join(cwd, 'src', 'models')),
  new FileTree(TreeType.FOLDER, path.join(cwd, 'src', 'converters')),
]
// src/models
basicTree.children[4].children[2].children = [
  new FileTree(TreeType.FILE, path.join(cwd, 'src', 'models', 'file-tree.js')),
]
// src/converters
let conv = path.join(cwd, 'src', 'converters')
basicTree.children[4].children[3].children = [
  new FileTree(TreeType.FILE, path.join(conv, 'README.md')),
  new FileTree(TreeType.FILE, path.join(conv, 'index.js')),
  new FileTree(TreeType.FILE, path.join(conv, 'converter.spec.js')),
  new FileTree(TreeType.FOLDER, path.join(conv, 'svg')),
  new FileTree(TreeType.FOLDER, path.join(conv, 'text'))
]

describe('Filters', function () {
  describe('folderFilter', function () {

    it('should filter out all files', function () {
      let folderTree = folderFilter(basicTree)
      let children = flattenChildren(folderTree)
      children.forEach(child => {
        assert.equal(child.type, TreeType.FOLDER)
      })
    })
  })

  describe('regexp', function () {

    it('should filter out all FileTrees that don\'t start with a letter.', function () {
      let tree = regexpFilter(basicTree, {
        regex: '^[a-zA-Z].*'
      })
      let children = flattenChildren(tree)
      assert.equal(children.length, 15)
      children.forEach(child => {
        assert.ok(/[a-zA-Z]/.test(child.name[0]))
      })
    })

    it('should fail when given an invalid regular expression', function () {
      assert.throws(() => {
        regexpFilter(basicTree, {
          regex: '^[a-zA-Z.*'
        })
      })
    })
  })
})

let flattenChildren = (array, accu = []) => {
  accu.push(array)
  array.children.forEach(a => {
    flattenChildren(a, accu)
  })
  return accu
}