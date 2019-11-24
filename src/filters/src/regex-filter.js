const FileTree = require('../../models/file-tree').FileTree
const { FILE, FOLDER } = require('../../models/file-tree').Treetype

/**
 * 
 * @param {FileTree} fileTree a file tree that may contain folders, 
 * @param {*} regex 
 */
let include = (fileTree, options) => {
  options = {
    ...{
      regex: '*',
      field: 'name',
      type: 'include'
    }, ...options
  }

  let r = new RegExp(options.regex)

  let newTree = null
  if (r.test(fileTree[options.field])) {
    newTree = new FileTree(fileTree.type, fileTree.path)
    newTree.children = []
    for (let child of fileTree.children) {
      let newChild = include(child, options)
      if (newChild) {
        newTree.children.push(newChild)
      }
    }
  }

  return newTree
}

module.exports = {
  regex: include
}