const FileBuilder = require('./file-builder')
const TreeType = require('./file-tree').Treetype
const assert = require('assert')

describe('FileBuilder', function() {
  describe('buildFileTree', function() {

    it('should build this repo into a FileTree', function() {
      return FileBuilder.buildFileTree('./').then((results) => {
        assert.ok(results)
        assert.ok(results.children)
        assert.equal(results.type, TreeType.FOLDER)
      })
    })
  })
})
