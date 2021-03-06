const GitTree = require('./git-tree')
const assert = require('assert')
const path = require('path')
let tree = null

describe('GitTree', function() {
  before(function() {
    tree = new GitTree()
  })
  describe('_gitClone', function() {

    it('should clone a basic repo', function() {
      tree = new GitTree(cmd => {
        return path.resolve('./')
      })
      return tree._gitClone('https://github.com/j-rewerts/tree.md').then(path => {
        return assert.ok(path.includes('tree.md'))
      })
    })

    it('should clone a basic repo into a specific folder', function() {
      tree = new GitTree(cmd => {
        return cmd
      })
      let folder = 'abcd'
      return tree._gitClone('https://github.com/j-rewerts/tree.md', folder).then(path => {
        return assert.equal(path, folder)
      })
    })

    it('should fail if repo does not exist', function() {
      return assert.rejects(tree._gitClone('https://github.com/j-rewerts/dne'))
    })
  })
})
