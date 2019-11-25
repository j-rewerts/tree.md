const TreeType = require('../models/file-tree').Treetype
const FileTree = require('../models/file-tree').FileTree
const path = require('path')
const assert = require('assert')

// Filters
const folderFilter = require('./src/folder-filter').folder
const regexpFilter = require('./src/regex-filter').regex
const pathFilter = require('./src/path-filter').path

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

    it('should ignore folders', function () {
      let tree = regexpFilter(basicTree, {
        regex: '^1234abcd',
        ignoreFolders: true
      })
      let children = flattenChildren(tree)
      children.forEach(child => {
        assert.ok(child.isFolder(), 'Should only contain folders.')
      })
    })

    it('should filter only spec files.', function () {
      let tree = regexpFilter(basicTree, {
        regex: '.*\\.spec.js',
        ignoreFolders: true
      })
      let children = flattenChildren(tree)
      children.forEach(child => {
        assert.ok(child.isFolder() || child.name.includes('spec'), 'Should only contain folders or tests.')
      })
    })
  })

  describe('path', function () {
    it('should filter 1 level deep', function () {
      let tree = pathFilter(basicTree, { path: '.vscode' })
      assert.ok(tree)
      assert.equal(tree.name, '.vscode')
      assert.equal(tree.children.length, 2)
      assert.deepStrictEqual(tree, basicTree.children[5])
      assert.ok(tree !== basicTree.children[5], 'The returned tree is not a new reference.')
    })

    it('should filter 2 levels deep', function () {
      let tree = pathFilter(basicTree, { path: 'src/converters' })
      assert.ok(tree)
      assert.equal(tree.name, 'converters')
      assert.equal(tree.children.length, 5)
      assert.deepStrictEqual(tree, basicTree.children[4].children[3])
      assert.ok(tree !== basicTree.children[4].children[3], 'The returned tree is not a new reference.')
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