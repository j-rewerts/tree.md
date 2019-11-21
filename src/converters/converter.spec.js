const GitTree = require('../git-tree')
const toText = require('./text/text')
const toSVG = require('./svg').converter
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
          assert.equal(text.split('\n')[0], 'tree.md')
          assert.ok(text.includes('converter.spec.js'))
          assert.ok(text.includes('text.js'))
          assert.equal(text.includes('not-a-file.js'), false)
        })
      })
    })

    describe('svg', function() {
      it('should build this repo into an SVG document', function() {
        return gitTree.getTree('https://github.com/doesnotmatter', {folder: './'}).then(tree => {
          let svg = toSVG(tree)
          assert.ok(svg)
          assert.ok(svg.includes('<text x="9" y="27" class="standard">converter.spec.js</text>'))
          assert.ok(svg.includes('<text x="0" y="9" class="standard">converters</text>'))
        })
      })
    })
  })
})
