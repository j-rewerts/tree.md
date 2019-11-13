const exec = require('child_process').exec


module.exports = {
  getTree: function(url, options) {
    let folder = this._gitClone(url)
    return this._gitTree(folder)
  },
  _gitClone: function(url, folder) {
    let p = new Promise((resolve, reject) => {
      // For some reason, stderr contains git's output.
      exec(`git clone ${url}`, (error, stdout, stderr) => {
        if (error) {
          reject(error.message)
        }
        if (stderr) {
          console.error(stderr)
        }

        resolve('path/to/folder')
      })
    })
    return p
  },
  _gitTree: function(path) {
    return `
    README.md
    this_is_an_example.md
    fldr
     |
     ___ anotherFile.js
    `
  }
}