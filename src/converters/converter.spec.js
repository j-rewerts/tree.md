const GitTree = require('../git-tree')
const toText = require('./text/text')
const assert = require('assert')
const gitTree = new GitTree((cmd) => {
  return Promise.resolve()
})

describe('Converters', function() {
  describe('integration', function() {
    describe('text', function() {
      it('should build this repo into a text tree', function() {
        return gitTree.getTree('https://github.com/doesnotmatter', {folder: './'}).then(tree => {
          let text = toText(tree)
          console.log(text)
          // Transform into text
        })
      })
    })
  })
})
