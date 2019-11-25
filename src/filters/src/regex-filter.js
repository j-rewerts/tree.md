const FileTree = require('../../models/file-tree').FileTree
const { FILE, FOLDER } = require('../../models/file-tree').Treetype

/**
 * Applies a regex against all files and folders. 
 * @param {FileTree} fileTree A file tree that may contain folders and files.
 * @param {String} options.regex A string that is compiled to a RegExp.
 * @param {String} options.field The field to match against. Defaults to name.
 * @param {boolean} options.ignoreFolder If true, doesn't apply the regex against folders. 
 * Defaults to false.
 */
let include = (fileTree, options) => {
  options = {
    ...{
      regex: '*',
      field: 'name',
      type: 'include',
      ignoreFolders: false
    }, ...options
  }

  let r = new RegExp(options.regex)

  let newTree = null
  // If we're ignoring folders, we don't need to pass any regex test.
  if (r.test(fileTree[options.field]) || (fileTree.isFolder() && options.ignoreFolders)) {
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