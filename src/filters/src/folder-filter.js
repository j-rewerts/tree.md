const FOLDER = require('../../models/file-tree').Treetype.FOLDER
const FileTree = require('../../models/file-tree').FileTree

/**
 * Filters out all files, leaving only folders. The input FileTree is not
 * modified in any way.
 * @param {FileTree} fileTree The tree to apply the filter to.
 * @returns {FileTree} A FileTree that only contains folder types.
 */
let folderFilter = fileTree => {
  let folderTree = new FileTree(FOLDER, fileTree.path)
  folderTree.children = fileTree.children.filter(child => {
    return child.type === FOLDER
  })

  folderTree.children = folderTree.children.map(folder => {
    return folderFilter(folder)
  })
  return folderTree
}

module.exports = {
  folder: folderFilter
}