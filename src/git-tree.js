const exec = require('child_process').exec


class GitTree {
  constructor(exec) {
    if (exec) {
      this._exec = exec
    }
    // This RegExp helps match urls.
    // For GitHub urls, capturing groups from string.match are as follows:
    // 0: The matched string
    // 1: Host (github.com)
    // 2: Repo owner/organization (j-rewerts)
    // 3: Repo name (tree.md)
    // 4 (might not exist): Path (src/stuff)
    this._urlRegExp = new RegExp('https?:\/\/([-a-zA-Z0-9@:%._\+~#=]{1,256})+\/([a-zA-Z-_.0-9]+)[\/#](.*)')
  }

  getTree(url, options) {
    let folder = this._gitClone(url)
    return this._gitTree(folder)
  }

  /**
   * Clones a repo by url. Optionally clones into a named folder.
   * @param {String} url The https Git url to clone.
   * @param {String} [folder] The folder to clone into.
   * @return {Promise} A promise that resolves with the folder name.
   */
  _gitClone(url, folder) {
    if (!folder) {
      folder = url.match(this._urlRegExp)[3]
    }
    
    return this._exec(`git clone ${url} ${folder}`).then(() => {
      return folder
    })
  }

  _gitTree(path) {
    return `
    README.md
    this_is_an_example.md
    fldr
    |
    ___ anotherFile.js
    `
  }

  _exec(command) {
    return new Promise((resolve, reject) => {
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
