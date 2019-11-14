const exec = require('child_process').exec


class GitTree {
  constructor(exec) {
    if (exec) {
      this._exec = exec
    }
  }

  getTree = (url, options) => {
    let folder = this._gitClone(url)
    return this._gitTree(folder)
  }

  _gitClone = (url, folder) => {
    return this._exec(`git clone ${url}`)
  }

  _gitTree = (path) => {
    return `
    README.md
    this_is_an_example.md
    fldr
    |
    ___ anotherFile.js
    `
  }

  _exec = (command) => {
    return Promise((resolve, reject) => {
      // For some reason, stderr contains git's output.
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error.message)
        }

        resolve({stdout, stderr})
      })
    })
  }
}

module.exports = GitTree
