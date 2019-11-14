const fs = require('fs');
const path = require('path');
const FileTree = require('./file-tree').FileTree
const TreeType = require('./file-tree').Treetype


function _walk(dir, done) {
  let parent = new FileTree(TreeType.FOLDER, dir)
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, parent);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          _walk(file, function(err, res) {
            parent.children = parent.children.concat(res);
            if (!--pending) done(null, parent);
          });
        } else {
          parent.children.push(new FileTree(TreeType.FILE, file));
          if (!--pending) done(null, parent);
        }
      });
    });
  });
};

/**
 * Builds a FileTree structure from a folder.
 * @param {String} filePath A relative file path.
 * @returns {Promise} A Promise that resolves with the FileTree.
 */
function buildFileTree(filePath) {
  let root = new FileTree(TreeType.FOLDER, path.resolve(filePath))
  return new Promise((resolve, reject) => {
    _walk(root.path, function(err, results) {
      if (err) {
        reject(err)
      }
      root.children = results
      resolve(root)
    })
  })
  
}

module.exports = {
  buildFileTree
}