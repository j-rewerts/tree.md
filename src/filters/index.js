const fs = require('fs')
const path = require('path')
module.exports = {}

/**
 * This finds all filters in the ./src directory. Each must export itself
 * using the name of its filter. Each of these filters receives a FileTree,
 * and also an object of options.
 */
fs.readdirSync(path.join(__dirname, 'src')).forEach(filterFile => {
  module.exports = {
    ...module.exports,
    ...require(path.join(__dirname, 'src', filterFile))
  }
})