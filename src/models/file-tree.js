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

  /**
   * NOTE: This is not cross platform! It only works on OSes with / as
   * the path separator.
   */
  get name() {
    let brokenPath = this.path.split('/')
    return brokenPath[brokenPath.length - 1]
  }

  /**
   * Tests whether this object is a folder.
   * @returns {boolean} True if this is a TreeType.FOLDER.
   */
  isFolder() {
    return this.type === TreeType.FOLDER
  }

  /**
   * Forces writing of name when converting to JSON.
   */
  toJSON() {
    return {
      type: this.type,
      path: this.path,
      children: this.children,
      name: this.name
    }
  }

  /**
   * Converts a string into a FileTree. Fails spectacularily if
   * the string isn't the right format.
   * @param {String} str A JSON string.
   */
  static fromJson(str) {
    let obj = JSON.parse(str)
    return cvt(obj)
  }
}

function cvt(tree) {
  let newTree = new FileTree(tree.type, tree.path)
  newTree.children = tree.children.map(child => {
    return cvt(child)
  })
  return newTree
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