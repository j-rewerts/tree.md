const Handlebars = require('handlebars')
const fs = require('fs')
const helpers = require('handlebars-helpers')
const TreeType = require('../../models/file-tree').Treetype

helpers.math({
  handlebars: Handlebars
})
helpers.array({
  handlebars: Handlebars
})
const fileTreeSource = fs.readFileSync('src/converters/svg/file-tree.hbs', 'utf-8')
const fileSource = fs.readFileSync('src/converters/svg/folder.partial.hbs', 'utf-8')
const fileTreeTemplate = Handlebars.compile(fileTreeSource)
Handlebars.registerPartial('file', fileSource)

/**
 * Used to align items halfway through the grid. This is convenient
 * for aligning a rectangle in the middle of text, for example.
 * @param {Number} unit The unit in the grid.
 * @param {Number} scale The scale to be applied.
 */
Handlebars.registerHelper('alignHalfScaleUp', function(unit, scale) {
  return unit * scale + Math.ceil(scale / 2)
});

/**
 * Transforms the provided file tree to make converion to SVG easier.
 * Files and folders are split into separate arrays, and each FileTree
 * object has a spacing array added to it that is used to determine 
 * where connections are needed to sub-folders. In addition, each
 * folder has a height field that decribes how many units tall
 * it is.
 * NOTE: Any custom ordering could also be done here.
 * @param {FileTree} fileTree The filetree to export to SVG.
 * @return {Object} A POJO that contains the requested fields.
 */
function transform(fileTree) {
  let pojo = JSON.parse(JSON.stringify(fileTree))
  return _transform(pojo)
}

function _transform(treePOJO) {
  treePOJO.files = []
  treePOJO.folders = []
  // By convention, we give each folder 1 extra unit of space
  treePOJO.height = treePOJO.type === TreeType.FOLDER ? 2 : 1
  treePOJO.children.forEach(el => {
    _transform(el)
    if (el.type === TreeType.FILE) {
      treePOJO.files.push(el)
      treePOJO.height++
    }
    else {
      treePOJO.folders.push(el)
      treePOJO.height = treePOJO.height  + el.height
    }
  })
  delete treePOJO.children

  // Build up the spacing map:
  treePOJO.spacing = []
  let lastFolder = null
  let lastHeight = 0
  treePOJO.folders.forEach(folder => {
    if (lastFolder === null) {
      lastFolder = folder
      lastHeight = treePOJO.files.length + 2
      treePOJO.spacing.push(lastHeight)
      return
    }

    lastHeight = lastHeight + lastFolder.height
    lastFolder = folder
    treePOJO.spacing.push(lastHeight)
  })
  return treePOJO
}

module.exports = function(fileTree) {
  let treePOJO = transform(fileTree)
  return fileTreeTemplate(treePOJO)
}