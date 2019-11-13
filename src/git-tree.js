const exec = require('child_process').exec


module.exports = {
  getTree: function(url, options) {
    let folder = this._gitClone(url)
    return this._gitTree(folder)
  },
  _gitClone: function(url, folder) {
    let p = new Promise((resolve, reject) => {
      var pResolve = resolve
      var pReject = reject
    })

    exec(`git clone ${url}`, (error, stdout, stderr) => {
      if (error) {
        pReject(error.message)
      }
      if (stderr) {
        pReject(stderr)
      }

      pResolve('path/to/folder')
    })
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