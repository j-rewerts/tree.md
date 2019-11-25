const { FileTree } = require('../../models/file-tree')

const filter = (fileTree, options) => {
  if (!options.path) {
    throw new Error('No path provided to path filter')
  }
  let newTree = fileTree;
  let steps = options.path.split('/')
  for (let step of steps) {
    let nextChild = newTree.children.find(child => {
      return child.name === step
    })
    if (!nextChild) {
      throw new Error('Error during path filter: no child called ${step}')
    }
    newTree = nextChild
  }

  // Deep copy elements of FileTree
  return FileTree.fromJson(JSON.stringify(newTree))
}

module.exports = {
  path: filter
}