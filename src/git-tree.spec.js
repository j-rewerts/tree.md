const GitTree = require('./git-tree')
const assert = require('assert')
let tree = null

describe('GitTree', function() {
  before(function() {
    tree = new GitTree()
  })
  describe('_gitClone', function() {
    it('passes easily', function() {
      assert(true, true)
    })

    it('should clone a basic repo', function() {
      return tree._gitClone('https://github.com/j-rewerts/tree.md').then(path => {
        assert(path, 'tree.md')
      })
    })
  })
})
