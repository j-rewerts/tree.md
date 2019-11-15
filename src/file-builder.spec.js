const FileBuilder = require('./file-builder')
const TreeType = require('./models/file-tree').Treetype
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

    it('should build this repo into a FileTree that contains this test file', function() {
      return FileBuilder.buildFileTree('./').then((results) => {
        let srcFolder = results.children.find(value => {
          return value.name ==='src'
        })
        let discovery = srcFolder.children.find(value => {
          return value.name === 'file-builder.spec.js'
        })
        assert.ok(discovery)
        assert.equal('file-builder.spec.js', discovery.name)
      })
    })
  })
})
