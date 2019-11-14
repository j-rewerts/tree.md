/**
 * A model that represents a file structure.
 */
class FileTree {
  /**
   * Files will have no children. This may seem strange, but this object is
   * meant to mirror GitHubs API file/folder structure:
   * https://developer.github.com/v3/repos/contents/#response-if-content-is-a-directory
   * @param {TreeType} type The type of this FileTree.
   * @param {String} path A fully-qualified path to this FileTree.
   */
  constructor(type, path) {
    this.type = type
    this.path = path
    this.children = []
  }
}

/**
 * @const {Object} TreeType A simple enumerator for different FileTree types.
 * @const {String} TreeType.FILE A file type.
 * @const {String} TreeType.FOLDER A folder type.
 */
const TreeType = {
    FILE: 'FILE',
    FOLDER: 'FOLDER'
}

module.exports = {
  FileTree: FileTree,
  Treetype: TreeType
}