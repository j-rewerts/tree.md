const path = require('path')
const fs = require('fs')
const buildFileTree = require('./file-builder').buildFileTree
const os = require('os')
const simpleGit = require('simple-git/promise')()

const tempDir = os.tmpdir()
const sep = path.sep

class GitTree {
  constructor(clone) {
    if (clone) {
      this._clone = clone
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
    let p
    if (options && options.folder) {
      p = this._gitClone(url, options.folder)
    }
    else {
      p = this._gitClone(url)
    }
    return p.then(folder => {
      return buildFileTree(folder)
    })
  }

  /**
   * Clones a repo by url. Optionally clones into a named folder.
   * @param {String} url The https Git url to clone.
   * @param {String} [folder] The folder to clone into.
   * @return {Promise} A promise that resolves with the folder name.
   */
  async _gitClone(url, folder) {
    if (!folder) {
      folder = url.match(this._urlRegExp)[3]
      let tempFolder = await this._makeTempDir()
      folder = path.resolve(tempFolder, folder)
    }

    await this._clone(url, folder)
    return folder
  }

  _makeTempDir() {
    return new Promise((resolve, reject) => {
      fs.mkdtemp(`${tempDir}${sep}`, function (err, folder) {
        if (err) {
          return reject(err)
        }
        return resolve(folder)
      })
    })
  }

  _clone(repo, folder) {
    return simpleGit.clone(repo, folder)
  }
}

module.exports = GitTree
